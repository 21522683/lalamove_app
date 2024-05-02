import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style.js'
import { IMAGES } from '../../../assets/images/index.js'
import { FiChevronRight } from "react-icons/fi";
import { useNavigation } from '@react-navigation/native';

const PrivateAccountScreen = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Tài khoản cá nhân</Text>
      </View>

      <View style={styles.body_container}>

        <View style={styles.item_profile} onPress={() => {navigation.navigate('ProfileScreen')}}>
          <Image style={styles.avatar} source={IMAGES.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>Phan Trọng Tính</Text>
            <Text style={styles.email}>
              phantrongtinh150803@gmail.com
            </Text>
            <View style={styles.container_status}>
              <Text style={styles.status}>Trạng thái:</Text>
              <View style={styles.status_color} />
              <Text style={styles.status}>
                Đang hoạt động
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button_foward} onPress={() => {navigation.navigate('ProfileScreen')}}>
            <Image source={IMAGES.foward_icon} style={styles.icon_next} />
          </TouchableOpacity>
        </View>

        <View style={styles.container_selection}>

          <View style={styles.item_selection} onPress={() => {navigation.navigate('ProfileScreen')}}>
            <Image source={IMAGES.account_icon} style={styles.icon_selection} onPress={() => {navigation.navigate('ProfileScreen')}}/>
            <Text style={styles.title_selection}>Thông tin cá nhân</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => {navigation.navigate('ProfileScreen')}}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection} onPress={() => {navigation.navigate('PasswordManageScreen')}}>
            <Image source={IMAGES.key_security_icon} style={styles.icon_selection} onPress={() => {navigation.navigate('PasswordManageScreen')}}/>
            <Text style={styles.title_selection}>Quản lý mật khẩu</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => {navigation.navigate('PasswordManageScreen')}}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection} onPress={() => {navigation.navigate('AddressManageScreen')}}>
            <Image source={IMAGES.address_icon} style={styles.icon_selection} onPress={() => {navigation.navigate('AddressManageScreen')}}/>
            <Text style={styles.title_selection}>Địa chỉ đã lưu</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => {navigation.navigate('AddressManageScreen')}}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection} onPress={() => {navigation.navigate('PrivatePolicyScreen')}}>
            <Image source={IMAGES.policy_icon} style={styles.icon_selection} onPress={() => {navigation.navigate('PrivatePolicyScreen')}}/>
            <Text style={styles.title_selection}>Chính sách người dùng</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => {navigation.navigate('PrivatePolicyScreen')}}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection}>
            <Image source={IMAGES.logout} style={styles.icon_selection}/>
            <Text style={styles.title_selection}>Đăng xuất</Text>
            <TouchableOpacity style={styles.button_foward}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={styles.button_lock}>
          <Text style={styles.title_button}>
            Khóa tài khoản
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default PrivateAccountScreen;