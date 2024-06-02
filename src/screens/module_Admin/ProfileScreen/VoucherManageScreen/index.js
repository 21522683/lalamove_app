import { SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import CUSTOM_COLOR from '../../../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import ItemVoucher from './ItemVoucher'
import { getAllVouchersAction } from '../../../../redux/slices/voucherSlices';

const VoucherManageScreen = ({ navigation }) => {
  
  const vouchers = useSelector(state => state?.vouchers?.vouchers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVouchersAction());
  }, [dispatch])
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.list_diver}>
        {
          // vouchers?.map((item, index) => {
          //   return (
          //     <ItemVoucher key={item._id} item={item} navigation={navigation} />
          //   )
          // })
        }
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 20,
          right: 10,
          height: 60,
          backgroundColor: CUSTOM_COLOR.Primary,
          borderRadius: 100,
        }}

        onPress={() => {
          navigation.navigate('VoucherForm', {
            name: 'Thêm voucher',
            type: 'add'
          })
        }}
      >
        <Ionicons name='plus' size={30} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default VoucherManageScreen