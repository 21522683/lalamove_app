import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
import cs from '../../CustomStyle';
import CUSTOM_COLOR from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICONS} from '../../../../assets/icons';
import AddressItem from '../AddressItem';

const OrderItem = props => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <View style={styles.container}>
      <View style={styles.outer__header_distance}>
        {props.status === 'Đang chờ nhận' ? (
          <Text style={styles.inner_header_distance_text}>
            (~{Math.round(props.distance * 10) / 10} Kilomet) Nhận đơn ngay
          </Text>
        ) : (
          <Text style={styles.inner_header_distance_text}>
            Đơn hàng #{props._id.substr(props._id.length - 12)}
          </Text>
        )}
      </View>
      <View style={{paddingHorizontal: 17}}>
        <Text style={styles.status_text}>{props.status}</Text>
        <AddressItem props={props} hide />
      </View>
      <View style={styles.vehicle_type}>
        <Text style={{fontSize: 16}}>{props.vehicleType?.vehicleTypeName}</Text>
      </View>
      <View style={styles.horizontal_line}></View>
      <View style={styles.outer_money}>
        <Image source={ICONS.dollarMoneyIcon} style={{width: 28, height: 19}} />
        <Text style={{fontSize: 16, fontWeight: '700', color: '#333333'}}>
          {VND.format(props.charge)}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
