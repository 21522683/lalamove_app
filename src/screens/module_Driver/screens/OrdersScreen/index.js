import {
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../../components/OrderIItem/index.js';
import {useDispatch, useSelector} from 'react-redux';
import GetLocation from 'react-native-get-location';
import {getAllOrderInRadius} from '../../../../redux/slices/orderSlice.js';

const DriverOrdersScreen = ({navigation}) => {
  const data = [
    {
      orderId: '1',
      driverId: '1',
      customerId: '1',
      distance: 3,
      sourceAddress: {
        addressId: '1',
        userId: '1',
        name: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        addressId: '2',
        userId: '1',
        name: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        phoneNumber: '0868008460',
        latitude: 68.126,
        longtitude: 396.156,
      },
      vehicleType: 'Xe máy',
      status: 'Bình thường',
      charge: 120000,
      date: '23/04/2003',
    },
  ];
  const dispatch = useDispatch();
  const [driverOrders, setDriverOrders] = useState();
  const orders = useSelector(state => state.orders.ordersInRadius);
  useEffect(() => {
    (async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        if (!location) {
          throw new Error('No location available');
        }
        console.log(location);
        dispatch(
          getAllOrderInRadius({
            query: {
              latitude: location.latitude,
              longitude: location.longitude,
              radius: 100,
            },
          }),
        );
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  useEffect(() => {
    if (orders) {
      setDriverOrders(orders.filter(item => item.status === 'Đang chờ nhận'));
    }
  }, [orders]);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <></>
      <View style={[styles.horizontal_flex]}>
        <View
          style={[
            styles.horizontal_flex,
            styles.gap_20,
            styles.outline_button,
          ]}>
          <Text style={[styles.text_base, styles.main_color]}>Làm việc</Text>
          <View
            style={{
              borderRadius: 10,
              width: 10,
              height: 10,
              backgroundColor: '#F16722',
              opacity: 0.5,
            }}></View>
        </View>
        <View style={[styles.horizontal_flex, styles.gap_10]}>
          <Icon name="search1" size={24} color="#BDBDBD" />
          <Icon name="filter" size={24} color="#BDBDBD" />
        </View>
      </View>
      <View>
        {driverOrders && (
          <FlatList
            data={driverOrders}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() =>
                  navigation.navigate('OrderDetailDriverScreen', {...item})
                }>
                <OrderItem {...item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <></>
    </SafeAreaView>
  );
};

export default DriverOrdersScreen;
