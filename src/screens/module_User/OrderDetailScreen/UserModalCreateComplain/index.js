import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import {verticalScale} from 'react-native-size-matters';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import storage from '@react-native-firebase/storage';

import {
  getAllUserOrdersAction,
  setOrderDetail,
} from '../../../../redux/slices/orderSlice';
import baseUrl from '../../../../constants/baseUrl';
import {ActivityIndicator} from 'react-native-paper';

const UserModalCreateComplain = ({isVisibleModal, setVisibleModal, order}) => {
  const userAuth = useSelector(state => state.users.userAuth);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [complain, setComplain] = useState({
    title: '',
    content: '',
    image: '',
  });

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 500,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log(response.error);
        return;
      }

      setComplain(prev => ({...prev, image: response.assets[0].uri}));
    });
  };
  const handleRemoveImage = () => {
    setComplain(prev => ({...prev, image: ''}));
  };

  const handleClickSave = async () => {
    setLoading(true);
    let url;
    const uid = new Date().getTime();
    const reference = storage().ref(`/images/img_${uid}`);

    if (complain.image) {
      if (!complain.image.startsWith('http')) {
        await reference.putFile(complain.image);
        url = await reference.getDownloadURL();
        complain.image = url;
      }
    }

    complain.order = order._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/complain`, complain, config);

    dispatch(getAllUserOrdersAction());
    setLoading(false);
    dispatch(setOrderDetail({...order, isHasComplain: true}));
    setVisibleModal(false);
  };
  return (
    <Modal visible={isVisibleModal} animationType="slide" transparent={true}>
      <ScrollView>
        <View style={styles.modalOverlay}>
          <View style={{...styles.modalInner, gap: 18}}>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Icon2 name="file-invoice" size={20} color={'#EA7000'} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#606060',
                  flex: 1,
                }}>
                Đơn hàng #{order._id.substr(order._id.length - 12)}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Tài xế:
              </Text>
              <Text style={{...styles.title}}>{order.drive.fullName}</Text>
              {order.drive.avatar ? (
                <Image
                  source={{
                    uri: order.drive.avatar,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon4 name="user" size={20} />
                </View>
              )}
            </View>
            <View style={{flexDirection: 'column', gap: 8}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Tiêu đề:
              </Text>
              <TextInput
                value={complain.title}
                onChangeText={text =>
                  setComplain(prev => ({...prev, title: text}))
                }
                placeholder="Tìm kiếm"
                style={styles.input}></TextInput>
            </View>

            <View style={{gap: 8}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Nội dung:
              </Text>
              <TextInput
                value={complain.content}
                onChangeText={text =>
                  setComplain(prev => ({...prev, content: text}))
                }
                style={styles.inputArea}
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <View style={{gap: 8}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Hình ảnh:
              </Text>
              <View style={{flexDirection: 'row', gap: 12}}>
                {complain.image && (
                  <View style={{width: 80, height: 80, position: 'relative'}}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        borderRadius: 8,
                      }}
                      source={{uri: complain.image}}
                    />

                    <Pressable
                      style={{position: 'absolute', top: -5, right: -5}}
                      onPress={handleRemoveImage}>
                      <Icon name="closecircle" size={20} color="white" />
                    </Pressable>
                  </View>
                )}
              </View>
              {!complain.image && (
                <Pressable onPress={selectImage}>
                  <View
                    style={{
                      borderRadius: 4,
                      minWidth: 90,
                      height: 40,
                      marginTop: 16,
                      alignSelf: 'baseline',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F16722',
                    }}>
                    <Text style={{fontWeight: '500', color: 'white'}}>
                      Thêm ảnh
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#CCCCCC',
                marginVertical: verticalScale(12),
              }}></View>

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                justifyContent: 'flex-end',
                marginTop: verticalScale(12),
              }}>
              <Pressable onPress={handleClickSave}>
                <View
                  style={{
                    borderRadius: 4,
                    minWidth: 90,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F16722',
                  }}>
                  {isLoading && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator size="small" color="white" />
                    </View>
                  )}
                  {!isLoading && (
                    <Text style={{fontWeight: '500', color: 'white'}}>Gửi</Text>
                  )}
                </View>
              </Pressable>

              <TouchableOpacity
                activeOpacity={1}
                delayPressIn={0}
                onPress={() => setVisibleModal(false)}>
                <View
                  style={{
                    borderRadius: 4,
                    minWidth: 90,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#F16722',
                  }}>
                  <Text style={{fontWeight: '500', color: '#F16722'}}>
                    Đóng
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default UserModalCreateComplain;
