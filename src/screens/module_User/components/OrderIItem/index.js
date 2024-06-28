import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
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
        <Text style={styles.inner_header_distance_text}>
          {new Date(props.date).toLocaleString()}
        </Text>
        <Text style={styles.status_text}>{props.status}</Text>
      </View>
      <View style={{paddingHorizontal: 17, marginTop: 10}}>
        <AddressItem props={props} hide />
      </View>

      <View style={styles.horizontal_line}></View>
      <View style={styles.outer_money}>
        <Text style={{fontSize: 16}}>{props.vehicleType?.vehicleTypeName}</Text>
        <Text style={{fontSize: 16, fontWeight: '700', color: '#333333'}}>
          {VND.format(props.charge - props.discountPrice)}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
