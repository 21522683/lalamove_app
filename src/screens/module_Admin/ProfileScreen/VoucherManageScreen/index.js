import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import CUSTOM_COLOR from '../../../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import ItemVoucher from './ItemVoucher'
import { getAllVouchersAction } from '../../../../redux/slices/voucherSlices';
import { IMAGES } from '../../../../assets/images';

const VoucherManageScreen = ({ navigation }) => {

  const vouchers = useSelector(state => state?.vouchers?.vouchers);
  const [voucherLists, setVoucherLists] = useState(vouchers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVouchersAction());
  }, [dispatch])
  const options = [
    { label: 'Tất cả', value: 'Tất cả' },
    { label: 'Còn hạn', value: 'Còn hạn' },
    { label: 'Hết hạn', value: 'Hết hạn' },
  ];

  const handleSelect = (value) => {
    setFilter(prev => ({ ...prev, option: value }));
  };
  const handleChangeTextSearch = (value) => {
    setFilter(prev => ({ ...prev, textSearch: value }));
  }
  const [filter, setFilter] = useState(
    {
      textSearch: '',
      option: 'Tất cả',
    }
  );
  const checkExpired = (i) => {
    if (i?.expiredDate > new Date()) {
      return true;
    }
    if (i?.quality <= 0) {
      return true;
    }
  }
  useEffect(() => {
    if (filter.option === 'Tất cả') {
      setVoucherLists(vouchers.filter(e => (e.voucherCode.toLowerCase()).includes(filter?.textSearch?.toLowerCase())))
    }
    if (filter.option === 'Còn hạn') {
      setVoucherLists(vouchers.filter(e => !checkExpired(e) && (e.voucherCode.toLowerCase()).includes(filter?.textSearch?.toLowerCase())))
    }
    if (filter.option === 'Hết hạn') {
      setVoucherLists(vouchers.filter(e => checkExpired(e) && (e.voucherCode.toLowerCase()).includes(filter?.textSearch?.toLowerCase())))
    }
  }, [filter, vouchers]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search_bar}>
        <TextInput value={filter.textSearch} onChangeText={handleChangeTextSearch} style={styles.search_input} placeholder='Nhập thông tin tìm kiếm' />
        <Image source={IMAGES.search_icon} style={styles.icon_search} />
      </View>
      <View style={styles.tab_nav_container}>
        {
          options.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleSelect(item.value)} style={styles.btn_tab} activeOpacity={0.7}>
                <View style={filter.option === item.value ? styles.item_tab_active : styles.item_tab}>
                  <Text style={filter.option === item.value ? styles.text_tab_active : styles.text_tab}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

      <Text style={styles.title_list}>DANH SÁCH VOUCHER</Text>
      <ScrollView style={styles.list_diver}>
        {
          voucherLists?.map((item, index) => {
            return (
              <ItemVoucher key={index} item={item} navigation={navigation} />
            )
          })
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