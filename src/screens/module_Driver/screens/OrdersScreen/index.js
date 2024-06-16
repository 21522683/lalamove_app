import {
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../../components/OrderIItem/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingOrdersAction } from '../../../../redux/slices/orderSlices.js';

const DriverOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const pendingOrders = useSelector(state => state?.orders?.pendingOrders);

  useEffect(() => {
    // dispatch(getAllPendingOrdersAction());
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
      status: 'Đang chờ nhận',
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
      status: 'Đang chờ nhận',
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
      status: 'Đang chờ nhận',
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
      status: 'Đang chờ nhận',
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
      status: 'Đang chờ nhận',
      charge: 120000,
      date: '23/04/2003',
    },
  ];

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
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() =>
                navigation.navigate('OrderDetailDriverScreen', { ...item })
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

export default DriverOrdersScreen;
