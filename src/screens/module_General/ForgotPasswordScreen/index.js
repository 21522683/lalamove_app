import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import React, {  useState } from 'react';
const ForgotPasswordScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: '' });
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
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Nhập email để cập nhật lại mật khẩu</Text>
      <View style={{ marginTop: 20, width: '100%' }}>
        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          label="Email"
          placeholder="Nhập email"
          error={errors.email}
        />
      </View>
      <MyButton text={'Tiếp tục'} onPress={validate} />
      <View style={{ alignSelf: 'center', width: '100%' }}>
        <Text style={{...styles.subText, color:'#878787'}}>Nhập email của bạn để cập nhật lại mật khẩu.</Text>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;