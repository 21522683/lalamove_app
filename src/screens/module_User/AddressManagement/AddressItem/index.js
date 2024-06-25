import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';

const AddressItem = ({address, index, getAddressOfCurrentUser}) => {
  const navigation = useNavigation();
  const [disable, setDisable] = useState(false);
  const userAuth = useSelector(state => state.users.userAuth);

  const statusChooseAddress = useSelector(
    state => state.createOrder.statusChooseAddress,
  );
  const sourceAddress = useSelector(state => state.createOrder.sourceAddress);
  const destinationAddress = useSelector(
    state => state.createOrder.destinationAddress,
  );
  const dispatch = useDispatch();
  const handleClickSetDefault = async () => {
    if (address.isDefault) return;
    try {
      console.log(userAuth);
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.patch(
        `${baseUrl}/address/${address._id}/defaultAddress`,
        config,
      );

      getAddressOfCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChooseAddress = () => {
    if (disable) return;
    if (statusChooseAddress === 'Nhận hàng') {
      dispatch(setSourceAddress(address));
    } else if (statusChooseAddress === 'Trả hàng') {
      dispatch(setDestinationAddress(address));
    }
    navigation.goBack();
  };
  useEffect(() => {
    if (
      (statusChooseAddress === 'Trả hàng' &&
        address._id === sourceAddress._id) ||
      (statusChooseAddress === 'Nhận hàng' &&
        address._id === destinationAddress._id)
    ) {
      setDisable(true);
    }
  }, []);
  return (
    <Pressable onPress={handleChooseAddress}>
      <View style={[styles.card, styles.shadowCard]}>
        {sourceAddress._id === address._id && (
          <View style={styles.markedPoint}>
            <Text style={styles.textPoint}>Điểm đi</Text>
          </View>
        )}
        {destinationAddress._id === address._id && (
          <View style={styles.markedPoint}>
            <Text style={styles.textPoint}>Điểm đến</Text>
          </View>
        )}
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
          <Text style={styles.textAddress}>{address.addressString}</Text>
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
    </Pressable>
  );
};

export default AddressItem;
