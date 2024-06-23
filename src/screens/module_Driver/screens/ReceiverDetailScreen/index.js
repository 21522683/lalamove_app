import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import React from 'react';
import styles from './style';
import {ICONS} from '../../../../assets/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import Icon7 from 'react-native-vector-icons/Octicons';
import cs from '../../CustomStyle';
import CUSTOM_COLOR from '../../../../constants/colors';
import AddressItem from '../../components/AddressItem';

const ReceiverDetailDriverScreen = ({navigation, route}) => {
  var order = {...route.params};

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.text_receiver_time}>
          Nhận lúc {new Date().toLocaleTimeString()}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#575757"
            style={styles.arrow_back_icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.outer_good}>
          <Text style={styles.contact_phone_text}>
            Liên hệ khách gửi hàng{' ****'}
            {order.sourceAddress.phoneNumber.substr(
              order.sourceAddress.phoneNumber.length - 3,
              order.sourceAddress.phoneNumber.length,
            )}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatDriverScreen', {
                name: order.customer?.fullName,
                uid: order.customer?._id,
                avatar: order.customer?.avatar,
              })
            }>
            <View style={styles.outer_contact_icon}>
              <Icon2 name="message1" size={24} color={CUSTOM_COLOR.Primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${order.sourceAddress.phoneNumber}`)
            }>
            <View style={styles.outer_contact_icon}>
              <Icon3 name="phone" size={24} color={CUSTOM_COLOR.Primary} />
            </View>
          </TouchableOpacity>
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
        <View style={styles.outer_addresses}>
          <View style={[cs.horizontal_flex, styles.space_between]}>
            <Text>Hôm nay, 10:38</Text>
            <Text>#{order._id.substr(order._id.length - 12)}</Text>
          </View>
          <Text style={styles.status_text}>{order.status}</Text>
          <View style={[styles.sign_outer]}>
            <Icon2 name="edit" size={24} color="#2F2F2F" />
            <Text style={styles.signal_text}>
              Cần xác nhận giao hàng thành công tại điểm trả hàng
            </Text>
          </View>
          <AddressItem props={order} />
        </View>
        <View style={styles.outer_good}>
          <Image
            source={ICONS.vehicleIcon}
            style={{width: 24, height: 24, marginRight: 10}}
          />
          <View>
            <Text style={styles.main_type_good}>
              {order.vehicleType.vehicleTypeName}
            </Text>
            <View style={{width: '90%'}}>
              <Text style={styles.title_good_info_item}>
                {order.vehicleType.size} {'\n'}
                {order.vehicleType.suitableFor}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 110}}></View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingBottom: 15,
          bottom: 0,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#606060',
            textAlign: 'center',
            marginVertical: 5,
          }}>
          Xác nhận với khách hàng về các loại chi phí phát sinh
        </Text>
        <View style={[cs.horizontal_flex, styles.space_between]}>
          <View style={[styles.outer_cancel_btn, styles.width_50]}>
            <Text
              style={{
                fontSize: 16,
                color: CUSTOM_COLOR.Primary,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Hủy đơn hàng
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.outer_receiver_slider, styles.width_50]}
            onPress={() =>
              navigation.navigate('DriverReviewMap', {
                order: {...order},
                isToSource: true,
              })
            }>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Nhận kiện hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReceiverDetailDriverScreen;
