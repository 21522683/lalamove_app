import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import LoginGoogleBtn from '../../../components/LoginGgBtn.js';
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../../redux/slices/usersSlices.js';
const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ phoneNumber: '', password: '', userType: 'User' });
  const [errors, setErrors] = useState({});
  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'User',
      value: 'User'
    },
    {
      id: '2',
      label: 'Driver',
      value: 'Driver'
    },
    {
      id: '3',
      label: 'Admin',
      value: 'Admin'
    }
  ]), []);

  const [selectedId, setSelectedId] = useState('1');
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const dispatch = useDispatch();
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.phoneNumber) {
      handleError('Hãy nhập đủ thông tin trường này', 'phoneNumber');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Hãy nhập đủ thông tin trường này', 'password');
      isValid = false;
    }
    if (isValid) {
      const pl = {
        phoneNumber: inputs.phoneNumber,
        password: inputs.password,
        userType: selectedId === '1' ? 'User' : selectedId === '2' ? 'Driver' : 'Admin'
      }
      dispatch(loginUserAction(pl));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chào mừng bạn trở lại</Text>
      <View style={{ marginTop: 20, width: '100%', height: '33%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'phoneNumber')}
          onFocus={() => handleError(null, 'phoneNumber')}
          label="Username"
          placeholder="Nhập username"
          error={errors.phoneNumber}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          error={errors.password}
          password
        />
      </View>
      <Text style={{ ...styles.subText, marginBottom: 10, marginTop: 5 }}>Bạn là ai?</Text>
      <RadioGroup
        layout='row'
        containerStyle={{ marginBottom: 15 }}
        radioButtons={radioButtons}
        labelStyle={{ marginRight: 30 }}
        onPress={(id) => {
          console.log(id)
          setSelectedId(id)

        }}
        selectedId={selectedId}
      />
      <MyButton text={'Đăng nhập'} onPress={validate} />
      <View style={{ alignSelf: 'center', width: '100%' }}>
        <Text style={{ ...styles.subText }}>Hoặc tiếp tục với</Text>
        <LoginGoogleBtn text={'Đăng nhập bằng Google'} onPress={() => { }} />
      </View>

      <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
        <Text onPress={() => { navigation.navigate('ForgotPassword') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Quên mật khẩu?</Text>
        <Text onPress={() => { navigation.navigate('ChoosingTypeAccount') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Tạo tài khoản mới</Text>
      </View>

    </View>
  );
};

export default LoginScreen;