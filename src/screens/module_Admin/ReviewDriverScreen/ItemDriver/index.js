import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import convertDate from '../../../../constants/converDate'
import CUSTOM_COLOR from '../../../../constants/colors'

const ItemDriver = ({ onClicked, item }) => {

  return (
    <View style={styles.container_item_diver} >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>{item.fullName}</Text>
        {
          item.isLocked === true && (
            <View style={styles.info_more}>
              <Text style={{color: '#ff0000'}}>Đang bị khóa</Text>
              <Text style={styles.date_create}>{convertDate(item.createdAt)}</Text>
            </View>
          )
        }
        {
          (item.isLocked === false && item.isWaitingAccepted === false) && (
            <View style={styles.info_more}>
              <Text style={{color: 'green'}}>Đang hoạt động</Text>
              <Text style={styles.date_create}>{convertDate(item.updatedAt)}</Text>
            </View>
          )
        }
        {
          (item.isLocked === false && item.isWaitingAccepted === true) && (
            <View style={styles.info_more}>
              <Text style={{color: CUSTOM_COLOR.Primary}}>Chờ xét duyệt</Text>
              <Text style={styles.date_create}>{convertDate(item.updatedAt)}</Text>
            </View>
          )
        }
      </View>
      <TouchableOpacity style={styles.button_detail} onPress={onClicked}>
        <Text style={styles.text_button} t>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemDriver