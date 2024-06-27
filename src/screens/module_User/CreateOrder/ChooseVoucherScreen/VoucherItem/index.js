import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import styles from './style';
import {IMAGES} from '../../../../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIdVoucher,
  setVoucher,
} from '../../../../../redux/slices/createOrderSlice';

const VoucherItem = ({item, index}) => {
  const dispatch = useDispatch();
  const idVoucherChoosen = useSelector(
    state => state.createOrder.idVoucherChoosen,
  );
  const isChoosen = item._id === idVoucherChoosen;
  const formatDateString = d => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const handleClickVoucher = () => {
    if (isChoosen) return;
    dispatch(setIdVoucher(item._id));
  };

  return (
    <Pressable
      style={[
        styles.container_item,
        isChoosen && {
          borderColor: '#F16722',
          borderBottomWidth: 4,
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
      ]}
      onPress={handleClickVoucher}>
      <View style={styles.row_item_voucher}>
        <Text style={styles.voucher_code}>Voucher: {item?.voucherCode}</Text>
        <Text style={styles.normal_font}>
          {formatDateString(item?.startDate)}
        </Text>
      </View>
      <View style={styles.row_item_voucher}>
        <Text style={styles.normal_font}>
          Thời hạn:{' '}
          <Text style={styles.bold_font}>
            {formatDateString(item?.expiredDate)}
          </Text>{' '}
        </Text>
        <Text style={styles.normal_font}>
          Số lượng: <Text style={styles.bold_font}>{item?.quality}</Text>
        </Text>
      </View>
      <View style={styles.row_item_voucher}>
        <Text style={styles.normal_font}>
          Mệnh giá:{' '}
          <Text style={styles.bold_font}>
            {item?.voucherPrice} {item?.isPercent ? '%' : 'VND'}
          </Text>
        </Text>
        <Text style={styles.normal_font}>
          Trạng thái:{' '}
          <Text
            style={{
              ...styles.bold_font,
              color: 'green',
            }}>
            Còn hạn
          </Text>
        </Text>
      </View>
    </Pressable>
  );
};

export default VoucherItem;
