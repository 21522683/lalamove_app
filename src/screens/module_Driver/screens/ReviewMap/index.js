import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AddressItem from '../../components/AddressItem';
import styles from './style';
import cs from '../../CustomStyle';
import ContactItem from '../../components/ContactItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICONS} from '../../../../assets/icons/index';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import CUSTOM_COLOR from '../../../../constants/colors';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const DriverReviewMap = ({navigation, route}) => {
  var order = {...route.params}.order;

  const [isStart, setIsStart] = useState(false);
  const [length, setLength] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isToSource, setIsToSource] = useState({...route.params}.isToSource);

  const mapView = useRef();
  let [coordinates, setCoordinates] = useState([]);
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    pickupCords: {
      latitude: order.sourceAddress?.latitude,
      longitude: order.sourceAddress?.longitude,
    },
    droplocationCords: {
      latitude: isToSource
        ? order.sourceAddress?.latitude
        : order.destinationAddress?.latitude,
      longitude: isToSource
        ? order.sourceAddress?.longitude
        : order.destinationAddress?.longitude,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        if (!location) {
          throw new Error('No location available');
        }
        setState(prevState => ({
          ...prevState,
          pickupCords: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        }));
        calculateRoutes(
          {latitude: location.latitude, longitude: location.longitude},
          state.droplocationCords,
        );
      } catch (err) {
        throw err;
      }
    })();

    return () => {
      if (timer) {
        clearTimer();
      }
    };
  }, []);

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const calculateRoutes = (sourceAddress, destinationAddress) => {
    fetch(
      `https://api.tomtom.com/routing/1/calculateRoute/${sourceAddress.latitude},${sourceAddress.longitude}:${destinationAddress.latitude},${destinationAddress.longitude}/json?key=QaDHsyMVJAx8DeAIGLvYbciKZpHEh9on`,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        const newCors = data.routes[0].legs[0].points.map(point => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));
        setLength(data.routes[0].summary.lengthInMeters / 1000);
        setCoordinates(newCors);
        if (firstLoad) {
          mapView.current.fitToCoordinates(newCors, {
            edgePadding: {top: 0, right: 50, bottom: 250, left: 50},
            animated: true,
          });
          setFirstLoad(false);
        }
      });
  };

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      if (!location) {
        throw new Error('No location available');
      }
      return location;
    } catch (err) {
      throw err;
    }
  };

  const onStart = async () => {
    try {
      const newTimer = setInterval(async () => {
        await onMove();
        console.log('tick');
      }, 5000);
      setTimer(newTimer);
    } catch (err) {
      throw err;
    }
  };

  const onMove = async () => {
    const currentLocation = await getCurrentLocation();
    if (!currentLocation) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      pickupCords: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
    }));

    calculateRoutes(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      state.droplocationCords,
    );

    changeCamera(currentLocation);
  };

  const changeCamera = cor => {
    const newCamera = {
      center: {
        latitude: cor.latitude,
        longitude: cor.longitude,
      },
    };
    mapView.current.animateCamera(newCamera, {duration: 2000});
  };

  const arrivalPlace = async () => {
    clearTimer();

    if (isToSource) {
      const location = await getCurrentLocation();
      setIsStart(false);
      setIsToSource(false);
      setState(prev => ({
        ...prev,
        pickupCords: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        droplocationCords: {
          latitude: order.destinationAddress.latitude,
          longitude: order.destinationAddress.longitude,
        },
      }));
      fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${location.latitude},${location.longitude}:${order.destinationAddress.latitude},${order.destinationAddress.longitude}/json?key=QaDHsyMVJAx8DeAIGLvYbciKZpHEh9on`,
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          const newCors = data.routes[0].legs[0].points.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }));
          setLength(data.routes[0].summary.lengthInMeters / 1000);
          setCoordinates(newCors);
          mapView.current.fitToCoordinates(newCors, {
            edgePadding: {top: 0, right: 50, bottom: 250, left: 50},
            animated: true,
          });
        });
    } else {
      navigation.navigate('VerifyOrderDriverScreen', {...order});
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        zoomEnabled={true}
        initialRegion={{
          ...state.pickupCords,
          latitudeDelta: 0.02663,
          longitudeDelta: 0.02001,
        }}>
        <Marker coordinate={state.pickupCords}>
          <Image
            source={ICONS.deliveryManIcon}
            style={{height: 50, width: 50}}
          />
        </Marker>
        <Marker coordinate={state.droplocationCords} />
        <Polyline
          coordinates={coordinates}
          strokeWidth={8}
          strokeColor="#0f53ff"
        />
      </MapView>
      {isStart ? (
        <View style={styles.outer_des}>
          <View style={[cs.horizontal_flex]}>
            <View style={styles.outer_location}>
              <Icon3 name="location" size={22} color={CUSTOM_COLOR.green} />
            </View>
            <View style={{marginLeft: 14}}>
              <View style={{width: '90%'}}>
                <Text style={styles.address_info}>
                  {`${order.sourceAddress.detail}, ${order.sourceAddress.ward}, ${order.sourceAddress.district}, ${order.sourceAddress.province}`}
                </Text>
              </View>
            </View>
            <View style={styles.outer_arrow_icon}>
              <Icon2
                name="location-arrow"
                size={24}
                color={CUSTOM_COLOR.Primary}
              />
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.outer_addresses}>
        {!isStart ? (
          <View>
            <View style={[cs.horizontal_flex, styles.space_between]}>
              <Text style={styles.inner_header_distance_text}>
                {Math.round(length * 10) / 10} Kilometers
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsStart(true);
                  onStart();
                }}>
                <Text style={styles.status_text}>Bắt đầu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontal_line}></View>
            <AddressItem props={order} current />
            <View style={styles.horizontal_line}></View>
          </View>
        ) : null}
        <ContactItem
          props={{...order.sourceAddress}}
          onOpenChat={() =>
            navigation.navigate('ChatDriverScreen', {
              name: order.customer?.fullName,
              uid: order.customer?._id,
              avatar: order.customer?.avatar,
            })
          }
        />
        {isStart ? (
          <TouchableOpacity
            style={[styles.outer_receiver_slider]}
            onPress={arrivalPlace}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Đã đến nơi
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.navigate_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2F2E36" />
        </TouchableOpacity>
        <Text style={styles.text_inner_header}>
          Order #{order._id.substr(order._id.length - 12)}
        </Text>
      </View>
    </View>
  );
};

export default DriverReviewMap;
