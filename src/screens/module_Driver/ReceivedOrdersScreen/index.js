import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderItem from '../components/OrderIItem/index.js';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUserOrdersAction} from '../../../redux/slices/orderSlice.js';

const Tab = createMaterialTopTabNavigator();

function DriverReceivedOrdersScreen(navigation) {
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
        <Tab.Screen name="Đang giao">
          {() => <OrdersScreen status="Đang giao hàng" />}
        </Tab.Screen>
        <Tab.Screen name="Hoàn thành">
          {() => <OrdersScreen status="Đã hoàn thành" />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const OrdersScreen = ({navigation, status}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.userOrders);
  const [userOrders, setUserOrders] = useState([]);
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllUserOrdersAction());
    }, []),
  );
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
        <FlatList
          data={userOrders}
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
