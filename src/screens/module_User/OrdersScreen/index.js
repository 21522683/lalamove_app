import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../components/OrderIItem/index.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function UserOrdersScreen(navigation) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header_container}>
        <Text style={styles.receive_instance}>Đơn hàng của tôi</Text>
        <View style={styles.search_container}>
          <Icon name="search1" size={20} color="#BDBDBD" />
          <Text style={styles.search_hint}>Tìm kiếm tất cả các đơn hàng</Text>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="Đang giao"
          component={() => <OrdersScreen status="Đang giao" />}
        />
        <Tab.Screen
          name="Hoàn thành"
          component={() => <OrdersScreen status="Hoàn thành" />}
        />
        <Tab.Screen
          name="Đã hủy"
          component={() => <OrdersScreen status="Đã hủy" />}
        />
      </Tab.Navigator>
    </View>
  );
}

const OrdersScreen = ({navigation, status}) => {
  const navigator = useNavigation();
  var data = [
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Đang giao',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Đang giao',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Đang giao',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Đã hủy',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Hoàn thành',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Hoàn thành',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
    {
      orderId: '1289327092384098',
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
      vehicleType: {
        _id: '1',
        vehicleTypeName: 'Xe máy',
        mount: '30kg',
        size: '50cm x 40cm x 50cm',
        minPrice: 16200,
        minLength: 0,
        priceAddIfOut: 4000,
        suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ k',
        note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích'
      },
      status: 'Đang giao',
      charge: 120000,
      date: 'Web, Apr 23, 23:17',
    },
  ].filter(item => item.status === status);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <></>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() =>
                navigator.navigate('OrderDetailScreen', {...item})
              }>
              <OrderItem {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <></>
    </SafeAreaView>
  );
};

export default UserOrdersScreen;
