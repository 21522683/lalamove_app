import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './style'

const LicenseDriverInforScreen = ({ route, navigation }) => {
  const params = route.params;
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.scroll_body} >
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Số giấy phép lái xe</Text>
          <Text style={styles.content_text}>{params?.driverLisenceNumber}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Bằng loại</Text>
          <Text style={styles.content_text}>{params?.driverLisenceType}</Text>
        </View>
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Trạng thái</Text>
          <Text style={{ fontWeight: 500, fontSize: 15, color: params?.status === 'Đã xác minh' ? 'green' : '#222221' }}>{params?.status}</Text>
        </View>

        <View style={styles.container_img}>
          <Text style={styles.title_text}>Hình ảnh GPLX</Text>
          <Image source={{ uri: params?.driverLisenceImage }} style={styles.img} />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default LicenseDriverInforScreen