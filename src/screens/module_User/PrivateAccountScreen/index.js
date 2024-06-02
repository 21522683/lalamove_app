import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import { IMAGES } from '../../../assets/images/index.js'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction, getCurrentUserAction } from '../../../redux/slices/usersSlices.js';

const PrivateAccountScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tài khoản cá nhân</Text>
      </View>

      <View style={styles.body_container}>

        <TouchableOpacity style={styles.item_profile} onPress={() => { navigation.navigate('ProfileScreen') }}>
          <Image style={styles.avatar} source={{ uri: currentUser.avatar }} />
          <View style={styles.info}>
            <Text style={styles.name}>{currentUser.fullName}</Text>
            <Text style={styles.email}>
              {currentUser.email}
            </Text>
            {
              currentUser.isActive ? (
                <View style={styles.container_status}>
                  <Text style={styles.status}>Trạng thái:</Text>
                  <View style={styles.status_color} />
                  <Text style={styles.status}>
                    Đang hoạt động
                  </Text>
                </View>
              ) : (
                <View style={styles.container_status}>
                  <Text style={styles.status}>Trạng thái:</Text>
                  <View style={styles.status_color_red} />
                  <Text style={styles.status}>
                    Đang bị khóa
                  </Text>
                </View>
              )
            }

          </View>

          <TouchableOpacity style={styles.button_foward} onPress={() => { navigation.navigate('ProfileScreen') }}>
            <Image source={IMAGES.foward_icon} style={styles.icon_next} />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.container_selection}>

          <TouchableOpacity style={styles.item_selection} onPress={() => { navigation.navigate('ProfileScreen') }}>
            <Image source={IMAGES.account_icon} style={styles.icon_selection} onPress={() => { navigation.navigate('ProfileScreen') }} />
            <Text style={styles.title_selection}>Thông tin cá nhân</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => { navigation.navigate('ProfileScreen') }}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item_selection} onPress={() => { navigation.navigate('PasswordManageScreen') }}>
            <Image source={IMAGES.key_security_icon} style={styles.icon_selection} onPress={() => { navigation.navigate('PasswordManageScreen') }} />
            <Text style={styles.title_selection}>Quản lý mật khẩu</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => { navigation.navigate('PasswordManageScreen') }}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item_selection} onPress={() => { navigation.navigate('AddressManageScreen') }}>
            <Image source={IMAGES.address_icon} style={styles.icon_selection} onPress={() => { navigation.navigate('AddressManageScreen') }} />
            <Text style={styles.title_selection}>Địa chỉ đã lưu</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => { navigation.navigate('AddressManageScreen') }}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item_selection} onPress={() => { navigation.navigate('PrivatePolicyScreen') }}>
            <Image source={IMAGES.policy_icon} style={styles.icon_selection} onPress={() => { navigation.navigate('PrivatePolicyScreen') }} />
            <Text style={styles.title_selection}>Chính sách người dùng</Text>
            <TouchableOpacity style={styles.button_foward} onPress={() => { navigation.navigate('PrivatePolicyScreen') }}>
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button_lock} onPress={() => { dispatch(logoutUserAction()) }}>
          <Text style={styles.title_button}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default PrivateAccountScreen;