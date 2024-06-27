import {View, Image, StyleSheet, Text} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {ICONS} from '../../../../assets/icons/index';
import styles from './style';
import {useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';

export default function Map({order}) {
  const mapView = useRef();
  let [coordinates, setCoordinates] = useState([]);
  const userAuth = useSelector(state => state.users.userAuth);

  const timer = useRef();

  const [state, setState] = useState({
    pickupCords: {
      latitude: order.sourceAddress.latitude,
      longitude: order.sourceAddress.longitude,
    },
    droplocationCords: {
      latitude: order.destinationAddress.latitude,
      longitude: order.destinationAddress.longitude,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth.access_token}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(
          `${baseUrl}/order-location/getOrderLocation?id=${order._id}`,
          config,
        );
        const cors = response.data.data;
        if (!cors) {
          return;
        }
        calculateRoutes(
          {latitude: cors.latitude, longitude: cors.longitude},
          state.droplocationCords,
        );
        setState(prevState => ({
          ...prevState,
          pickupCords: {
            latitude: cors.latitude,
            longitude: cors.longitude,
          },
        }));
        onStart();
      } catch (err) {
        console.log(err);
        throw err;
      }
    })();

    return () => {
      clearTimer();
    };
  }, []);

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
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

  const onStart = async () => {
    try {
      timer.current = setInterval(async () => {
        await onMove();
        console.log('tick-user');
      }, 5000);
    } catch (err) {
      throw err;
    }
  };

  const onMove = async () => {
    const currentLocation = await getOrderLocation();
    if (!currentLocation?.latitude) {
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

  const getOrderLocation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `${baseUrl}/order-location/getOrderLocation?id=${order._id}`,
        config,
      );
      console.log(response);
      const cors = response.data.data;

      return {latitude: cors?.latitude, longitude: cors?.longitude};
    } catch (err) {
      console.log(err);
      throw err;
    }
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
