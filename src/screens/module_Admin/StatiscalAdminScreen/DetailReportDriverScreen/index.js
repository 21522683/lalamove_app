import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import Dropdown from './Dropdown/index.js';
import formatMoney from '../../../../constants/formatMoney.js';
import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors.js';
import ItemOrderStatiscal from './ItemReportOrderDriver/index.js';
import { IMAGES } from '../../../../assets/images/index.js';
import ItemReportOrderDriver from './ItemReportOrderDriver/index.js';
import { useSelector } from 'react-redux';
import baseUrl from '../../../../constants/baseUrl.js';
import axios from 'axios';


const DetailReportDriverScreen = ({navigation}) => {
    const [dataChart, setDataChart] = useState({
        labels: ["First"],
        datasets: [
            {
                data: [0]
            }
        ]
    });

    const [filter, setFilter] = useState(
        {
            textSearch: '',
            option: 'Theo ngày',
        }
    );
    const handleSelect = (value) => {
        setFilter(prev => ({ ...prev, option: value }));
    };
    const handleChangeTextSearch = (value) => {
        setFilter(prev => ({ ...prev, textSearch: value }));
    }

    const [dataReport, setDataReport] = useState({});
    const userAuth = useSelector(state => state.users.userAuth);
    const idDriver = useSelector(state => state.reports.idDriverSelected);
    const getDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const params = new URLSearchParams(filter).toString();
            const url = `${baseUrl}/order/get-info-report-driver/${idDriver}/?${params}`;
            const data = await axios.get(url, config);
            setDataReport(data.data);
            const dataOfChart = {
                labels: data.data.dataOfChart.arrLabelChart,
                datasets: [
                    {
                        data: data.data.dataOfChart.arrValueChart
                    }
                ]
            }
            setDataChart(dataOfChart);
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.arrow_back} style={styles.back_button} />
                </TouchableOpacity>
                <Text style={styles.title_header}>Thống kê tài xế</Text>
            </View>

            <View style={styles.container_info}>
                <Image source={{uri: dataReport.infoDriver?.avatar}} style={styles.img} />
                <View style={styles.info_driver}>
                    <Text style={styles.name}>{dataReport.infoDriver?.fullName}</Text>
                    <Text style={styles.email}>{dataReport.infoDriver?.email}</Text>
                    <Text style={styles.phone}>{dataReport.infoDriver?.phoneNumber}</Text>
                    {
                        (dataReport.infoDriver?.isLocked === true) ? (
                            <Text style={styles.lock}>Đang bị khóa</Text>
                        ) : (
                            (dataReport.infoDriver?.isWaitingAccepted === false) ? (
                                <Text style={styles.status}>Đang hoạt động</Text>
                            ) : (
                                <Text style={styles.waiting}>Chờ xét duyệt</Text>
                            )
                        )
                    }
                    
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body_container}>
                    <Dropdown onSelect={handleSelect} />

                    <View style={styles.info_container}>
                    <View style={styles.item_info}>
                            <Text style={styles.title_info}>Tổng thu nhập:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalRevenue)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Số đơn hàng thành công:</Text>
                            <Text style={styles.content}>{dataReport.totalOrderSuccess}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Trả lại cho hệ thống:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalOfSystem)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Số tiền nhận được:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalOfDriver)}</Text>
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
                            dataReport?.orders?.map((item, index) => {
                                return (
                                    <ItemReportOrderDriver key={index} item={item} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailReportDriverScreen;