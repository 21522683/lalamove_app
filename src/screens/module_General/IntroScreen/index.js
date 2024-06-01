import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import { useDispatch } from 'react-redux';
import { getAllVehicleTypeAction } from '../../../redux/slices/usersSlices.js';

const IntroScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>

            <Image source={IMAGES.intro} style={styles.logo} />

            {/* Ví dụ về sử dụng font, ae gõ tên font trong thư mục fonts là đc */}
            <Text style={styles.titleText}>Urgent Service</Text>
            <Text style={styles.titleText}>B2B Dilevery</Text>
            <Text style={styles.subText}>Chúng tôi làm việc theo mô hình cộng đồng. Bạn đặt hàng, hệ thống sẽ chọn người chuyển phát nhanh nhất cho bạn.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={async() => {
                     dispatch(getAllVehicleTypeAction())
                    navigation.navigate('Login')
                    }}>
                <Text style={styles.btnText}>Bắt đầu</Text>
                    
            </TouchableOpacity>

        </View>
    );
};

export default IntroScreen;
