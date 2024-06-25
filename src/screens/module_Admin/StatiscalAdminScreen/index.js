import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js'
import Dropdown from './Dropdown/index.js';
import formatMoney from '../../../constants/formatMoney.js';
import { LineChart } from "react-native-chart-kit";
import { scale, verticalScale } from 'react-native-size-matters';
import Dialog from "react-native-dialog";
import CUSTOM_COLOR from '../../../constants/colors.js';
import { IMAGES } from '../../../assets/images'
import ItemReportDriver from './ItemReportDriver/index.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../constants/baseUrl.js';
import { ActivityIndicator } from 'react-native-paper';

const StatiscalAdminScreen = () => {
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

    const [list, setList] = useState([]);
    const getDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const params = new URLSearchParams(filter).toString();
            const url = `${baseUrl}/order/get-info-report-admin/?${params}`;
            const data = await axios.get(url, config);
            setDataReport(data.data);
            setList(data.data.listDrivers);
            setTyLe(data.data.hoaHong);
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

    const handleClose = () => {
        setShowDialog(false)
    }

    const [showDialog, setShowDialog] = useState(false);
    const [tyle, setTyLe] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (tyle.toString().trim().length === 0) {
            Alert.alert('Thông báo', "Vui lòng nhập tỷ lệ hoa hồng");
            return;
        } else {
            if (tyle < 0.5 || tyle > 1) {
                Alert.alert('Thông báo', "Tỷ lệ hoa hồng phải từ 0.5 đến 1");
                return;
            }
            else {
                try {
                    setLoading(true);
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${userAuth.access_token}`,
                            'Content-Type': 'application/json',
                        },
                    };
                    const url = `${baseUrl}/order/update-hoa-hong`;
                    const data = await axios.put(url, { hoaHongChoTaiXe: tyle }, config);
                    getDataAPI();
                    Alert.alert('Thông báo', "Thay đổi tỷ lệ hoa hồng cho tài xế thành công.");
                    setShowDialog(false);
                    setTyLe(0);
                    setLoading(false);
                } catch (error) {
                    console.log(error.message);
                    Alert.alert('Lỗi', error.message);
                    setShowDialog(false);
                    setTyLe(0);
                    setLoading(false);
                }
            }
        }
    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Thống kê admin</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body_container}>
                    <Dropdown onSelect={handleSelect} />

                    <View style={styles.info_container}>
                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Tổng doanh thu:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalRevenue)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Số đơn hàng thành công:</Text>
                            <Text style={styles.content}>{dataReport.totalOrderSuccess}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Trả cho tài xế:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalOfDriver)}</Text>
                        </View>

                        <View style={styles.item_info}>
                            <Text style={styles.title_info}>Lợi nhuận:</Text>
                            <Text style={styles.content}>{formatMoney(dataReport.totalOfSystem)}</Text>
                        </View>
                    </View>

                    <View style={styles.container_charts}>
                        <Text style={{ fontSize: scale(12), color: CUSTOM_COLOR.Primary, textAlign: 'center' }}>Biểu đồ doanh thu</Text>
                        <LineChart
                            data={dataChart}
                            width={scale(Dimensions.get("window").width * 0.8)}
                            height={verticalScale(260)}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: CUSTOM_COLOR.Primary,
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 1,
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
                <View style={styles.container_final}>
                    <View style={styles.container_hoahong}>
                        <Text style={styles.title_hoahong}>Hoa hồng tài xế:</Text>
                        <Text style={styles.tyle}>{dataReport.hoaHong}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn_edit} onPress={() => setShowDialog(true)}>
                        <Text style={styles.text_btn}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                {
                    showDialog && (
                        loading ? (
                            <View style={[styles.containerLoading, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#FF5900" />
                            </View>
                        ) : (
                            <Dialog.Container visible={true}>
                                <Dialog.Title>Chỉnh sửa tỷ lệ hoa hồng</Dialog.Title>
                                <Dialog.Description>
                                    Vui lòng nhập tỷ lệ hoa hồng bạn muốn chỉnh sửa. Tỷ lệ hoa hồng cho tài xế phải đảm bảo lớn hơn 50% và nhỏ hơn 100% (từ 0.5 đến 1).
                                </Dialog.Description>
                                <Dialog.Input value={tyle} onChangeText={(text) => setTyLe(text)} />
                                <Dialog.Button label="Đóng" onPress={handleClose} />
                                <Dialog.Button label="Lưu" onPress={handleSend} />
                            </Dialog.Container>
                        )
                    )
                }

                <View style={styles.container_driver}>
                    <Text style={styles.title_list}>DANH SÁCH THỐNG KÊ CỦA TÀI XẾ</Text>
                    <View style={styles.search_bar}>
                        <TextInput value={filter.textSearch} onChangeText={handleChangeTextSearch} style={styles.search_input} placeholder='Nhập tên tài xế để tìm kiếm' />
                        <Image source={IMAGES.search_icon} style={styles.icon_search} />
                    </View>
                    <ScrollView style={styles.list}>
                        {
                            list.map((item, index) => {
                                return (
                                    <ItemReportDriver key={item.id || index} item={item} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StatiscalAdminScreen;