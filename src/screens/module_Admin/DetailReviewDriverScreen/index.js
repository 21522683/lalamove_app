import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { IMAGES } from '../../../assets/images'
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import ItemVehicle from './ItemVehicle';
import ItemLisences from './ItemLisences';
import CUSTOM_COLOR from '../../../constants/colors';
import { scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import convertDate from '../../../constants/converDate';


const DetailReviewDriverScreen = () => {

  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Hồ sơ');

  const options = [
    { label: 'Hồ sơ', value: 'Hồ sơ' },
    { label: 'Giấy tờ xe', value: 'Giấy tờ xe' },
    { label: 'Phương tiện', value: 'Phương tiện' }
  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const [showDialog, setShowDialog] = useState(false);
  const [valueReject, setValueReject] = useState("");
  const handleSend = () => {

  }

  const handleClose = () => {
    setShowDialog(false)
  }

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.users.userAuth);
  const listAllDriver = useSelector(state => state.users.listAllDriver);
  const indexSelectedDriver = useSelector(state => state.users.indexSelectedDriver);
  const itemSelected = listAllDriver[indexSelectedDriver];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.goBack() }}>
          <Image source={IMAGES.arrow_back} style={styles.back_button} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Thông tin chi tiết tài xế</Text>
      </View>
      <View style={styles.tab_nav_container}>
        {
          options.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleSelect(item.value)} style={styles.btn_tab} activeOpacity={0.7}>
                <View style={selectedOption === item.value ? styles.item_tab_active : styles.item_tab}>
                  <Text style={selectedOption === item.value ? styles.text_tab_active : styles.text_tab}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

      {
        selectedOption === 'Hồ sơ' && (
          <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
            <View style={styles.container_avatar}>
              <Text style={styles.title_text}>Hình đại diện</Text>
              <Image source={{ uri: itemSelected.avatar }} style={styles.avatar} />
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Họ tên</Text>
              <Text style={styles.content_text}>{itemSelected.fullName}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>CMND / CCCD</Text>
              <Text style={styles.content_text}>{itemSelected.CCCDText}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Ngày sinh</Text>
              <Text style={styles.content_text}>{convertDate(itemSelected.dob)}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Địa chỉ</Text>
              <Text style={styles.content_text}>{itemSelected.address}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Số điện thoại</Text>
              <Text style={styles.content_text}>{itemSelected.phoneNumber}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Email</Text>
              <Text style={styles.content_text}>{itemSelected.email}</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Trạng thái</Text>
              {
                itemSelected.isActive === false && (
                  <Text style={styles.status_text_red}>Đang bị khóa</Text>
                )
              }
              {
                (itemSelected.isActive === true && itemSelected.isWaitingAccepted === true) && (
                  <Text style={styles.status_text_green}>Đang hoạt động</Text>
                )
              }
              {
                (itemSelected.isActive === true && itemSelected.isWaitingAccepted === false) && (
                  <Text style={styles.status_text}>Chờ xét duyệt</Text>
                )
              }
            </View>

            <View style={styles.container_img}>
              <Text style={styles.title_text}>Hình ảnh căn cước công dân</Text>
              <Image source={{ uri: itemSelected.CCCDImage }} style={styles.img} />
            </View>

            {
              (itemSelected.isActive === true && itemSelected.isWaitingAccepted === false) ? (
                <View style={styles.container_button}>
                  <TouchableOpacity style={styles.btn_accept}>
                    <Text style={styles.text_btn}>Duyệt</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
                    <Text style={styles.text_btn}>Từ chối</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.container_button}>
                  <TouchableOpacity style={styles.btn_accept}>
                    <Text style={styles.text_btn}>Khóa tài khoản</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            {
              showDialog && (
                <Dialog.Container visible={true}>
                  <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
                  <Dialog.Description>
                    Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
                  </Dialog.Description>
                  <Dialog.Input value={valueReject} onChangeText={(text) => setValueReject(text)} />
                  <Dialog.Button label="Đóng" onPress={handleClose} />
                  <Dialog.Button label="Gửi đi" onPress={handleSend} />
                </Dialog.Container>
              )
            }

          </ScrollView>
        )
      }

      {
        selectedOption === 'Giấy tờ xe' && (
          <>
            <View style={styles.search_bar}>
              <TextInput style={styles.search_input} placeholder='Nhập mã số để tìm kiếm' />
              <Image source={IMAGES.search_icon} style={styles.icon_search} />
            </View>
            <Text style={{ color: CUSTOM_COLOR.Primary, marginHorizontal: scale(20), marginVertical: verticalScale(10), fontWeight: 'bold' }}>DANH SÁCH GPLX</Text>
            <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
              {
                itemSelected.driverLisences.map((element, index) => {
                  return (
                    <ItemLisences key={element._id} index={index} item={element}/>
                  )
                })
              }

            </ScrollView>
          </>
        )
      }

      {
        selectedOption === 'Phương tiện' && (
          <>
            <View style={styles.search_bar}>
              <TextInput style={styles.search_input} placeholder='Nhập tên hoặc biển số xe để tìm kiếm' />
              <Image source={IMAGES.search_icon} style={styles.icon_search} />
            </View>
            <Text style={{ color: CUSTOM_COLOR.Primary, marginHorizontal: scale(20), marginVertical: verticalScale(10), fontWeight: 'bold' }}>DANH SÁCH PHƯƠNG TIỆN</Text>
            <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
              {
                itemSelected.vehicles.map((item, index) => {
                  return (
                    <ItemVehicle index={index} key={index} item={item}/>
                  )
                })
              }
            </ScrollView>
          </>

        )
      }

    </SafeAreaView>
  )
}

export default DetailReviewDriverScreen