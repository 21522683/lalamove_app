import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date);
  const [showPicker, setShowPicker] = useState(false);
  const [birthday, setBirthday] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }
  const formatDateString = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setBirthday(formatDateString(currentDate));
      }
    }
    else {
      toggleDatePicker();
    }
  }


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
            <Image source={IMAGES.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.button_change}>
              <Text style={styles.text_change}>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Họ tên</Text>
            <TextInput style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            <Text style={styles.text_validation}>Vui lòng nhập họ tên đầy đủ</Text>
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Địa chỉ email</Text>
            <TextInput style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            <Text style={styles.text_validation}>Vui lòng nhập họ tên đầy đủ</Text>
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Số điện thoại</Text>
            <TextInput style={styles.input_field} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            <Text style={styles.text_validation}>Vui lòng nhập họ tên đầy đủ</Text>
          </View>

          <View style={styles.container_input}>
            <Text style={styles.title_input}>Ngày sinh</Text>
            {showPicker && <DateTimePicker mode="date" value={date} display="spinner" onChange={onChange} />}
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput value={birthday} style={styles.input_field} editable={false} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
            </TouchableOpacity>
            <Text style={styles.text_validation}>Vui lòng nhập họ tên đầy đủ</Text>
          </View>

          <TouchableOpacity style={styles.button_update}>
            <Text style={styles.title_button}>
              Cập nhật
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
