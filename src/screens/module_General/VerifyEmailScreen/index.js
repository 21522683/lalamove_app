import { View, Text, Keyboard } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import React, { useState } from 'react';
const VerifyEmailScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ st1: '', st2: '', st3: '', st4: '' });
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
      <Text style={styles.titleText}>Xác minh email của bạn</Text>
      <Text style={{ ...styles.subText, marginBottom: '5%', marginTop: 5, fontSize: 18 }}>Nhập mã code gồm 4 chữ số được gửi đến cho bạn</Text>

      <View style={{ marginBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st1')}
            onFocus={() => handleError(null, 'st1')}
            label=""
            placeholder=""
            error={errors.st1}
          />
        </View>

        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st1')}
            onFocus={() => handleError(null, 'st1')}
            label=""
            placeholder=""
            error={errors.st1}
          />
        </View>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st1')}
            onFocus={() => handleError(null, 'st1')}
            label=""
            placeholder=""
            error={errors.st1}
          />
        </View>
        <View style={{ width: 55 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'st1')}
            onFocus={() => handleError(null, 'st1')}
            label=""
            placeholder=""
            error={errors.st1}
          />
        </View>
      </View>
      <Text onPress={() => { }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Gửi lại mã!</Text>

      <MyButton text={'Tiếp tục'} onPress={validate} />

    </View>
  );
};

export default VerifyEmailScreen;