import { View, Text, TextInput, SafeAreaView, Platform, KeyboardAvoidingView, Image, ScrollView, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccessMessage, getCurrentUserAction, updatePassUserAction } from '../../../redux/slices/usersSlices.js';



const PasswordManageScreen = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loading);
    const successMessage = useSelector(state => state.users.successMessage);
    const currentUser = useSelector(state => state.users.currentUser);

    const navigation = useNavigation();
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const toggleShowNewPass = () => {
        setShowNewPass(!showNewPass);
        Keyboard.dismiss();
    };

    const toggleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
        Keyboard.dismiss();
    };

    const [newPass, setNewPass] = useState('');
    const [textValidateNewPass, setTextValidateNewPass] = useState('');

    const [confirmPass, setConfirmPass] = useState('');
    const [textValidateConfirmPass, setTextValidateConfirmPass] = useState('');

    const validateNewPass = (value) => {
        if (value.trim().length === 0) {
            setTextValidateNewPass('Vui lòng nhập mật khẩu mới');
            return false;
        }
        else {
            if (value.trim().length < 8) {
                setTextValidateNewPass('Mật khẩu phải có ít nhất 8 ký tự');
                return false;
            }
            else {
                setTextValidateNewPass('');
                return true;
            }
        }
    }
    const validateConfirmPass = (value) => {
        if (value.trim().length === 0) {
            setTextValidateConfirmPass('Vui lòng nhập để xác nhận lại mật khẩu');
            return false;
        }
        else {
            if (value.trim().length < 8) {
                setTextValidateConfirmPass('Mật khẩu phải có ít nhất 8 ký tự');
                return false;
            } else {
                if (value !== newPass) {
                    setTextValidateConfirmPass('Mật khẩu nhập lại phải trùng khớp');
                    return false;
                } else {
                    setTextValidateConfirmPass('');
                    return true;
                }
            }
        }
    }

    const handleChangeNewPass = (value) => {
        validateNewPass(value);
        setNewPass(value);
    }
    const handleChangeConfirmPass = (value) => {
        validateConfirmPass(value);
        setConfirmPass(value);
    }

    const handleUpdate = async () => {
        const isValid = validateNewPass(newPass) && validateConfirmPass(confirmPass);
        if (isValid) {
            const dataUpdate = {
                id: currentUser._id,
                info: {
                    password: confirmPass,
                }
            }
            console.log(dataUpdate);
            dispatch(updatePassUserAction(dataUpdate));
        }
    }
    useEffect(() => {
        if (successMessage) {
            Alert.alert('Thông báo', successMessage);
            dispatch(clearSuccessMessage());
        }
    }, [successMessage, dispatch]);
    useEffect(() => {
        dispatch(getCurrentUserAction());
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image source={IMAGES.back_icon} style={styles.back_button} />
                    </TouchableOpacity>
                    <Text style={styles.title_header}>Quản lý mật khẩu</Text>
                </View>

                <ScrollView style={styles.container_body} showsVerticalScrollIndicator={false}>
                    <View style={styles.container_input}>
                        <Text style={styles.title_input}>Nhập mật khẩu mới</Text>
                        <View style={styles.input}>
                            <TextInput value={newPass} onChangeText={handleChangeNewPass} style={styles.input_field} secureTextEntry={!showNewPass} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
                            <TouchableOpacity activeOpacity={0.7} onPress={toggleShowNewPass} style={styles.button_eye}>
                                <Image source={showNewPass ? IMAGES.eye_icon : IMAGES.not_eye_icon} style={styles.icon_eye} />
                            </TouchableOpacity>
                        </View>
                        {
                            textValidateNewPass && <Text style={styles.text_validation}>{textValidateNewPass}</Text>
                        }
                    </View>
                    <View style={styles.space} />

                    <View style={styles.container_input}>
                        <Text style={styles.title_input}>Xác nhận lại mật khẩu mới</Text>
                        <View style={styles.input}>
                            <TextInput value={confirmPass} onChangeText={handleChangeConfirmPass} style={styles.input_field} secureTextEntry={!showConfirmPass} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
                            <TouchableOpacity activeOpacity={0.7} onPress={toggleShowConfirmPass} style={styles.button_eye}>
                                <Image source={showConfirmPass ? IMAGES.eye_icon : IMAGES.not_eye_icon} style={styles.icon_eye} />
                            </TouchableOpacity>
                        </View>
                        {
                            textValidateConfirmPass && <Text style={styles.text_validation}>{textValidateConfirmPass}</Text>
                        }
                    </View>
                    {
                        loading ? (
                            <View style={[styles.containerLoading, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#FF5900" />
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.button_update} onPress={handleUpdate}>
                                <Text style={styles.title_button}>
                                    Cập nhật
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default PasswordManageScreen