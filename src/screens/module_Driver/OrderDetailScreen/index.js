import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ICONS} from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import AddressItem from '../components/AddressItem';
import {IMAGES} from '../../../assets/images';
import ContactItem from '../components/ContactItem';
import ReviewModal from './ReviewModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../constants/baseUrl';

const ReceivedDriverOrderDetailScreen = ({navigation, route}) => {
  var order = {...route.params};
  const userAuth = useSelector(state => state.users.userAuth);
  const [reviewOrder, setReviewOrder] = useState(null);
  var goodInfo = {
    type: 'Thực phẩm và đồ uống',
    amount: '10kg đến 30kg',
    quantity: 2,
    description:
      'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
    vehicleDescription: 'Giao hàng cồng kềnh, 60x50x60 cm, lên đến 50 kg',
  };
  const checkReviewOrder = async ()=>{
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const url = `${baseUrl}/order/review-order/${order._id}`;
      const data = await axios.get(url, config);
      setReviewOrder(data.data.data);
      setVisibleReview(true);
    } catch (error) {
      console.log(error)
      Alert.alert('Thông báo', "Đã có lỗi xảy ra vui lòng thử lại sau.");
    }
  }
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const scrollViewRef = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [visibleReview, setVisibleReview] = useState(false);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.receive_instance}>{order.status}</Text>
      </View>
      <TouchableOpacity
        style={{marginTop: -35, marginLeft: 15}}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#575757" />
      </TouchableOpacity>
      {order.status === 'Đang giao hàng' && (
        <Image
          source={IMAGES.map}
          style={{position: 'absolute', zIndex: -1}}></Image>
      )}

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        {order.status === 'Đang giao hàng' && (
          <View>
            <View style={{height: windowHeight / 2}}></View>
            {/* <ContactItem {...order.sourceAddress} /> */}
          </View>
        )}
        <View style={{backgroundColor: '#fff', height: windowHeight - 80}}>
          {order.status !== 'Đã hủy' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.calendarIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày giao hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}
          {order.status === 'Đã hoàn thành' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.receiverTimeIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày nhận hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}
          {order.status === 'Đã hủy' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.cancelTimeIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày hủy</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}

          <View style={styles.outer_addresses}>
            <AddressItem props={order} hide />
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.goodIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>{goodInfo.type}</Text>

              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>
                  Tổng khối lượng:{' '}
                </Text>
                <Text style={styles.content_good_info_item}>
                  {goodInfo.amount}
                </Text>
              </View>
              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Số lượng: </Text>
                <Text style={styles.content_good_info_item}>
                  {goodInfo.quantity}
                </Text>
              </View>
              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Mô tả: </Text>
                <View style={{width: '85%'}}>
                  <Text style={styles.content_good_info_item}>
                    {goodInfo.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.vehicleIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>{order.vehicleType}</Text>
              <View style={{height: 7}} />
              <View style={{width: '90%'}}>
                <Text style={styles.title_good_info_item}>
                  {goodInfo.vehicleDescription}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.dollarMoneyIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>
                {VND.format(order.charge)}
              </Text>
              <View style={{height: 7}} />
              <Text style={styles.title_good_info_item}>Thu tiền mặt</Text>
            </View>
          </View>
          {/* <View style={{height: windowHeight}}></View> */}
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal animationType="fade" transparent={true} visible={visibleReview}>
          <ReviewModal
            onClose={() => {
              setVisibleReview(false);
            }}
            props={{
              orderId: order._id,
              driverName: order?.drive?.fullName,
              avatar: order?.drive?.avatar,
              driveId: order?.drive?._id
            }}
            review={reviewOrder}
          />
        </Modal>
      </View>
    </View>
  );
};

export default ReceivedDriverOrderDetailScreen;
