import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../../assets/images'
import styles from './style'
import { useNavigation } from '@react-navigation/native';

const ItemReportDriver = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container_item_diver} >
      <Image source={IMAGES.avatar} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Tài xế: Phan Trọng Tính</Text>
        <Text style={styles.email}>phantrongtinh15082003@gmail.com</Text>
        <Text style={styles.status}>Đang hoạt động</Text>
      </View>
      <TouchableOpacity style={styles.button_detail} onPress={() => navigation.navigate('DetailReportDriverScreen')}>
        <Text style={styles.text_button} t>Xem</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemReportDriver