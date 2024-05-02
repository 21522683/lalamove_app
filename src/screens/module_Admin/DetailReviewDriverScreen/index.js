import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { IMAGES } from '../../../assets/images'
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';


const DetailReviewDriverScreen = () => {

  const navigation = useNavigation();
  const [showDialog, setShowDialog] = useState(false);
  const [valueReject, setValueReject] = useState("");

  const handleSend = () => {

  }

  const handleClose = () => {
    setShowDialog(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={IMAGES.arrow_back} style={styles.back_button} onPress={() => {
          navigation.goBack()
        }}/>
        <Text style={styles.title_header}>Thông tin đăng ký tài xế</Text>
      </View>
      <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
        <View style={styles.container_avatar}>
          <Text style={styles.title_text}>Hình đại diện</Text>
          <Image source={IMAGES.avatar} style={styles.avatar} />
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Họ tên</Text>
          <Text style={styles.content_text}>Phan Trọng Tính</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>CMND / CCCD</Text>
          <Text style={styles.content_text}>096203012684</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Ngày sinh</Text>
          <Text style={styles.content_text}>15/08/2003</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Địa chỉ</Text>
          <Text style={styles.content_text}>Tp.Hồ Chí Minh</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Số điện thoại</Text>
          <Text style={styles.content_text}>0379361210</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Email</Text>
          <Text style={styles.content_text}>phantrongtinh1508@gmail.com</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Trạng thái</Text>
          <Text style={styles.status_text}>Chưa xét duyệt</Text>
        </View>

        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh căn cước công dân</Text>
          <Image source={IMAGES.cccd} style={styles.img} />
        </View>

        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh GPLX</Text>
          <Image source={IMAGES.gplx} style={styles.img} />
        </View>

        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh cà vẹt xe</Text>
          <Image source={IMAGES.cavet} style={styles.img} />
        </View>

        <View style={styles.container_button}>
          <TouchableOpacity style={styles.btn_accept}>
            <Text style={styles.text_btn}>Duyệt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
            <Text style={styles.text_btn}>Từ chối</Text>
          </TouchableOpacity>
        </View>

        {
          showDialog && (
            <Dialog.Container visible={true}>
              <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
              <Dialog.Description>
                Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
              </Dialog.Description>
              <Dialog.Input />
              <Dialog.Button label="Đóng" onPress={handleClose} />
              <Dialog.Button label="Gửi đi" onPress={handleSend} />
            </Dialog.Container>
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailReviewDriverScreen