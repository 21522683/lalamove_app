import { View, Text, Keyboard, TouchableOpacity, Image } from 'react-native';
import styles from './style.js';
import MyButton from '../../../components/MyButton.js';
import React, { useState } from 'react';
import { IMAGES } from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
const ChoosingTypeAccountScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('')


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chọn loại tài khoản bạn muốn</Text>

      <Text style={{ ...styles.subText, marginBottom: '20%', marginTop: 5, fontSize: 18 }}>Nhu cầu của bạn là gì</Text>

      <TouchableOpacity
        style={{ ...styles.btnTypeAccount, borderColor: userType === 'User' ? CUSTOM_COLOR.Primary : '#C3C7E5' }}
        onPress={() => { setUserType('User') }}>
        <View style={{ flexDirection: 'row', flex: 1, height: 150, padding: 20, }}>
          <View style={{ flex: 1, width: '100%', }}>
            <Image source={IMAGES.userAcc} style={styles.icon} />
          </View>
          <View style={{ flex: 2, height: '100%', justifyContent: 'center' }}>
            <Text style={{ ...styles.btnTAText, fontSize: 18, fontWeight: '700', marginBottom: 5 }}>User</Text>
            <Text style={{ ...styles.btnTAText, color: '#8D929C' }}>Dành cho khách hàng với nhu cầu giao hàng cơ bản.</Text>

          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btnTypeAccount, borderColor: userType === 'Driver' ? CUSTOM_COLOR.Primary : '#C3C7E5' }}
        onPress={() => { setUserType('Driver') }}>
        <View style={{ flexDirection: 'row', flex: 1, height: 150, padding: 20, }}>
          <View style={{ flex: 1, width: '100%', }}>
            <Image source={IMAGES.driverAcc} style={styles.icon} />
          </View>
          <View style={{ flex: 2, height: '100%', justifyContent: 'center' }}>
            <Text style={{ ...styles.btnTAText, fontSize: 18, fontWeight: '700', marginBottom: 5 }}>Driver</Text>
            <Text style={{ ...styles.btnTAText, color: '#8D929C' }}>Dành cho đối tác muốn tăng thêm thu nhập nhờ vào việc giao hàng.</Text>
          </View>
        </View>
      </TouchableOpacity>


      <View style={{ width: '100%', marginTop: 20 }}>
        <MyButton text={'Tiếp tục'} onPress={() => {
          if (userType === 'User') {
            navigation.navigate('RegisterUser')
          }
          if (userType === 'Driver') {
            navigation.navigate('RegisterDriver')
          }
        }} />

      </View>

      <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
        <Text onPress={() => { }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Đã có tài khoản?</Text>
      </View>

    </View>
  );
};

export default ChoosingTypeAccountScreen;