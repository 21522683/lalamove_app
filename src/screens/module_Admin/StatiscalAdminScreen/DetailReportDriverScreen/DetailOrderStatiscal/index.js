import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import styles from './style.js'
import { IMAGES } from '../../../../../assets/images';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const DetailOrderStatiscal = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={IMAGES.arrow_back} style={styles.back_button} />
                <Text style={styles.title_header}>Chi tiết đơn hàng</Text>
            </View>

            <View style={{ flexDirection: 'column', padding: moderateScale(20) }}>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginTop: verticalScale(10), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN ĐƠN HÀNG</Text>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Mã đơn hàng:</Text>
                        <Text style={styles.content_item}>123456789</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Ngày giao hàng:</Text>
                        <Text style={styles.content_item}>11/01/2022</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Ngày nhận hàng:</Text>
                        <Text style={styles.content_item}>11/01/2022</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Phương tiện:</Text>
                        <Text style={styles.content_item}>Xe máy</Text>
                    </View>

                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Tổng tiền:</Text>
                        <Text style={styles.content_item}>159.000 đ</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginTop: verticalScale(20), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN TÀI XẾ</Text>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Họ tên:</Text>
                        <Text style={styles.content_item}>Phan Trọng Tính</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Số điện thoại:</Text>
                        <Text style={styles.content_item}>0379361210</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'column' }}>
                        <Text style={styles.title_item}>Địa chỉ giao hàng:</Text>
                        <Text style={styles.content_item}>Tân tạo A, Bình Tân, Thành phố hồ chí minh</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginTop: verticalScale(20), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN NGƯỜI NHẬN</Text>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Họ tên:</Text>
                        <Text style={styles.content_item}>Phan Trọng Tính</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title_item}>Số điện thoại:</Text>
                        <Text style={styles.content_item}>0379361210</Text>
                    </View>
                    <View style={{ marginVertical: verticalScale(2), flexDirection: 'column' }}>
                        <Text style={styles.title_item}>Địa chỉ nhận hàng:</Text>
                        <Text style={styles.content_item}>Tân tạo A, Bình Tân, Thành phố hồ chí minh</Text>
                    </View>
                </View>




            </View>
        </SafeAreaView>
    )
}

export default DetailOrderStatiscal;