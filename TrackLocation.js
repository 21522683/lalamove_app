import React, {createContext, useReducer, useRef, useState} from 'react';
import baseUrl from './src/constants/baseUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import GetLocation from 'react-native-get-location';

const LocationContext = createContext();

const LocationProvider = ({children}) => {
  const timer = useRef();
  const order = useRef();
  const orderLocationId = useRef();
  const userAuth = useSelector(state => state.users.userAuth);
  const [curLocation, setCurLocation] = useState(null);
  const [isTransport, setTransport] = useState(false);
  const [isToSource, setIsToSource] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [isOnMap, setIsOnMap] = useState(true);
  const [curOrder, setCurOrder] = useState(null);

  const onStartDelivery = async currentOrder => {
    order.current = currentOrder;
    const currentLocation = await getCurrentLocation();
    setCurLocation(currentLocation);
    setTransport(true);
    setCurOrder(currentOrder);
    const res = await createOrderLocation({
      order: order._id,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
    orderLocationId.current = res._id;
    timer.current = setInterval(async () => {
      await onDelivery();
      console.log('tick');
    }, 5000);
  };

  const onDelivery = async () => {
    const currentLocation = await getCurrentLocation();
    setCurLocation(currentLocation);
    await updateOrderLocation({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
  };

  const resetValue = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = null;
    order.current = null;
    orderLocationId.current = null;
    setCurOrder(null);
    setTransport(false);
  };

  const onStopDelivery = async () => {
    await deleteOrderLocation();
    resetValue();
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

  const createOrderLocation = async orderLoc => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `${baseUrl}/order-location/addNewOrderLocation`,
        orderLoc,
        config,
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  const updateOrderLocation = async cors => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.put(
        `${baseUrl}/order-location/updateOrderLocation?id=${orderLocationId.current}`,
        cors,
        config,
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteOrderLocation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.delete(
        `${baseUrl}/order-location/deleteOrderLocation?id=${orderLocationId.current}`,
        config,
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <LocationContext.Provider
      value={{
        onStartDelivery,
        curLocation,
        onStopDelivery,
        isTransport,
        curOrder,
        isToSource,
        setIsToSource,
        isStart,
        setIsStart,
        isOnMap,
        setIsOnMap,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export {LocationContext, LocationProvider};
