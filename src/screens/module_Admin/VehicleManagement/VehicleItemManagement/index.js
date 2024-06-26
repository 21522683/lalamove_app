import {View, Text, Pressable, Image, TextInput} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';

import styles from './style';
import {IMAGES} from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setEditVehicleType,
  setStatusEdit,
} from '../../../../redux/slices/vehicleTypeAdmin';

const VehicleItemManagement = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setImage = () => {
    switch (item.vehicleTypeName) {
      case 'Xe máy': {
        return IMAGES.xemay;
      }
      case 'Xe bán tải': {
        return IMAGES.xebantai;
      }
      case 'Xe van': {
        return IMAGES.xevan;
      }
      case 'Xe tải': {
        return IMAGES.xetai;
      }
      default: {
        return IMAGES.xemay;
      }
    }
  };
  const img = useMemo(() => {
    return setImage();
  }, [item]);

  const handleClickItem = () => {
    dispatch(setEditVehicleType(item));
    dispatch(setStatusEdit(true));
    navigation.navigate('DetaiVehicleScreen');
  };

  return (
    <Pressable onPress={handleClickItem}>
      <View style={[styles.card, styles.shadowCard]}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
          <Image
            source={item.image ? {uri: item.image} : img}
            style={{width: 70, height: 70, resizeMode: 'cover'}}
          />
          <View style={{flex: 1, gap: 6}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              {item.vehicleTypeName}
            </Text>
            <Text style={{color: '#333', fontSize: 13}}>
              {item.suitableFor}
            </Text>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Icon4 name="package" size={18} color="#6F6F6F" />
              <Text style={{color: '#898989', fontSize: 13, flex: 1}}>
                {item.size} . Đến {item.mount}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 16,
            alignSelf: 'flex-end',
            paddingVertical: 6,
            paddingHorizontal: 8,
            borderRadius: 4,
            backgroundColor:
              item.status === 'Đang hoạt động' ? '#56cd62' : '#F16722',
          }}>
          <Text style={{color: 'white', fontWeight: 500}}>{item.status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VehicleItemManagement;
