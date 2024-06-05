import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import ItemAddress from './ItemAddress/index.js';
import { useNavigation } from '@react-navigation/native';

const AddressManageScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={IMAGES.back_icon} style={styles.back_button} />
                </TouchableOpacity>
                <Text style={styles.title_header}>Địa chỉ đã lưu</Text>
            </View>

            <ScrollView style={styles.container_body}>
                <View style={styles.container_item}>
                    <Text style={styles.title_item}>Địa chỉ mặc định</Text>
                    <View style={styles.space} />
                    <View style={styles.item_selected}>
                        <TouchableOpacity style={styles.button_change}>
                            <Image source={IMAGES.address_icon} style={styles.icon} />
                            <Text style={styles.text_change}>Thay đổi</Text>
                        </TouchableOpacity>
                        <Text style={styles.text_content} numberOfLines={3}>Cổng trước KTX Khu B, ĐHQG Hồ Chí
                            Minh, Đông Hòa, Dĩ An, Bình Dương Cổng trước KTX Khu B, ĐHQG Hồ Chí
                            Minh, Đông Hòa, Dĩ An, Bình Dương</Text>
                    </View>
                </View>
                <View style={styles.space} />

                <View style={styles.container_header_list}>
                    <Text style={styles.title_list}>DANH SÁCH ĐỊA CHỈ ĐÃ LƯU</Text>
                    <TouchableOpacity style={styles.btn_add}>
                        <Text style={styles.text_add}>Thêm địa chỉ</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.list}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return (
                                <ItemAddress key={index} />
                            )
                        })
                    }
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddressManageScreen