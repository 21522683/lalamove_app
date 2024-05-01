import { View, Text, Keyboard, Platform, TouchableOpacity } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import DateTimePicker from '@react-native-community/datetimepicker';

const Step1Screen = ({ navigation }) => {
    const [inputs, setInputs] = useState({ fullName: '', email: '', CCCD: '', birthday: '', address: '' });
    const [errors, setErrors] = useState({});
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const [date, setDate] = useState(new Date);
    const [showPicker, setShowPicker] = useState(false);
    const formatDateString = (date) => {
        const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate || date;
            console.log(currentDate)
            setDate(currentDate);
            // toggleDatePicker();
            handleOnchange(formatDateString(currentDate), "birthday");

        }
        else {
            toggleDatePicker();
        }
    }
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.fullName) {
            handleError('Please input full Name', 'fullName');
            isValid = false;
        }
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.CCCD) {
            handleError('Please input CCCD', 'CCCD');
            isValid = false;
        }
        if (!inputs.birthday) {
            handleError('Please input birthday', 'birthday');
            isValid = false;
        }
        if (!inputs.address) {
            handleError('Please input address', 'address');
            isValid = false;
        }
        if (!isValid) {
            navigation.navigate('Step2')
        }
    };
    return (
        <View style={styles.container}>
            <Text style={{ ...styles.subText, marginTop: 0, marginBottom: 10 }}>Bước 1:</Text>
            <Text style={styles.titleText}>Tạo tài khoản tài xế mới</Text>
            <View style={{ marginTop: 10, width: '100%' }}> 
                <Input
                    onChangeText={text => handleOnchange(text, 'fullName')}
                    onFocus={() => handleError(null, 'fullName')}
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                    error={errors.fullName}
                />
                <Input
                    onChangeText={text => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    label="Email"
                    placeholder="Nhập email"
                    error={errors.email}
                />
                <Input
                    onChangeText={text => handleOnchange(text, 'CCCD')}
                    onFocus={() => handleError(null, 'CCCD')}
                    label="CCCD"
                    placeholder="Nhập CCCD"
                    error={errors.CCCD}
                />
                <TouchableOpacity onPress={toggleDatePicker}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'birthday')}
                        onFocus={() => handleError(null, 'birthday')}
                        label="Ngày sinh"
                        editable={false}
                        value={inputs.birthday}
                        placeholder="DD/MM/YYYY"
                        error={errors.birthday}
                    />
                </TouchableOpacity>
                {showPicker && <DateTimePicker mode="date" value={date} display="spinner" onChange={onChange} />}

                <Input
                    onChangeText={text => handleOnchange(text, 'address')}
                    onFocus={() => handleError(null, 'address')}
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    error={errors.address}
                />
            </View>

            <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
                <MyButton text={'Tiếp tục'} onPress={validate} />
            </View>

        </View>
    );
};

export default Step1Screen;