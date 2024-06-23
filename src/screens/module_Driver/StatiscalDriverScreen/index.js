import { View, Text, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import Dropdown from './Dropdown/index.js';
import formatMoney from '../../../constants/formatMoney.js';
import { LineChart } from "react-native-chart-kit";
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../constants/colors.js';
import { IMAGES } from '../../../assets/images'
import { Image } from 'react-native-svg';
import ItemOrderStatiscal from './ItemOrderStatiscal/index.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../constants/baseUrl.js';


const StatiscalDriverScreen = () => {
    const [dataChart, setDataChart] = useState({
        labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
        datasets: [
            {
                data: [
                    0, 0, 0, 0, 0, 0, 0
                ]
            }
        ]
    });

    useEffect(() => {
        setDataChart(dataChart);
    }, [dataChart])

    // từ đây
    const [filter, setFilter] = useState(
        {
            textSearch: '',
            option: 'Theo ngày',
        }
    );
    const handleSelect = (value) => {
        setFilter(prev => ({ ...prev, option: value }));
        if (value === 'Theo ngày') {
            // Xử lý api chỗ này 
            const data = {
                labels: [],
                datasets: [
                    {
                        data: [
                            230, 480, 120, 903, 345, 256, 678, 345, 678, 678, 1123, 2231, 890, 569, 789, 990,
                            230, 480, 120, 903, 345, 256, 678, 345, 678, 678, 1123, 2231, 890, 569, 789
                        ]
                    }
                ]
            }
            setDataChart(data);
        }
        else if (value === 'Theo tháng') {
            // Xử lý api chỗ này 
            const data = {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                datasets: [
                    {
                        data: [
                            230000 / 1000, 400000 / 1000, 1200000 / 1000, 8000000 / 1000, 370000 / 1000, 290000 / 1000, 230000 / 1000, 400000 / 1000, 1200000 / 1000, 8000000 / 1000, 370000 / 1000, 290000 / 1000,
                        ]
                    }
                ]
            }
            setDataChart(data);
        }
        else {
            const data = {
                labels: ["2024"],
                datasets: [
                    {
                        data: [
                            23089000 / 1000
                        ]
                    }
                ]
            }
            setDataChart(data);
        }
    };
    const handleChangeTextSearch = (value) => {
        setFilter(prev => ({ ...prev, textSearch: value }));
    }

    const [data, setData] = useState();
    const userAuth = useSelector(state => state.users.userAuth);

    const getDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const params = new URLSearchParams(filter).toString();
            const url = `${baseUrl}/order/get-info-report-driver/${userAuth.id}/?${params}`;
            const data = await axios.get(url, config);
            setData(data.data);
            console.log("url nè: ", url);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataAPI();
    }, [filter]);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Thống kê tài xế</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body_container}>
                    <Dropdown onSelect={handleSelect} />

                    <View style={styles.info_container}>
                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Tổng thu nhập:</Text>
                            <Text style={styles.content}>{formatMoney(22890000)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Số đơn hàng thành công:</Text>
                            <Text style={styles.content}>129</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Trả lại cho hệ thống:</Text>
                            <Text style={styles.content}>{formatMoney(21390000)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Số tiền nhận được:</Text>
                            <Text style={styles.content}>{formatMoney(1500000)}</Text>
                        </View>
                    </View>

                    <View style={styles.container_charts}>
                        <Text style={{ fontSize: scale(12), color: CUSTOM_COLOR.Primary, textAlign: 'center' }}>Biểu đồ doanh thu</Text>
                        <LineChart
                            data={dataChart}
                            width={scale(Dimensions.get("window").width * 0.8)} // from react-native
                            height={verticalScale(260)}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: CUSTOM_COLOR.Primary,
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 1, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: verticalScale(8),
                                borderRadius: scale(10)
                            }}
                        />
                    </View>
                </View>
                <View style={styles.container_driver}>
                    <Text style={styles.title_list}>DANH SÁCH ĐƠN HÀNG CỦA TÀI XẾ</Text>
                    <View style={styles.search_bar}>
                        <TextInput value={filter.textSearch} onChangeText={handleChangeTextSearch} style={styles.search_input} placeholder='Nhập thông tin để tìm kiếm' />
                        <Image source={IMAGES.search_icon} style={styles.icon_search} />
                    </View>
                    <ScrollView style={styles.list}>
                        {
                            [1, 2, 3, 4, 5, 6, 7].map(() => {
                                return (
                                    <ItemOrderStatiscal />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StatiscalDriverScreen;