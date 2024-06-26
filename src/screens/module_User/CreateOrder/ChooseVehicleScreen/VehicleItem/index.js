import {View, Text, Pressable, Image, TextInput} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome6';

import styles from './style';
import {IMAGES} from '../../../../../assets/images';
import formatCurrencyVND from '../../../../../utils/formatCurrencyVND';
import {useDispatch, useSelector} from 'react-redux';
import {setVehicleType} from '../../../../../redux/slices/createOrderSlice';

const VehicleItem = ({index, item}) => {
  const dispatch = useDispatch();
  const indexVehicleChoosen = useSelector(
    state => state.createOrder.indexVehicleChoosen,
  );
  const isChoosen = index === indexVehicleChoosen;
  const handlePress = () => {
    if (isChoosen) return;
    dispatch(
      setVehicleType({
        index,
        vehicleType: item,
      }),
    );
  };

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
  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.card,
          styles.shadowCard,
          ,
          isChoosen && {
            borderBottomColor: '#F16722',
            borderLeftColor: '#F16722',
            borderRightColor: '#F16722',
            borderBottomWidth: 4,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
          <Image
            source={item.image ?? img}
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
        {isChoosen && (
          <>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Icon2 name="money-bills" size={18} color="#6F6F6F" />
              <Text style={{color: '#898989'}}>Phí gốc:</Text>
              <Text style={{color: '#333'}}>
                {formatCurrencyVND(item.minPrice)} cho {item.minLength} km đầu
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Icon3 name="speedometer" size={18} color="#6F6F6F" />
              <Text style={{color: '#898989'}}>Cước phí tính thêm / 1km:</Text>
              <Text style={{color: '#333'}}>
                {formatCurrencyVND(item.priceAddIfOut)}
              </Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default VehicleItem;
