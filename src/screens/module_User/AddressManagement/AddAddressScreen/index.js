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
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setChangeTextNewAddress,
  setXYZ,
} from '../../../../redux/slices/createOrderSlice';

const AddAddressScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newAddress = useSelector(state => state.createOrder.newAddress);
  console.log(newAddress);

  const handleChangeText = (name, text) => {
    dispatch(setChangeTextNewAddress({name, text}));
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
          <Pressable>
            <View
              style={{
                backgroundColor: '#F16722',
                height: 50,
                marginHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                elevation: 2,
              }}>
              <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                Thêm địa chỉ
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
