import { View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { IMAGES } from '../../../assets/images'
import ItemDriver from './ItemDriver'
import { useNavigation } from '@react-navigation/native'
import baseUrl from '../../../constants/baseUrl'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setIndexSelectedDriver, setListAllDriver } from '../../../redux/slices/usersSlices'

const ReviewDriverScreen = () => {

  const navigation = useNavigation();

  const options = [
    { label: 'Tất cả', value: 'Tất cả' },
    { label: 'Đang hoạt động', value: 'Đang hoạt động' },
    { label: 'Chờ xét duyệt', value: 'Chờ xét duyệt' },
    { label: 'Đang bị khóa', value: 'Đang bị khóa' }
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

  const dispatch = useDispatch();

  const userAuth = useSelector(state => state.users.userAuth);
  const listAllDriver = useSelector(state => state.users.listAllDriver);

  const getAllDrivers = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const params = new URLSearchParams(filter).toString();
      const url = `${baseUrl}/users/get-all-drivers?${params}`;
      const data = await axios.get(url, config);
      dispatch(setListAllDriver(data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllDrivers();
  }, [filter]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý tài xế</Text>
      </View>
      <View style={styles.search_bar}>
        <TextInput value={filter.textSearch} onChangeText={handleChangeTextSearch} style={styles.search_input} placeholder='Nhập tên tài xế để tìm kiếm' />
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

      <Text style={styles.title_list}>DANH SÁCH TÀI XẾ</Text>

      <ScrollView style={styles.list_diver}>
        {
          listAllDriver.map((item, index) => {
            return (
              <ItemDriver item={item} key={item._id} onClicked={() => {
                dispatch(setIndexSelectedDriver(index));
                navigation.navigate('DetailReviewDriverScreen');
              }} />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReviewDriverScreen