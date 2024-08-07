import { View, Text, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import LoginGoogleBtn from '../../../components/LoginGgBtn.js';
import axios from 'axios';
import baseUrl from '../../../constants/baseUrl.js';
import { validatePhone } from '../../../constants/validate.js';

const RegisterDriverScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ phoneNumber: '', city: 'Thành phố Hồ Chí Minh' });
  const [errors, setErrors] = useState({});
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.phoneNumber) {
      handleError('Làm ơn nhập số điện thoại', 'phoneNumber');
      isValid = false;
    }
    else if (!validatePhone(inputs.phoneNumber)) {
      handleError('Số điện thoại không đúng định dạng', 'phoneNumber');
      isValid = false;
    }
    if (isValid) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.get(`${baseUrl}/auth/check-phone-driver?phoneNumber=${inputs.phoneNumber}`, config)
        .then((res) => {
          if (res.data.message === "Ok") {
            navigation.navigate('Step1', {
              phoneNumber: inputs.phoneNumber
            })
          }
        }).catch(err => {
          alert(err.response.data.response.message)
        });
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Text style={styles.titleText}>Trở thành đối tác của chúng tôi</Text>
        <View showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20, width: '100%' }}>
            <Input
              onChangeText={text => handleOnchange(text, 'phoneNumber')}
              onFocus={() => handleError(null, 'phoneNumber')}
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              error={errors.phoneNumber}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'city')}
              onFocus={() => handleError(null, 'city')}
              label="Thành phố"
              placeholder="Thành phố Hồ Chí Minh"
              error={errors.city}
              enalble={true}
              c={'#ccc'}
            />
          </View>

          <MyButton text={'Đăng ký'} onPress={validate} />

          <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
            <Text onPress={() => { navigation.navigate('LoginScreen') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Đã có tài khoản?</Text>
          </View>
        </View>

      </KeyboardAvoidingView>



    </View>
  );
};

export default RegisterDriverScreen;