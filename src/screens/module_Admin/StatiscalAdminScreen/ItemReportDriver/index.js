import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setIdDriverSelected } from '../../../../redux/slices/reportSlice';

const ItemReportDriver = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleClickSee = () => {
    dispatch(setIdDriverSelected(item._id));
    navigation.navigate('DetailReportDriverScreen');
  }

  return (
    <View style={styles.container_item_diver} >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Tài xế: {item.fullName}</Text>
        <Text style={styles.email}>{item.email}</Text>
        {
          item.isLocked === false ? (
            <Text style={styles.status}>Đang hoạt động</Text>
          ) : (
            <Text style={styles.lock}>Đang bị khóa</Text>
          )
        }
      </View>
      <TouchableOpacity style={styles.button_detail} onPress={handleClickSee}>
        <Text style={styles.text_button} t>Xem</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemReportDriver