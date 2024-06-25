import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import styles from './style';
import {verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../../../assets/images';
import {useSelector} from 'react-redux';
import formatCurrencyVND from '../../../../../utils/formatCurrencyVND';

const VehicleItemPrevOrder = ({}) => {
  const vehicleType = useSelector(state => state.createOrder.vehicleType);
  const setImage = () => {
    switch (vehicleType.vehicleTypeName) {
      case 'Xe máy': {
        return IMAGES.xemay;
      }
      default: {
        return IMAGES.xemay;
      }
    }
  };
  const img = useMemo(() => {
    return setImage();
  }, [vehicleType]);

  return (
    <Pressable>
      <View
        style={[
          styles.card,
          styles.shadowCard,
          {flexDirection: 'column', gap: 12},
        ]}>
        <View style={{flexDirection: 'row', gap: 24, alignItems: 'center'}}>
          <Image
            source={img}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'cover',
              alignSelf: 'flex-start',
            }}
          />
          <View style={{gap: 6}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              {vehicleType.vehicleTypeName}
            </Text>
            <Text style={{color: '#333', fontSize: 13}}>
              {formatCurrencyVND(vehicleType.minPrice)} cho{' '}
              {vehicleType.minLength} km đầu
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Icon3 name="speedometer" size={18} color="#6F6F6F" />
          <Text style={{color: '#898989', fontSize: 13, flex: 1}}>
            Cước phí tính thêm / 1km:{' '}
            {formatCurrencyVND(vehicleType.priceAddIfOut)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VehicleItemPrevOrder;
