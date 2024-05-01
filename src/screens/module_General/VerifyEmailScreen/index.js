import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOtpAction, sendRequestResetAction } from '../../../redux/slices/usersSlices.js';
const VerifyEmailScreen = ({ route, navigation }) => {
  const [inputs, setInputs] = useState({ st1: '', st2: '', st3: '', st4: '' });
  const [errors, setErrors] = useState({});
  const { phoneNumber } = route.params;
  const { error } = useSelector(state => state?.users)

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
    if (!inputs.st1) {
      handleError('Trống', 'st1');
      isValid = false;
    }
    if (!inputs.st2) {
      handleError('Trống', 'st2');
      isValid = false;
    } if (!inputs.st3) {
      handleError('Trống', 'st3');
      isValid = false;
    } if (!inputs.st4) {
      handleError('Trống', 'st4');
      isValid = false;
    }
    if (isValid) {
      dispatch(checkOtpAction({
        pn: phoneNumber,
        otp:''+inputs.st1+inputs.st2+inputs.st3+inputs.st4,
        navigation: navigation
      }))
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Nhập mã OTP</Text>
      <Text style={{ ...styles.subText, marginBottom: '5%', marginTop: 5, fontSize: 18 }}>Nhập mã code gồm 4 chữ số được gửi đến email đã đăng ký cho bạn</Text>

      <View style={{ marginBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st1')}
            onFocus={() => handleError(null, 'st1')}
            label=""
            maxLength={1}
            placeholder=""
            error={errors.st1}
          />
        </View>

        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st2')}
            onFocus={() => handleError(null, 'st2')}
            label=""
            maxLength={1}
            placeholder=""
            error={errors.st2}
          />
        </View>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st3')}
            onFocus={() => handleError(null, 'st3')}
            label=""
            maxLength={1}
            placeholder=""
            error={errors.st3}
          />
        </View>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st4')}
            onFocus={() => handleError(null, 'st4')}
            label=""
            maxLength={1}
            placeholder=""
            error={errors.st4}
          />
        </View>
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: CUSTOM_COLOR.Primary, fontSize: 14, marginBottom: 20 }}>
          {error}
        </Text>
      )}
      <Text onPress={() => {
        dispatch(sendRequestResetAction({
          pn: phoneNumber
        }))
      }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Gửi lại mã!</Text>

      <MyButton text={'Tiếp tục'} onPress={validate} />

    </View>
  );
};

export default VerifyEmailScreen;