import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Surface} from 'react-native-paper';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {Callout, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {GetInfoFromCoordinates} from '../../../../utils/opencagedata';
import {setXYZNewAddress} from '../../../../redux/slices/createOrderSlice';

const ChooseMapScreen = () => {
  const navigation = useNavigation();
  const newAddressSlice = useSelector(state => state.createOrder.newAddress);
  const [newAddress, setNewAddress] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  const dispatch = useDispatch();

  const getLocation = async () => {
    let location;

    location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });

    const response = await GetInfoFromCoordinates(
      location.latitude,
      location.longitude,
    );

    setCurrentLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      title: 'You are here',
      description: response,
    });
    setNewAddress({
      addressString: response,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  const mapView = useRef(null);
  const changeCamera = cor => {
    const newCamera = {
      center: {
        latitude: cor.latitude,
        longitude: cor.longitude,
      },
      zoom: 15,
    };
    mapView.current.animateCamera(newCamera, {duration: 2000});
  };
  const handleMapPress = async event => {
    const {coordinate} = event.nativeEvent;
    const response = await GetInfoFromCoordinates(
      coordinate.latitude,
      coordinate.longitude,
    );

    setCurrentLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      title: 'You are here',
      description: response,
    });
    setNewAddress({
      addressString: response,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  useEffect(() => {
    if (currentLocation?.latitude) {
      changeCamera({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation?.latitude, currentLocation?.longitude]);
  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5', position: 'relative'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map</Text>

        <Pressable
          onPress={() => {
            dispatch(setXYZNewAddress(newAddress));
            navigation.goBack();
            navigation.goBack();
          }}>
          <Icon name="check" size={24} color="#F16722" />
        </Pressable>
      </Surface>

      <View
        style={[styles.body, {gap: 16, backgroundColor: '#f5f5f5', flex: 1}]}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          ref={mapView}
          onPress={handleMapPress}>
          {currentLocation && (
            <Marker coordinate={currentLocation}>
              <Callout>
                <View style={styles.calloutView}>
                  <Text>{currentLocation.title}</Text>
                  <Text>{currentLocation.description}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    </View>
  );
};

export default ChooseMapScreen;
