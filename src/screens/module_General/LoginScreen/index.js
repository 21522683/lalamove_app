import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import LoginGoogleBtn from '../../../components/LoginGgBtn.js';
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
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

const [selectedId, setSelectedId] = useState();
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
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      navigation.navigate('Profile')
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chào mừng bạn trở lại</Text>
      <View style={{ marginTop: 20, width: '100%', height:'33%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          label="Email"
          placeholder="Nhập email"
          error={errors.email}
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
      <Text style={{...styles.subText,  marginBottom:10, marginTop:5}}>Bạn là ai?</Text>
      <RadioGroup 
            layout='row'
            containerStyle={{marginBottom:15}}
            radioButtons={radioButtons} 
            labelStyle={{marginRight:30}}
            onPress={setSelectedId}
            selectedId={selectedId}
        />
      <MyButton text={'Đăng nhập'} onPress={validate} />
      <View style={{ alignSelf: 'center', width: '100%' }}>
        <Text style={{...styles.subText}}>Hoặc tiếp tục với</Text>
        <LoginGoogleBtn text={'Đăng nhập bằng Google'} onPress={() => { }} />
      </View>

      <View style={{ width:'100%', flex: 1, justifyContent: 'flex-end',  }}>
        <Text onPress={()=>{ navigation.navigate('ForgotPassword')}} style={{...styles.subText, color:'#F16722', fontWeight:'700'}}>Quên mật khẩu?</Text>
        <Text onPress={()=>{ navigation.navigate('ChoosingTypeAccount')}} style={{...styles.subText, color:'#F16722', fontWeight:'700'}}>Tạo tài khoản mới</Text>
      </View>

    </View>
  );
};

export default LoginScreen;