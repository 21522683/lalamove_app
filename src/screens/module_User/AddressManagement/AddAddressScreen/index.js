import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewAddressSuccessfully,
  setChangeTextNewAddress,
  setDestinationAddress,
  setSourceAddress,
  setXYZ,
} from '../../../../redux/slices/createOrderSlice';
import baseUrl from '../../../../constants/baseUrl';
import axios from 'axios';

const AddAddressScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newAddress = useSelector(state => state.createOrder.newAddress);
  const userAuth = useSelector(state => state.users.userAuth);
  const isEditAddress = useSelector(state => state.createOrder.isEditAddress);
  const sourceAddress = useSelector(state => state.createOrder.sourceAddress);
  const destinationAddress = useSelector(
    state => state.createOrder.destinationAddress,
  );
  const isContinue = useMemo(() => {
    return Object.keys(newAddress).every(key => {
      if (key === 'detail' || key === 'isDefault') return true;
      else return !!newAddress[key];
    });
  }, [newAddress]);
  const handleChangeText = (name, text) => {
    dispatch(setChangeTextNewAddress({name, text}));
  };

  const handleClickOk = () => {
    if (!isContinue) return;
    if (!isEditAddress) {
      handleAddNewAddress();
    } else handleEditAddress();
  };

  const handleAddNewAddress = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `${baseUrl}/address`,

        newAddress,
        config,
      );
      dispatch(addNewAddressSuccessfully(true));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditAddress = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.patch(
        `${baseUrl}/address/${newAddress._id}`,
        newAddress,
        config,
      );
      dispatch(addNewAddressSuccessfully(true));
      if (newAddress._id === sourceAddress._id) {
        dispatch(setSourceAddress(newAddress));
      }
      if (newAddress._id === destinationAddress._id) {
        dispatch(setDestinationAddress(newAddress));
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Địa chỉ mới</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <ScrollView>
        <View style={[styles.body, {gap: 32, backgroundColor: '#f5f5f5'}]}>
          <View>
            <Text
              style={{
                marginBottom: 12,
                color: '#222222',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Liên hệ
            </Text>
            <View style={{backgroundColor: 'white'}}>
              <TextInput
                placeholder="Họ và tên"
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                }}
                value={newAddress.fullName ?? ''}
                onChangeText={text =>
                  handleChangeText('fullName', text)
                }></TextInput>
              <TextInput
                placeholder="Số điện thoại"
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                }}
                value={newAddress.phoneNumber ?? ''}
                onChangeText={text =>
                  handleChangeText('phoneNumber', text)
                }></TextInput>
            </View>
          </View>
          <View>
            <Text
              style={{
                marginBottom: 12,
                color: '#222222',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Địa chỉ
            </Text>
            <View style={{backgroundColor: 'white'}}>
              <Pressable
                onPress={() => navigation.navigate('CreateAddressScreen')}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 16,
                    paddingLeft: 20,
                    paddingRight: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#222222'}}>
                    {newAddress.latitude
                      ? `${newAddress.addressString}`
                      : 'Phường X, Huyện Y, Tỉnh Z'}
                  </Text>
                  <Icon name="right" size={20} />
                </View>
              </Pressable>
              <TextInput
                value={newAddress.detail}
                onChangeText={text => handleChangeText('detail', text)}
                placeholder="Tên đường, tòa nhà, số nhà"
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                }}></TextInput>
            </View>
          </View>
          <View>
            <Text
              style={{
                marginBottom: 12,
                color: '#222222',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Cài đặt
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 16,
                paddingLeft: 20,
                paddingRight: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <Text style={{color: '#222222'}}>Đặt làm địa chỉ mặc định</Text>
              <Switch
                value={newAddress.isDefault ?? false}
                onValueChange={value =>
                  dispatch(
                    setChangeTextNewAddress({
                      name: 'isDefault',
                      text: value,
                    }),
                  )
                }
                trackColor={{true: '#e9e8e8', false: '#D9D9D9'}}
                thumbColor={
                  !newAddress.isDefault ? '#d7d7d7' : '#FA7533'
                }></Switch>
            </View>
          </View>
          <Pressable onPress={handleClickOk}>
            <View
              style={{
                backgroundColor: isContinue ? '#F16722' : '#ccc',
                height: 50,
                marginHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                elevation: 2,
              }}>
              <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                {isEditAddress ? 'Lưu' : 'Thêm địa chỉ'}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
