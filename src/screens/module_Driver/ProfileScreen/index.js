import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style.js';
import {IMAGES} from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllVehicleTypeAction,
  getDriverInforAction,
  logoutUserAction,
} from '../../../redux/slices/usersSlices.js';

const ProfileDriverScreen = ({navigation}) => {
  const userInfor = useSelector(state => state?.users?.userInfor);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVehicleTypeAction());
    dispatch(getDriverInforAction(''));
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={userInfor?._doc?.avatar} />

        <Text style={styles.title}>{userInfor?._doc?.fullName}</Text>
        <Text style={{marginBottom: 10}}>Tp. Hồ Chí Minh</Text>
        <Rating
          ratingColor={CUSTOM_COLOR.Primary}
          type="custom"
          ratingCount={5}
          startingValue={userInfor?.stb}
          imageSize={18}
          readonly
          // startingValue={3}
          // onFinishRating={4}
          // jumpValue={5}
        />
      </View>

      <View style={styles.body_container}>
        <View style={styles.item_profile}>
          <View style={{...styles.info, marginRight: 20}}>
            <Text style={styles.num}>{userInfor?.rvCount}</Text>
            <Text style={styles.email}> Đánh giá</Text>
          </View>

          <View style={{height: '100%', width: 0.5, backgroundColor: '#ccc'}} />

          <View style={{...styles.info, marginLeft: 20}}>
            <Text style={styles.num}>{userInfor?.stb ?? 0}</Text>
            <Text style={styles.email}> Sao trung bình</Text>
          </View>
        </View>

        <View style={styles.container_selection}>
          <View style={styles.item_selection}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.account_icon}
                style={styles.icon_selection}
              />
              <Text style={styles.title_selection}>Quản lý phương tiện</Text>
            </View>

            <TouchableOpacity
              style={styles.button_foward}
              onPress={() => {
                navigation.navigate('vehicle-driver');
              }}>
              <Image
                source={IMAGES.foward_icon_orage}
                style={styles.icon_next}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.key_security_icon}
                style={styles.icon_selection}
              />
              <Text style={styles.title_selection}>
                Quản lý thông tin tài xế
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button_foward}
              onPress={() => {
                navigation.navigate('infor-driver', {...userInfor?._doc});
              }}>
              <Image
                source={IMAGES.foward_icon_orage}
                style={styles.icon_next}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.address_icon}
                style={styles.icon_selection}
              />
              <Text style={styles.title_selection}>
                Quản lý bằng lái tài xế
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button_foward}
              onPress={() => {
                navigation.navigate('license-driver');
              }}>
              <Image
                source={IMAGES.foward_icon_orage}
                style={styles.icon_next}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.item_selection}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.policy_icon}
                style={styles.icon_selection}
              />
              <Text style={styles.title_selection}>Chính sách người dùng</Text>
            </View>
            <TouchableOpacity
              style={styles.button_foward}
              onPress={() => {
                navigation.navigate('policy');
              }}>
              <Image
                source={IMAGES.foward_icon_orage}
                style={styles.icon_next}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{...styles.item_selection, paddingVertical: 18}}
            onPress={() => {
              dispatch(logoutUserAction());
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.policy_icon}
                style={styles.icon_selection}
              />
              <Text style={styles.title_selection}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDriverScreen;
