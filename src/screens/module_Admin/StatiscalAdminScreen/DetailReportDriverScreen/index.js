import { View, Text, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import Dropdown from './Dropdown/index.js';
import formatMoney from '../../../../constants/formatMoney.js';
import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors.js';
import { IMAGES } from '../../../../assets/images/index.js';


const DetailReportDriverScreen = () => {
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

    const handleSelect = (value) => {
        // Theo tuần 
        if (value === 'day') {
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
        else if (value === 'month') {
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={IMAGES.arrow_back} style={styles.back_button} />
                <Text style={styles.title_header}>Thống kê tài xế</Text>
            </View>

            <View style={styles.container_info}>
                <Image source={IMAGES.avatar} style={styles.img}/>
                <View style={styles.info_driver}>
                    <Text style={styles.name}>Phan Trọng Tính</Text>
                    <Text style={styles.email}>phantrongtinh15082003@gmail.com</Text>
                    <Text style={styles.phone}>0379361210</Text>
                    <Text style={styles.status}>Đang hoạt động</Text>
                </View>
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailReportDriverScreen;