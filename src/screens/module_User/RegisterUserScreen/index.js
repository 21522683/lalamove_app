import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import LoginGoogleBtn from '../../../components/LoginGgBtn.js';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../../redux/slices/usersSlices.js';
import Dialog from "react-native-dialog";

const RegisterUserScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: '', phoneNumber: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const handleLogin = () => {
    setShowDialog(false)
    navigation.navigate('Login')
  }
  const dispatch = useDispatch();
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.phoneNumber) {
      handleError('Please input phoneNumber', 'phoneNumber');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      const bd = {
        phoneNumber: inputs.phoneNumber,
        email: inputs.email,
        password: inputs.password,
        userType: 'User'
      }

      dispatch(registerUserAction({
        bd: bd,
        setShowDialog: setShowDialog
      }));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Tạo tài khoản người dùng mới</Text>
      <View style={{ marginTop: 20, width: '100%', height: '52%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          label="Email"
          placeholder="Nhập email"
          error={errors.email}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'phoneNumber')}
          onFocus={() => handleError(null, 'phoneNumber')}
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
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

      <MyButton text={'Đăng ký'} onPress={validate} />
      <View style={{ alignSelf: 'center', width: '100%' }}>
        <Text style={{ ...styles.subText }}>Hoặc tiếp tục với</Text>
        <LoginGoogleBtn text={'Đăng ký bằng Google'} onPress={() => { }} />
      </View>

      <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
        <Text onPress={() => { }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Đã có tài khoản?</Text>
      </View>
      {
        showDialog && (
          <Dialog.Container visible={true}>
            <Dialog.Title>Đăng ký tài khoản thành công</Dialog.Title>
            <Dialog.Description>
              Vui lòng đăng nhập lại để dùng chức năng của app
            </Dialog.Description>

            <Dialog.Button label="Đăng nhập" onPress={handleLogin} />
          </Dialog.Container>
        )
      }

    </View>
  );
};

export default RegisterUserScreen;