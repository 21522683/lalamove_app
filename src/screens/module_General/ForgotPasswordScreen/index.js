import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequestResetAction } from '../../../redux/slices/usersSlices.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state?.users)
  const [inputs, setInputs] = useState({ phoneNumber: '' });
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
      handleError('Hãy nhập đủ thông tin trường này', 'phoneNumber');
      isValid = false;
    }
    if (isValid) {
      dispatch(sendRequestResetAction({
        pn: inputs.phoneNumber,
        navigation:navigation
      }))
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Nhập tên đăng nhập đã đăng ký để lại mật khẩu</Text>
      <View style={{ marginTop: 20, width: '100%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'phoneNumber')}
          onFocus={() => handleError(null, 'phoneNumber')}
          label="Tên đăng nhập"
          placeholder=""
          error={errors.phoneNumber}
        />
        {error && (
          <Text style={{ marginTop: 7, color: CUSTOM_COLOR.Primary, fontSize: 14, marginBottom:20 }}>
            {error}
          </Text>
        )}
      </View>
      <MyButton text={'Tiếp tục'} onPress={validate} />
      <View style={{ alignSelf: 'flex-start', width: '100%' }}>
        <Text style={{ ...styles.subText, color: '#878787', alignContent: 'flex-start' }}>Nhập tên đăng nhập của bạn.</Text>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;