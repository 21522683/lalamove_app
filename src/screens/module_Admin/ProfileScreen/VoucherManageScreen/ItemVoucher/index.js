import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { IMAGES } from '../../../../../assets/images'

const ItemVoucher = ({ item, navigation }) => {
  const formatDateString = (d) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const checkExpired = () => {
    if (item?.expiredDate > new Date()) {
      return true;
    }
    if (item?.quality <= 0) {
      return true;
    }
  }
  return (
    <TouchableOpacity style={styles.container_item} onPress={() => {
      navigation.navigate('VoucherForm', {
        item: { ...item },
        name: 'Cập nhật voucher',
        type: 'update'
      })
    }}>
      <View style={styles.row_item_voucher}>
        <Text style={styles.voucher_code}>Voucher: {item?.voucherCode}</Text>
        <Text style={styles.normal_font}>{formatDateString(item?.startDate)}</Text>
      </View>
      <View style={styles.row_item_voucher}>
        <Text style={styles.normal_font}>Thời hạn: <Text style={styles.bold_font}>{formatDateString(item?.expiredDate)}</Text> </Text>
        <Text style={styles.normal_font}>Số lượng: <Text style={styles.bold_font}>{item?.quality}</Text></Text>
      </View>
      <View style={styles.row_item_voucher}>
        <Text style={styles.normal_font}>Mệnh giá: <Text style={styles.bold_font}>{item?.voucherPrice} {item?.isPercent ? "%" : "VND"}</Text></Text>
        <Text style={styles.normal_font}>Trạng thái: <Text style={{ ...styles.bold_font, color: checkExpired() ? "red" : "green" }}>{checkExpired() ? "Hết hạn" : "Còn hạn"}</Text></Text>
      </View>

    </TouchableOpacity>
  )
}

export default ItemVoucher