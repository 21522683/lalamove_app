import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import { IMAGES } from '../../../../../assets/images';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import baseUrl from '../../../../../constants/baseUrl.js';
import axios from 'axios';
import convertDate from '../../../../../constants/converDate.js';
import formatMoney from '../../../../../constants/formatMoney.js';

const DetailOrderStatiscal = ({ navigation }) => {

    const idOrder = useSelector(state => state.reports.idOrderSelected);
    const userAuth = useSelector(state => state.users.userAuth);

    const [dataApi, setDataApi] = useState({});
    const getDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const url = `${baseUrl}/order/get-info-order/${idOrder}`;
            const response = await axios.get(url, config);
            setDataApi(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataAPI();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.arrow_back} style={styles.back_button} />
                </TouchableOpacity>
                <Text style={styles.title_header}>Chi tiết đơn hàng</Text>
            </View>

            <ScrollView>
                <View style={{ flexDirection: 'column', padding: moderateScale(20) }}>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginTop: verticalScale(10), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN ĐƠN HÀNG</Text>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Mã đơn hàng:</Text>
                            <Text style={styles.content_item}>{dataApi._id}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Người đặt hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.customer.fullName}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>SĐT đặt hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.customer.phoneNumber}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Email đặt hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.customer.email}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Ngày đặt hàng:</Text>
                            <Text style={styles.content_item}>{convertDate(dataApi.date)}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Phương tiện:</Text>
                            <Text style={styles.content_item}>{dataApi.drive.vehicles[0].vehicleName}</Text>
                        </View>

                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Tổng tiền:</Text>
                            <Text style={styles.content_item}>{formatMoney(dataApi.charge)}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginTop: verticalScale(20), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN TÀI XẾ</Text>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Họ tên:</Text>
                            <Text style={styles.content_item}>{dataApi.drive.fullName}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Số điện thoại:</Text>
                            <Text style={styles.content_item}>{dataApi.drive.phoneNumber}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'column' }}>
                            <Text style={styles.title_item}>Địa chỉ giao hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.sourceAddress.detail + ", " + dataApi.sourceAddress.ward + ", " + dataApi.sourceAddress.district + ", " + dataApi.sourceAddress.province}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginTop: verticalScale(20), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN NGƯỜI GỬI</Text>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Họ tên:</Text>
                            <Text style={styles.content_item}>{dataApi.sourceAddress.fullName}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Số điện thoại:</Text>
                            <Text style={styles.content_item}>{dataApi.sourceAddress.phoneNumber}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'column' }}>
                            <Text style={styles.title_item}>Địa chỉ nhận hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.sourceAddress.detail + ", " + dataApi.sourceAddress.ward + ", " + dataApi.sourceAddress.district + ", " + dataApi.sourceAddress.province}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginTop: verticalScale(20), marginBottom: verticalScale(4), fontWeight: 'bold' }}>THÔNG TIN NGƯỜI NHẬN</Text>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Họ tên:</Text>
                            <Text style={styles.content_item}>{dataApi.destinationAddress.fullName}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title_item}>Số điện thoại:</Text>
                            <Text style={styles.content_item}>{dataApi.destinationAddress.phoneNumber}</Text>
                        </View>
                        <View style={{ marginVertical: verticalScale(2), flexDirection: 'column' }}>
                            <Text style={styles.title_item}>Địa chỉ nhận hàng:</Text>
                            <Text style={styles.content_item}>{dataApi.destinationAddress.detail + ", " + dataApi.destinationAddress.ward + ", " + dataApi.destinationAddress.district + ", " + dataApi.destinationAddress.province}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailOrderStatiscal;