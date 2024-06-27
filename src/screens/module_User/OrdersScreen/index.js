import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../components/OrderIItem/index.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllUserOrdersAction,
  setOrderDetail,
} from '../../../redux/slices/orderSlice.js';
import CUSTOM_COLOR from '../../../constants/colors.js';

const Tab = createMaterialTopTabNavigator();

function UserOrdersScreen(navigation) {
  const [textSearch, setTextSearch] = useState('');
  return (
    <View style={{flex: 1}}>
      <View style={styles.header_container}>
        <Text style={styles.receive_instance}>Đơn hàng của tôi</Text>
        <View style={styles.search_container}>
          <Icon name="search1" size={20} color="#BDBDBD" />
          <TextInput
            onChangeText={e => setTextSearch(e)}
            style={styles.search_hint}
            placeholder="Tìm kiếm tất cả các đơn hàng"
          />
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: CUSTOM_COLOR.Primary,
            height: 2,
          },
        }}>
        <Tab.Screen name="Chờ nhận đơn">
          {() => (
            <OrdersScreen status="Đang chờ nhận" textSearch={textSearch} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Chờ lấy hàng">
          {() => (
            <OrdersScreen status="Đang chờ lấy hàng" textSearch={textSearch} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Đang giao">
          {() => (
            <OrdersScreen status="Đang giao hàng" textSearch={textSearch} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Hoàn thành">
          {() => (
            <OrdersScreen status="Đã hoàn thành" textSearch={textSearch} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Đã hủy">
          {() => <OrdersScreen status="Đã hủy" textSearch={textSearch} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const OrdersScreen = ({navigation, status, textSearch}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.userOrders);
  const [userOrders, setUserOrders] = useState(null);
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllUserOrdersAction());
    }, []),
  );

  useEffect(() => {
    if (textSearch === '') {
      if (orders) {
        setUserOrders(orders.filter(item => item.status === status));
      }
    } else {
      setUserOrders(
        userOrders?.filter(item =>
          item._id
            .toString()
            .toLowerCase()
            .includes(textSearch?.trim().toLowerCase()),
        ),
      );
    }
  }, [textSearch]);

  useEffect(() => {
    if (orders) {
      setUserOrders(orders.filter(item => item.status === status));
    }
  }, [orders, status]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <></>
      <View>
        {userOrders && (
          <FlatList
            data={userOrders}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  dispatch(setOrderDetail({...item}));
                  navigator.navigate('OrderDetailScreen');
                }}>
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

export default UserOrdersScreen;
