import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../../assets/images/index.js';

const ItemAddress = () => {
    return (
        <View style={styles.container_item_list}>
            <TouchableOpacity activeOpacity={0.7} style={styles.button_change}>
                <Image source={IMAGES.address_icon} style={styles.icon} />
                <Text style={styles.text_change}>Chọn mặc định</Text>
            </TouchableOpacity>
            <Text style={styles.text_content_item_list} numberOfLines={3}>Cổng trước KTX Khu B, ĐHQG Hồ Chí
                Minh, Đông Hòa, Dĩ An, Bình Dương Cổng trước KTX Khu B, ĐHQG Hồ Chí
                Minh, Đông Hòa, Dĩ An, Bình Dương
            </Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.button_more}>
                <Text style={styles.icon_more}>Xóa</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemAddress