import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CUSTOM_COLOR from '../../../../constants/colors';
import styles from './style'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../../../../assets/images'
import Dialog from "react-native-dialog";


const ItemVehicle = ({ index, item }) => {
    
    const [showDialog, setShowDialog] = useState(false);
    const [valueReject, setValueReject] = useState("");

    const handleSend = () => {

    }

    const handleClose = () => {
        setShowDialog(false)
    }
    const [showDetailVehicle, setShowDetailVehicle] = useState(false);
    const handleClickSeeDetailVehicle = (index) => {
        setShowDetailVehicle(!showDetailVehicle);
    }

    return (
        <View key={index} style={{ borderWidth: 2, borderColor: CUSTOM_COLOR.Primary, borderRadius: 4, padding: 20, marginVertical: 10 }}>
            <View style={styles.container_text_2}>
                <Text style={styles.title_text_2}>Trạng thái</Text>
                {
                    item.status === "Đang kiểm tra" && (
                        <Text style={styles.status_text_2}>Đang kiểm tra</Text>
                    )
                }
                {
                    item.status === "Không hợp lệ" && (
                        <Text style={styles.status_text_2_red}>Không hợp lệ</Text>
                    )
                }
                {
                    item.status === "Đã xác minh" && (
                        <Text style={styles.status_text_2_green}>Đã xác minh</Text>
                    )
                }
            </View>

            <View style={styles.container_text_2}>
                <Text style={styles.title_text_2}>Tên xe</Text>
                <Text style={styles.content_text_2}>{item.vehicleName}</Text>
            </View>

            <View style={styles.container_text_2}>
                <Text style={styles.title_text_2}>Loại xe</Text>
                <Text style={styles.content_text_2}>{item.vehicleType.vehicleTypeName}</Text>
            </View>

            <View style={styles.container_text_2}>
                <Text style={styles.title_text_2}>Biển số xe</Text>
                <Text style={styles.content_text_2}>{item.lisencePlate}</Text>
            </View>
            {
                showDetailVehicle && (
                    <>
                        <View style={styles.container_img_2}>
                            <Text style={styles.title_text_2}>Hình ảnh xe</Text>
                            <Image source={{uri: item.vehicleImage}} style={styles.img} />
                        </View>

                        <View style={styles.container_text_2}>
                            <Text style={styles.title_text_2}>Tải trọng tối đa</Text>
                            <Text style={styles.content_text_2}>{item.vehicleType.mount}</Text>
                        </View>

                        <View style={styles.container_text_2}>
                            <Text style={styles.title_text_2}>Kích thước</Text>
                            <Text style={styles.content_text_2}>{item.vehicleType.size}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', marginVertical: verticalScale(8) }}>
                            <Text style={styles.title_text_2}>Phù hợp cho:</Text>
                            <View style={{ padding: moderateScale(10), borderColor: '#d7d7d7', borderWidth: 1, borderRadius: 6, marginTop: verticalScale(8) }}>
                                <Text style={{ color: '#5A5A5A' }}>{item.vehicleType.suitableFor}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginVertical: verticalScale(8) }}>
                            <Text style={styles.title_text_2}>Ghi chú:</Text>
                            <View style={{ padding: moderateScale(10), borderColor: '#d7d7d7', borderWidth: 1, borderRadius: 6, marginTop: verticalScale(8) }}>
                                <Text style={{ color: '#5A5A5A' }}>{item.vehicleType.note}</Text>
                            </View>
                        </View>

                        {
                            item.status === "Đang kiểm tra" && (
                                <View style={styles.container_button}>
                                    <TouchableOpacity style={styles.btn_accept}>
                                        <Text style={styles.text_btn}>Duyệt</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
                                        <Text style={styles.text_btn}>Từ chối</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        {
                            showDialog && (
                                <Dialog.Container visible={true}>
                                    <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
                                    <Dialog.Description>
                                        Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
                                    </Dialog.Description>
                                    <Dialog.Input />
                                    <Dialog.Button label="Đóng" onPress={handleClose} />
                                    <Dialog.Button label="Gửi đi" onPress={handleSend} />
                                </Dialog.Container>
                            )
                        }
                    </>
                )
            }
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleClickSeeDetailVehicle(index)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: CUSTOM_COLOR.Primary }}>{showDetailVehicle ? "Thu gọn" : "Xem chi tiết"}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default ItemVehicle