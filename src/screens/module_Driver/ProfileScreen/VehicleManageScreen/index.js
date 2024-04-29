import { SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native'
import React from 'react'
import styles from './style'
import ItemVehicleDriver from './ItemVehicleDriver'
import CUSTOM_COLOR from '../../../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

const VehicleManageScreen = ({ navigation }) => {
  const listVehicleDriver = [
    {
      id: 1,
      vehicleName: 'Xe wave alpha đen',
      lisencePlate:'79X5-43459',
      vehicleType: 'Xe máy',
      status: 'Đang kiểm tra',
      cavetImage:'https://s1storage.2banh.vn/image/2013/08/20130829_e6eeb6e977debdbe1cca00def7a5f7ae_1377751372.jpg',
      cavetText:'2356713',
      vehicleImage: 'https://vtv1.mediacdn.vn/zoom/640_400/562122370168008704/2023/7/14/photo1689324548335-1689324548671226776715.jpg'
    },
    {
      id: 2,
      vehicleName: 'Xe tải Toyota xanh đen',
      lisencePlate:'65X3-05963',
      vehicleType: 'Van 7 ft',
      status: 'Đã xác minh',
      cavetImage:'https://s1storage.2banh.vn/image/2013/08/20130829_e6eeb6e977debdbe1cca00def7a5f7ae_1377751372.jpg',
      cavetText:'465834',
      vehicleImage: 'https://static-images.vnncdn.net/files/publish/2023/8/11/w-364665911-822103792825238-1867071541970711657-n-1-1-1-112.jpg'

    },
    {
      id: 3,
      vehicleName: 'Xe vision 2020',
      lisencePlate:'94X4-43563',
      vehicleType: 'Xe máy',
      status: 'Không hợp lệ',
      cavetImage:'https://s1storage.2banh.vn/image/2013/08/20130829_e6eeb6e977debdbe1cca00def7a5f7ae_1377751372.jpg',
      cavetText:'aefer333',
      vehicleImage: 'https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2023/8/9/365317653309250408343381782731163165713868n-1691564445605723478553.jpg'

    }
  ];
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.list_diver}>
        {
          listVehicleDriver.map((item, index) => {
            return (
              <ItemVehicleDriver key={item.id} item={item} navigation={navigation} />
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
          navigation.navigate('vehicle-driver-form', {
            name: 'Thêm phương tiện',
            type: 'add'
          })
        }}
      >
        <Ionicons name='plus' size={30} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default VehicleManageScreen