import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAction, updateInfoUserAction, clearSuccessMessage } from '../../../redux/slices/usersSlices.js';
import storage from '@react-native-firebase/storage';
import { ActivityIndicator } from 'react-native-paper';



const ProfileScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);
  const loading = useSelector(state => state.users.loading);
  const successMessage = useSelector(state => state.users.successMessage);

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, []);
  useEffect(() => {
    if (successMessage) {
      Alert.alert('Thông báo', successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const formatDateString = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const initialDate = currentUser.dob ? new Date(currentUser.dob) : new Date();
  const [date, setDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);
  const [birthday, setBirthday] = useState(formatDateString(new Date(currentUser.dob)) || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [name, setName] = useState(currentUser.fullName || '');
  const [phone, setPhone] = useState(currentUser.phoneNumber || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [textValidateName, setTextValidateName] = useState('');
  const validateName = (value) => {
    if (!value || value.trim().length === 0) {
      setTextValidateName('Vui lòng nhập họ tên');
      return false;
    }
    setTextValidateName('');
    return true;
  }
  const handleChangeName = (value) => {
    setName(value);
    validateName(value);
  }

  const [textValidateEmail, setTextValidateEmail] = useState('');
  const validateEmail = (value) => {
    if (!value || value.trim().length === 0) {
      setTextValidateEmail('Vui lòng nhập email');
      return false;
    }
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setTextValidateEmail('Vui lòng nhập đúng định dạng email');
        return false;
      }
    }
    setTextValidateEmail('');
    return true;
  }
  const handleChangeEmail = (value) => {
    setEmail(value);
    validateEmail(value);
  }

  const [textValidatePhone, setTextValidatePhone] = useState('');
  const validatePhone = (value) => {
    if (!value || value.toString().trim().length === 0) {
      setTextValidatePhone('Vui lòng nhập số điện thoại');
      return false;
    }
    else {
      const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (!phoneRegex.test(value)) {
        setTextValidatePhone('Vui lòng nhập đúng định dạng số điện thoại');
        return false;
      }
    }
    setTextValidatePhone('');
    return true;
  }
  const handleChangePhone = (value) => {
    setPhone(value);
    validatePhone(value);
  }

  const [textValidateBirthday, setTextValidateBirthday] = useState('');
  const validateBirthday = (value) => {
    if (!value || value.toString().trim().length === 0) {
      setTextValidateBirthday('Vui lòng nhập ngày sinh');
      return false;
    }
    setTextValidateBirthday('');
    return true;
  }
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setBirthday(formatDateString(currentDate));
      }
    } else {
      toggleDatePicker();
    }
    validateBirthday(selectedDate);
  }

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setAvatar(source.uri);
      }
    });
  }
  const uploadImg = async (uri) => {
    if (!uri) {
      console.log('No image selected');
      return false;
    }

    const uid = Date.now();
    const filename = `img_${uid}`;

    // Convert URI to the correct format based on the platform
    const path = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const reference = storage().ref(`images/${filename}`);

    try {
      // Upload file to Firebase Storage
      await reference.putFile(path);

      // Get the download URL
      const url = await reference.getDownloadURL();
      setAvatar(url);
      console.log('Image uploaded successfully:', url);
      return url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return avatar;
    }
  }

  const handleUpdate = async () => {
    const isValid = validateName(name) && validateEmail(email) && validatePhone(phone) && validateBirthday(birthday);
    if (isValid) {
      const url = await uploadImg(avatar);
      const dataUpdate = {
        id: currentUser._id,
        info: {
          fullName: name,
          phoneNumber: phone,
          email: email,
          dob: date.toISOString(),
          avatar: url,
        }
      }
      dispatch(updateInfoUserAction(dataUpdate));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image source={IMAGES.back_icon} style={styles.back_button} />
          </TouchableOpacity>
          <Text style={styles.title_header}>Thông tin cá nhân</Text>
        </View>

        <ScrollView style={styles.container_body}>
          <View style={styles.container_avatar}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.button_change} onPress={selectImage}>
              <Text style={styles.text_change}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Họ tên</Text>
            <TextInput value={name} onChangeText={handleChangeName} style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            {
              textValidateName && <Text style={styles.text_validation}>{textValidateName}</Text>
            }
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Địa chỉ email</Text>
            <TextInput value={email} onChangeText={handleChangeEmail} style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            {
              textValidateEmail && <Text style={styles.text_validation}>{textValidateEmail}</Text>
            }
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Số điện thoại</Text>
            <TextInput keyboardType='numeric' value={phone} onChangeText={handleChangePhone} style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            {
              textValidatePhone && <Text style={styles.text_validation}>{textValidatePhone}</Text>
            }
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Ngày sinh</Text>
            {showPicker && <DateTimePicker mode="date" value={date} display="spinner" onChange={onChange} />}
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput value={birthday} style={styles.input_field} editable={false} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            </TouchableOpacity>
            {
              textValidateBirthday && <Text style={styles.text_validation}>{textValidateBirthday}</Text>
            }
          </View>
          {
            loading ? (
              <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color="#FF5900" />
              </View>
            ) : (
              <TouchableOpacity style={styles.button_update} onPress={handleUpdate} disabled={loading}>
                <Text style={styles.title_button}>Cập nhật</Text>
              </TouchableOpacity>
            )
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
