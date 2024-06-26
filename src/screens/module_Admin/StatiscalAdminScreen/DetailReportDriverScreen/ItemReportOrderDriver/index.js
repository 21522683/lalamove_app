import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../../assets/images';
import formatMoney from '../../../../../constants/formatMoney';
import convertDate from '../../../../../constants/converDate';
import { useDispatch } from 'react-redux';
import { setIdOrderSelected } from '../../../../../redux/slices/reportSlice';

const ItemReportOrderDriver = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleClickSee = () => {
    dispatch(setIdOrderSelected(item._id));
    navigation.navigate('DetailOrderStatiscal');
  }

  return (
    <View style={styles.container_item_diver} >
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Người đặt: {item.customer.fullName}</Text>
        <Text style={styles.name_diver}>Mã đơn hàng: {item._id}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.email}>{formatMoney(item.charge)}</Text>
          <Text style={styles.email}>{convertDate(item.date)}</Text>
        </View>
        <Text style={styles.status}>Đã hoàn thành</Text>
      </View>
      <TouchableOpacity style={styles.button_detail} onPress={handleClickSee}>
        <Text style={styles.text_button}>Xem</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemReportOrderDriver