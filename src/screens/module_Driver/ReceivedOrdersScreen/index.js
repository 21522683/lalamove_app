import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../components/OrderIItem/index.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrdersAction } from '../../../redux/slices/orderSlices.js';

const Tab = createMaterialTopTabNavigator();

function DriverReceivedOrdersScreen(navigation) {
  const dispatch = useDispatch();
  const userOrders = useSelector(state => state?.orders?.userOrders);

  useEffect(() => {
    // dispatch(getAllUserOrdersAction());
  }, [dispatch])
  const data = [
    {
      _id: '1',
      drive: '1',
      customer: '1',
      distance: 3,
      sourceAddress: {
        _id: '1',
        user: '1',
        fullName: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        isDefault: true,
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        _id: '2',
        user: '1',
        fullName: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        isDefault: true,
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
      orderNote: 'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
      orderType: "Thực phẩm và đồ uống",
      shortDescription: '2 gói hàng từ 10kg đến 30kg',
      orderImage: '',
      status: 'Đang giao hàng',
      charge: 120000,
      date: '23/04/2003',
    },
    {
      orderId: '1',
      driverId: '1',
      customerId: '1',
      distance: 3,
      sourceAddress: {
        _id: '1',
        user: '1',
        fullName: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        isDefault: true,
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        _id: '2',
        user: '1',
        fullName: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        isDefault: true,
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
      orderNote: 'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
      orderType: "Thực phẩm và đồ uống",
      shortDescription: '2 gói hàng từ 10kg đến 30kg',
      orderImage: '',
      status: 'Đã hủy',
      charge: 120000,
      date: '23/04/2003',
    },
    {
      orderId: '1',
      driverId: '1',
      customerId: '1',
      distance: 3,
      sourceAddress: {
        _id: '1',
        user: '1',
        fullName: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        isDefault: true,
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        _id: '2',
        user: '1',
        fullName: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        isDefault: true,
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
      orderNote: 'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
      orderType: "Thực phẩm và đồ uống",
      shortDescription: '2 gói hàng từ 10kg đến 30kg',
      orderImage: '',
      status: 'Đang giao hàng',
      charge: 120000,
      date: '23/04/2003',
    },
    {
      orderId: '1',
      driverId: '1',
      customerId: '1',
      distance: 3,
      sourceAddress: {
        _id: '1',
        user: '1',
        fullName: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        isDefault: true,
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        _id: '2',
        user: '1',
        fullName: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        isDefault: true,
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
      orderNote: 'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
      orderType: "Thực phẩm và đồ uống",
      shortDescription: '2 gói hàng từ 10kg đến 30kg',
      orderImage: '',
      status: 'Đã hoàn thành',
      charge: 120000,
      date: '23/04/2003',
    },
    {
      orderId: '1',
      driverId: '1',
      customerId: '1',
      distance: 3,
      sourceAddress: {
        _id: '1',
        user: '1',
        fullName: 'Lê Quang Nhân',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Tân',
        ward: 'Tân tạo A',
        detail: '4519 Nguyễn Cửu Phú',
        isDefault: true,
        phoneNumber: '0868008460',
        latitude: 128.168,
        longtitude: 169.259,
      },
      destinationAddress: {
        _id: '2',
        user: '1',
        fullName: 'Nguyễn Văn Quí',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Thạnh Hòa',
        detail: '21B Barker Street',
        isDefault: true,
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
      orderNote: 'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
      orderType: "Thực phẩm và đồ uống",
      shortDescription: '2 gói hàng từ 10kg đến 30kg',
      orderImage: '',
      status: 'Đã hoàn thành',
      charge: 120000,
      date: '23/04/2003',
    },
  ];

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
          component={() => <OrdersScreen data={[...data.filter(item => item.status === "Đang giao hàng")]}/>}
        />
        <Tab.Screen
          name="Hoàn thành"
          component={() => <OrdersScreen data={[...data.filter(item => item.status === "Đã hoàn thành")]}  />}
        />
        <Tab.Screen
          name="Đã hủy"
          component={() => <OrdersScreen data={[...data.filter(item => item.status === "Đã hủy")]} />}
        />
      </Tab.Navigator>
    </View>
  );
}

const OrdersScreen = ({navigation, data}) => {
  const navigator = useNavigation();
  
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
                navigator.navigate('ReceivedDriverOrderDetailScreen', {...item})
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

export default DriverReceivedOrdersScreen;
