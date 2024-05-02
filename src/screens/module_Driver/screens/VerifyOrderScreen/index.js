import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {launchCamera as _launchCamera} from 'react-native-image-picker';
let launchCamera = _launchCamera;
import {IMAGES} from '../../../../assets/images';

const VerifyOrderDriverScreen = ({navigation, props}) => {
  const [selectedImage, setSelectedImage] = useState(null);
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
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };

        launchCamera(options, handleResponse);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleResponse = response => {
    console.log(response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      console.log('dô');
      console.log(imageUri);
      setSelectedImage(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.text_receiver_time}>Xác nhận đơn hàng</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#575757"
            style={styles.arrow_back_icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Text style={{color: '#F2AB58'}}>Chụp ảnh</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOrderDriverScreen;
