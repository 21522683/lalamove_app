import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import formatMoney from '../../../../constants/formatMoney';
import convertDate from '../../../../constants/converDate';

const ItemOrderStatiscal = ({item}) => {
  return (
    <View style={styles.container_item_diver} >
      <Image source={{uri: item.customer.avatar}} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Người đặt: {item.customer.fullName}</Text>
        <Text style={styles.name_diver}>Đơn hàng: {item._id}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.email}>{formatMoney(item.charge)}</Text>
          <Text style={styles.email}>{convertDate(item.date)}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
    </View>
  )
}

export default ItemOrderStatiscal