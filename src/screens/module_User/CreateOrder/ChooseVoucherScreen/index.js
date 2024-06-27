import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import VehicleItem from './QQ';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';
import VoucherItem from './VoucherItem';
import {
  setVoucher,
  unUseVoucher,
} from '../../../../redux/slices/createOrderSlice';

const ChooseVoucherScreen = ({route}) => {
  const money = route.params.money;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.users.userAuth);
  const idVoucherChoosen = useSelector(
    state => state.createOrder.idVoucherChoosen,
  );

  const [vouchers, setVouchers] = useState([]);

  const getVouchers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log(`${baseUrl}/vouchers/vouchersByCustomer/${money}`);
      const response = await axios.get(
        `${baseUrl}/vouchers/vouchersByCustomer/${money}`,
        config,
      );
      const vouchers = response.data.data;
      console.log(vouchers);
      setVouchers(vouchers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVouchers();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Chọn voucher</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={[styles.body, {gap: 16, backgroundColor: 'white'}]}>
        <FlatList
          data={vouchers}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 2,
            paddingBottom: 10,
          }}
          renderItem={({item, index}) => (
            <VoucherItem key={index} item={item} index={index} />
          )}
        />

        <Pressable
          onPress={() => {
            if (!idVoucherChoosen) return;
            dispatch(
              setVoucher(vouchers.find(item => item._id === idVoucherChoosen)),
            );
            navigation.goBack();
          }}>
          <View
            style={{
              backgroundColor: idVoucherChoosen !== '' ? '#F16722' : '#ccc',
              height: 45,
              marginHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
              Xác nhận
            </Text>
          </View>
        </Pressable>
        {idVoucherChoosen && (
          <Pressable
            onPress={() => {
              dispatch(unUseVoucher());
            }}>
            <View
              style={{
                backgroundColor: '#ccc',
                height: 45,
                marginHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                Hủy dùng
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChooseVoucherScreen;
