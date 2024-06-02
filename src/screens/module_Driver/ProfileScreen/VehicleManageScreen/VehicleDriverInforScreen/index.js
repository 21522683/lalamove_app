import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import styles from './style'

const VehicleDriverInforScreen = ({route, navigation}) => {
  const item = route.params;
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Biển số phương tiện</Text>
          <Text style={styles.content_text}>{item?.lisencePlate}</Text>
        </View>

        <View style={styles.container_text}>
          <Text style={styles.title_text}>Tên phương tiện</Text>
          <Text style={styles.content_text}>{item?.vehicleName}</Text>
        </View>
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Loại phương tiện</Text>
          <Text style={styles.content_text}>{item?.vehicleType?.vehicleTypeName}</Text>
        </View>
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Số đăng ký phương tiện</Text>
          <Text style={styles.content_text}>{item?.cavetText}</Text>
        </View>
        <View style={styles.container_text}>
          <Text style={styles.title_text}>Trạng thái</Text>
          <Text style={{fontWeight:500, fontSize:15, color:item?.status==='Đã xác minh'?'green':'#222221' }}>{item?.status}</Text>
        </View>

        <View style={styles.container_img}>
          <Text style={styles.title_text}>Ảnh phương tiện</Text>
          <Image source={{uri:item?.vehicleImage}} style={styles.img} />
        </View>
        <View style={styles.container_img}>
          <Text style={styles.title_text}>Đăng ký xe</Text>
          <Image source={{uri:item?.cavetImage}} style={styles.img} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VehicleDriverInforScreen