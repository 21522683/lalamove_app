import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import Dialog from "react-native-dialog";
import { IMAGES } from '../../../../assets/images';
import { ioDateToUI } from '../../../../constants/formatDate';

const DriverInformationScreen = ({route}) => {
  const driverInfor = route?.params
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
          <Image src={driverInfor?.avatar} style={styles.avatar} />
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Họ tên</Text>
          <Text style={styles.content_text}>{driverInfor?.fullName}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>CMND / CCCD</Text>
          <Text style={styles.content_text}>{driverInfor?.CCCDText}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Ngày sinh</Text>
          <Text style={styles.content_text}>{ioDateToUI(driverInfor?.dob)}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Địa chỉ</Text>
          <Text style={styles.content_text}>{driverInfor?.address}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Số điện thoại</Text>
          <Text style={styles.content_text}>{driverInfor?.phoneNumber}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Email</Text>
          <Text style={styles.content_text}>{driverInfor?.email}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Trạng thái</Text>
          <Text style={styles.status_text}>{driverInfor?.isActive? 'Đang hoạt động':'Ngưng hoạt động'}</Text>
        </View>
        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh CCCD</Text>
          <Image src={driverInfor?.CCCDImage} style={styles.img} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DriverInformationScreen