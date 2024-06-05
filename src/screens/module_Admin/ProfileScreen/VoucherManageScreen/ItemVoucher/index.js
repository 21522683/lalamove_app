import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { IMAGES } from '../../../../../assets/images'

const ItemVoucher = ({ item, navigation }) => {
  return (
    <View style={styles.container_item_diver}>
      <View style={styles.container_info}>
        <Text style={styles.license_number}>{item?.driverLisenceNumber}</Text>
        <Text style={styles.type}>{item?.driverLisenceType}</Text>

        <View style={{
          ...styles.info_more,
          backgroundColor: item?.status === 'Đã xác minh' ? '#E4FEDD'
            : item?.status === 'Không hợp lệ' ? '#FEDDE3'
              : item?.status === 'Đang kiểm tra' ? '#DDE0FE' : ""
        }}>
          <Text style={{
            color: item?.status === 'Đã xác minh' ? '#32640A'
              : item?.status === 'Không hợp lệ' ? '#BA051A'
                : item?.status === 'Đang kiểm tra' ? '#222221' : ""
          }}>{item?.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button_foward} onPress={() => {
        if (item?.status === 'Đã xác minh') {
          navigation.navigate('license-driver-infor', {
            ...item
          })
        }
        else {
          navigation.navigate('license-driver-form', {
            item:{...item},
            name:'Cập nhật bằng lái',
            type: 'update'
          })
        }
      }}>
        <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
      </TouchableOpacity>
    </View>
  )
}

export default ItemVoucher