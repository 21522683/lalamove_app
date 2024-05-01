import { SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native'
import React from 'react'
import styles from './style'
import ItemLicenseDriver from './ItemLicenseDriver'
import CUSTOM_COLOR from '../../../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../../assets/images'

const LisenceDriverManageScreen = ({ navigation }) => {
  const listLicenseDriver = [
    {
      id: 1,
      license_number: '23453SSS',
      type: 'Bằng A1',
      status: 'Đã xác minh',
      img: 'https://giaypheplaixe.edu.vn/wp-content/uploads/2019/02/giay-phep-lai-xe-a1.jpg'
    },
    {
      id: 2,
      license_number: 'SG3425',
      type: 'Bằng B2',
      status: 'Không hợp lệ',
      img: 'https://giaypheplaixe.edu.vn/wp-content/uploads/2019/02/giay-phep-lai-xe-a1.jpg'

    },
    {
      id: 3,
      license_number: 'HFK43435',
      type: 'Bằng B1',
      status: 'Đang kiểm tra',
      img: 'https://giaypheplaixe.edu.vn/wp-content/uploads/2019/02/giay-phep-lai-xe-a1.jpg'

    }
  ];
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.list_diver}>
        {
          listLicenseDriver.map((item, index) => {
            return (
              <ItemLicenseDriver key={item.id} item={item} navigation={navigation} />
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
          navigation.navigate('license-driver-form', {
            name: 'Thêm bằng lái xe',
            type: 'add'
          })
        }}
      >
        <Ionicons name='plus' size={30} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default LisenceDriverManageScreen