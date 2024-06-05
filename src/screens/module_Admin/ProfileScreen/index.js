import { View, Text, TouchableOpacity, Image, SafeAreaView, } from 'react-native';
import React, { useState } from 'react';
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../../redux/slices/usersSlices.js';

const ProfileAdminScreen = ({ navigation }) => {
  const userAuth = useSelector(state=> state?.users?.userAuth)
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Image style={styles.avatar} source={{uri: userAuth?.avatar}} />

        <Text style={styles.title}>{userAuth?.fullname}</Text>
        <Text style={{ marginBottom: 10 }}>Tp. Hồ Chí Minh</Text>
       
      </View>

      <View style={styles.body_container}>

        <View style={styles.container_selection}>
          <TouchableOpacity style={styles.item_selection} onPress={() => { navigation.navigate('VoucherManageScreen')}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={IMAGES.account_icon} style={styles.icon_selection} />
              <Text style={styles.title_selection}>Quản lý vouchers</Text>
            </View>

            <View style={styles.button_foward} >
              <Image source={IMAGES.foward_icon_orage} style={styles.icon_next} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{...styles.item_selection, paddingVertical:18}} onPress={()=>{dispatch(logoutUserAction())}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={IMAGES.policy_icon} style={styles.icon_selection} />
              <Text style={styles.title_selection}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
};

export default ProfileAdminScreen;
