import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import Dialog from "react-native-dialog";
import { IMAGES } from '../../../../assets/images';

const DriverInformationScreen = () => {
  
  const [showDialog, setShowDialog] = useState(false);

  const handleSend = () => {

  }

  const handl4Close = () => {
    setShowDialog(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      
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
          <Text style={styles.status_text}>Đang hoạt động</Text>
        </View>
        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh CCCD</Text>
          <Image source={IMAGES.gplx} style={styles.img} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DriverInformationScreen