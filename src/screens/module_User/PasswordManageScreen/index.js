import { View, Text, TextInput, SafeAreaView, Platform, KeyboardAvoidingView, Image, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../constants/colors.js';

const PasswordManageScreen = () => {

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const toggleShowCurrentPass = () => {
        setShowCurrentPass(!showCurrentPass);
        Keyboard.dismiss();
    };

    const toggleShowNewPass = () => {
        setShowNewPass(!showNewPass);
        Keyboard.dismiss();
    };

    const toggleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
            >
                <View style={styles.header}>
                    <Image source={IMAGES.back_icon} style={styles.back_button} />
                    <Text style={styles.title_header}>Quản lý mật khẩu</Text>
                </View>

                <ScrollView style={styles.container_body} showsVerticalScrollIndicator={false}>
                    <View style={styles.container_input}>
                        <Text style={styles.title_input}>Mật khẩu hiện tại</Text>
                        <View style={styles.input}>
                            <TextInput style={styles.input_field} secureTextEntry={!showCurrentPass} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
                            <TouchableOpacity activeOpacity={0.7} onPress={toggleShowCurrentPass} style={styles.button_eye}>
                                <Image source={showCurrentPass ? IMAGES.eye_icon : IMAGES.not_eye_icon} style={styles.icon_eye} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text_validation}>Vui lòng nhập mật khẩu đầy đủ</Text>
                    </View>

                    <View style={styles.space} />

                    <View style={styles.container_input}>
                        <Text style={styles.title_input}>Nhập mật khẩu mới</Text>
                        <View style={styles.input}>
                            <TextInput style={styles.input_field} secureTextEntry={!showNewPass} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
                            <TouchableOpacity activeOpacity={0.7} onPress={toggleShowNewPass} style={styles.button_eye}>
                                <Image source={showNewPass ? IMAGES.eye_icon : IMAGES.not_eye_icon} style={styles.icon_eye} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text_validation}>Vui lòng nhập mật khẩu đầy đủ</Text>
                    </View>

                    <View style={styles.container_input}>
                        <Text style={styles.title_input}>Xác nhận lại mật khẩu mới</Text>
                        <View style={styles.input}>
                            <TextInput style={styles.input_field} secureTextEntry={!showConfirmPass} multiline={false} activeUnderlineColor={CUSTOM_COLOR.Primary} />
                            <TouchableOpacity activeOpacity={0.7} onPress={toggleShowConfirmPass} style={styles.button_eye}>
                                <Image source={showConfirmPass ? IMAGES.eye_icon : IMAGES.not_eye_icon} style={styles.icon_eye} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text_validation}>Vui lòng nhập mật khẩu đầy đủ</Text>
                    </View>

                    <TouchableOpacity style={styles.button_update}>
                        <Text style={styles.title_button}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default PasswordManageScreen