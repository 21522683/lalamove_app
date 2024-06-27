import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';
import {LocationContext} from '../../../../../TrackLocation';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

const VerifyOrderDriverScreen = ({navigation, route}) => {
  var order = {...route.params};
  const nav = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const userAuth = useSelector(state => state.users.userAuth);
  const {setIsToSource, setIsStart} = useContext(LocationContext);
  const handleCameraLaunch = () => {
    requestCameraPermission();
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        const options = {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 300,
          maxWidth: 500,
        };

        launchImageLibrary(options, handleResponse);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      console.log(response);
      let imageUri = response?.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  const submitOrder = async () => {
    try {
      if (!selectedImage) {
        Alert.alert('Thông báo', 'Vui lòng chọn hình ảnh');
        return;
      }

      const uid = new Date().getTime();
      const reference = storage().ref(`/images/img_${uid}`);

      await reference.putFile(selectedImage);
      let url = await reference.getDownloadURL();

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.put(
        `${baseUrl}/order/${userAuth.id}/driver-finish-order/${order._id}`,
        {imgUri: url},
        config,
      );

      setIsToSource(true);
      setIsStart(false);

      nav.navigate('application-driver');

      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.text_receiver_time}>Xác nhận đơn hàng</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back"
            size={24}
            color="#575757"
            style={styles.arrow_back_icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={submitOrder}>
          <Icon
            name="checkmark-sharp"
            size={24}
            color="#575757"
            style={styles.submit_icon}
          />
        </TouchableOpacity>
        {selectedImage && (
          <Image
            source={{uri: selectedImage}}
            style={{width: '100%', height: '80%'}}
            resizeMode="contain"
          />
        )}
        <TouchableOpacity onPress={handleCameraLaunch}>
          <View
            style={{
              marginTop: 10,
              backgroundColor: '#FEF7EC',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#F2AB58',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Icon2 name="camera" size={40} color="#F2AB58" />
            <Text style={{color: '#F2AB58'}}>Chọn ảnh</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOrderDriverScreen;
