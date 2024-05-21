import { View, Text, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './style.js';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import LoginGoogleBtn from '../../../components/LoginGgBtn.js';
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch } from 'react-redux';
import { loginUserAction, loginUserByGoogleAction } from '../../../redux/slices/usersSlices.js';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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
  GoogleSignin.configure({
    iosClientId: '339993089151-ju0a0sgalg5o3hq24s5rqojfamb89opb.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    webClientId: '339993089151-ocrqokloneg68aq66l1s2kr126lv4pvr.apps.googleusercontent.com',
  });
  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
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

  async function onGoogleButtonPress() {
    try {
      const response = await GoogleLogin();
      // console.log(response)

      const bd = {
        id: response?.user?.id,
        email: response?.user?.email,
        name: response?.user?.name,
        photo: response?.user?.photo
      }

      dispatch(loginUserByGoogleAction(bd));
      // const { idToken, accessToken } = response;

      // const credential = auth.GoogleAuthProvider.credential(
      //   idToken,
      //   accessToken,
      // );
      // await auth().signInWithCredential(credential)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Text style={styles.titleText}>Chào mừng bạn trở lại</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20, width: '100%', height: '38%' }}>
            <Input
              onChangeText={text => handleOnchange(text, 'phoneNumber')}
              onFocus={() => handleError(null, 'phoneNumber')}
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
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
            <LoginGoogleBtn text={'Đăng nhập bằng Google'} onPress={async () => onGoogleButtonPress()} />
          </View>

          <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
            <Text onPress={() => { navigation.navigate('ForgotPassword') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Quên mật khẩu?</Text>
            <Text onPress={() => { navigation.navigate('ChoosingTypeAccount') }} style={{ ...styles.subText, color: '#F16722', fontWeight: '700' }}>Tạo tài khoản mới</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
};

export default LoginScreen;