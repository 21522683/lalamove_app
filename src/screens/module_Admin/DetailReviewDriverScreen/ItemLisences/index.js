import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CUSTOM_COLOR from '../../../../constants/colors';
import styles from './style'
import { IMAGES } from '../../../../assets/images'
import Dialog from "react-native-dialog";

const ItemLisences = ({ index, item }) => {

    const [showDialog, setShowDialog] = useState(false);
    const [valueReject, setValueReject] = useState("");
    const handleSend = () => {

    }

    const handleClose = () => {
        setShowDialog(false)
    }

    const [showDetail, setShowDetail] = useState(false);
    const handleClickSeeDetail = (index) => {
        setShowDetail(!showDetail);
    }

    return (
        <View style={{ borderWidth: 2, borderColor: CUSTOM_COLOR.Primary, borderRadius: 4, padding: 20, marginVertical: 10 }}>
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
                <Text style={styles.title_text_2}>Mã số</Text>
                <Text style={styles.content_text_2}>{item.driverLisenceNumber}</Text>
            </View>

            <View style={styles.container_text_2}>
                <Text style={styles.title_text_2}>Loại</Text>
                <Text style={styles.content_text_2}>{item.driverLisenceType}</Text>
            </View>
            {
                showDetail && (
                    <>
                        <View style={styles.container_img_2}>
                            <Text style={styles.title_text_2}>Hình ảnh GPLX</Text>
                            <Image source={{ uri: item.driverLisenceImage }} style={styles.img} />
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
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleClickSeeDetail(index)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: CUSTOM_COLOR.Primary }}>{showDetail ? "Thu gọn" : "Xem chi tiết"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemLisences