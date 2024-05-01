import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../../assets/images'
import styles from './style'

const ItemDriver = ({onClicked}) => {
  return (
    <View style={styles.container_item_diver} onPress={onClicked}>
      <Image source={IMAGES.avatar} style={styles.avatar} />
      <View style={styles.container_info}>
        <Text style={styles.name_diver}>Nguyễn Văn Trường Sơn</Text>
        <View style={styles.info_more}>
          <Text style={styles.status}>Đã xét duyệt</Text>
          <Text style={styles.date_create}>12/04/2024</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button_detail}>
        <Text style={styles.text_button} t>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemDriver