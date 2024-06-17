import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../../assets/images';

const ItemReportOrderDriver = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container_item_diver} >
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Người đặt: Phan Trọng Tính</Text>
        <Text style={styles.name_diver}>Mã đơn hàng: ĐH00178</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.email}>159.000 đ</Text>
          <Text style={styles.email}>11/06/2024</Text>
        </View>
        <Text style={styles.status}>Đã hoàn thành</Text>
      </View>
      <TouchableOpacity style={styles.button_detail} onPress={() => navigation.navigate('DetailOrderStatiscal')}>
        <Text style={styles.text_button}>Xem</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemReportOrderDriver