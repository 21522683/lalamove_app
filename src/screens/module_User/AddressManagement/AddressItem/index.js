import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDestinationAddress,
  setSourceAddress,
} from '../../../../redux/slices/createOrderSlice';
import {useNavigation} from '@react-navigation/native';

const AddressItem = ({address, index, handleSetDefault}) => {
  const navigation = useNavigation();
  const statusChooseAddress = useSelector(
    state => state.createOrder.statusChooseAddress,
  );
  const dispatch = useDispatch();
  const handleClickSetDefault = () => {
    handleSetDefault(index);
  };
  const handleChooseAddress = () => {
    if (statusChooseAddress === 'Nhận hàng') {
      dispatch(setSourceAddress(address));
    } else if (statusChooseAddress === 'Trả hàng') {
      dispatch(setDestinationAddress(address));
    }
    navigation.replace('WelcomeCreateOrderScreen');
  };
  return (
    <TouchableOpacity onPress={handleChooseAddress}>
      <View style={[styles.card, styles.shadowCard]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.name}>{address.fullName}</Text>
            <Text style={{fontSize: 16}}>|</Text>
            <Text style={styles.phone}>{address.phoneNumber}</Text>
          </View>
          <Text style={styles.edit}>Sửa</Text>
        </View>
        <View style={{marginTop: verticalScale(8), gap: 4}}>
          <Text style={styles.textAddress}>{address.detail}</Text>
          <Text
            style={
              styles.textAddress
            }>{`${address.ward}, ${address.district}, ${address.province}`}</Text>
        </View>
        <Pressable onPress={handleClickSetDefault}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: verticalScale(12),
              gap: 8,
            }}>
            {address.isDefault ? (
              <Icon3 name="checkbox-marked" size={28} color="#F16722" />
            ) : (
              <Icon3 name="checkbox-blank-outline" size={28} />
            )}
            <Text style={{color: '#222222'}}>Sử dụng làm địa chỉ mặc định</Text>
          </View>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default AddressItem;
