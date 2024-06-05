import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction, resetPassAction } from '../../../redux/slices/usersSlices.js';
const ResetPasswordScreen = ({ route, navigation }) => {
  const [inputs, setInputs] = useState({ repassword: '', password: '' });
  const [errors, setErrors] = useState({});
  const { phoneNumber } = route?.params ?? { phoneNumber: '' };

  const [showNav, setShowNav] = useState(false)
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
    if (!inputs.password) {
      handleError('Hãy nhập đủ thông tin trường này', 'password');
      isValid = false;
    }
    if (!inputs.repassword) {
      handleError('Hãy nhập đủ thông tin trường này', 'repassword');
      isValid = false;
    }
    if (inputs.password !== inputs.repassword) {
      handleError('Mật khẩu nhập lại phải trùng khớp', 'repassword');
      isValid = false;
    }
    if (isValid) {
      const pl = {
        phoneNumber: phoneNumber,
        password: inputs.password,
        repassword: inputs.repassword,
      }
      dispatch(resetPassAction({
        body: pl,
        setShowNav: setShowNav
      }));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Đặt lại mật khẩu</Text>
      <View style={{ marginTop: 20, width: '100%', height: '33%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          error={errors.password}
          password
        />
        <Input
          onChangeText={text => handleOnchange(text, 'repassword')}
          onFocus={() => handleError(null, 'repassword')}
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          error={errors.repassword}
          password
        />
      </View>

      <MyButton text={'Đặt lại mật khẩu'} onPress={validate} />
      <View style={{ width: '100%', flex: 1,  flexDirection: 'row', display: showNav ? 'flex' : 'none', alignItems: 'center', flexWrap:'wrap' , marginTop:20}}>
        <Text style={{fontSize:16}}>Mật khẩu của bạn đã được cập nhật. Vui lòng </Text>
        <Text onPress={() => { navigation.navigate('Login') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700', marginTop:1 }}>Đăng nhập</Text>
        <Text style={{fontSize:16}}> lại! </Text>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;