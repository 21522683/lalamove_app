import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../../assets/images'
import styles from './style'
import { useNavigation } from '@react-navigation/native';

const ItemOrderStatiscal = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container_item_diver} >
      <Image source={IMAGES.avatar} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Người đặt: Phan Trọng Tính</Text>
        <Text style={styles.name_diver}>Mã đơn hàng: ĐH00178</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.email}>159.000 đ</Text>
          <Text style={styles.email}>11/06/2024</Text>
          <Text style={styles.status}>Đã hoàn thành</Text>
        </View>
      </View>
    </View>
  )
}

export default ItemOrderStatiscal