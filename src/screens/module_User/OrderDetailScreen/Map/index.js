import {View, Image, StyleSheet, Text} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {ICONS} from '../../../../assets/icons/index';
import styles from './style';

export default function Map() {
  const mapView = useRef();
  let [coordinates, setCoordinates] = useState([]);
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    pickupCords: {
      latitude: 10.74475,
      longitude: 106.72915,
    },
    droplocationCords: {
      latitude: 10.77309,
      longitude: 106.69835,
    },
  });

  useEffect(() => {
    calculateRoutes(state.pickupCords, state.droplocationCords);
    // onStart();
    // return () => {
    //   if (timer) {
    //     clearTimer();
    //   }
    // };
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
        setCoordinates(newCors);
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

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapView}
        style={StyleSheet.absoluteFill}
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
          strokeWidth={10}
          strokeColor="#0f53ff"
        />
      </MapView>
    </View>
  );
}
