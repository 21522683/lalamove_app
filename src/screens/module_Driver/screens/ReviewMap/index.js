import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
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
import {LocationContext} from '../../../../../TrackLocation';
import {useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';
import {ActivityIndicator} from 'react-native-paper';

const DriverReviewMap = ({navigation, route}) => {
  var order = {...route.params}.order;
  const [length, setLength] = useState(0);
  const userAuth = useSelector(state => state.users.userAuth);
  const [loading, setLoading] = useState(false);

  const mapView = useRef();
  let [coordinates, setCoordinates] = useState([]);
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

  const {
    onStartDelivery,
    curLocation,
    onStopDelivery,
    isToSource,
    setIsToSource,
    isStart,
    setIsStart,
    setIsOnMap,
  } = useContext(LocationContext);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        setLoading(false);
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
          true,
        );
        setIsOnMap(true);
      } catch (err) {
        throw err;
      }
    })();
    return () => {
      setIsOnMap(false);
    };
  }, []);

  useEffect(() => {
    if (curLocation) {
      setState(prevState => ({
        ...prevState,
        pickupCords: {
          latitude: curLocation.latitude,
          longitude: curLocation.longitude,
        },
      }));

      calculateRoutes(
        {
          latitude: curLocation.latitude,
          longitude: curLocation.longitude,
        },
        state.droplocationCords,
      );

      changeCamera(curLocation);
    }
  }, [curLocation]);

  const calculateRoutes = (sourceAddress, destinationAddress, isFitCors) => {
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
        if (isFitCors) {
          mapView.current.fitToCoordinates(newCors, {
            edgePadding: {top: 0, right: 50, bottom: 250, left: 50},
            animated: true,
          });
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
    if (!isToSource) {
      updateOrderStatus();
    }
    if (!isStart) {
      console.log(order);
      onStartDelivery(order);
      setIsStart(true);
    }
  };

  const changeCamera = cor => {
    const newCamera = {
      center: {
        latitude: cor.latitude,
        longitude: cor.longitude,
      },
      zoom: 18,
    };
    mapView.current.animateCamera(newCamera, {duration: 2000});
  };

  const arrivalPlace = async () => {
    await onStopDelivery();

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

  const updateOrderStatus = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.put(
        `${baseUrl}/order/${userAuth?.id}/driver-delivery-order/${order._id}`,
        config,
      );
      console.log(response);
      return response.data.data;
    } catch (err) {
      throw err;
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
              <Icon3 name="location" size={22} color={CUSTOM_COLOR.Primary} />
            </View>
            <View style={{marginLeft: 14}}>
              <View style={{width: '90%'}}>
                <Text style={styles.address_info}>
                  {isToSource
                    ? `${order.sourceAddress.detail}, ${order.sourceAddress.addressString}`
                    : `${order.destinationAddress.detail}, ${order.destinationAddress.addressString}`}
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
                  onStart();
                  //   setIsStart(true);
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
          props={
            isToSource
              ? {...order.sourceAddress}
              : {...order.destinationAddress}
          }
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
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#FF5900" />
        </View>
      )}
    </View>
  );
};

export default DriverReviewMap;
