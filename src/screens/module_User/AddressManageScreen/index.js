import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import ItemAddress from './ItemAddress/index.js';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from '../../../constants/baseUrl.js';
import axios from 'axios';
import { setAddressDefault, setListAddressOfUser } from '../../../redux/slices/usersSlices.js';

const AddressManageScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.users.userAuth);
    const listAddressOfUser = useSelector(state => state.users.listAddressOfUser);
    const addressDefault = useSelector(state => state.users.addressDefault);

    const getDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const url = `${baseUrl}/address/getAddressOfCurrentUser`;
            const res = await axios.get(url, config);
            dispatch(setListAddressOfUser(res.data.data));
            for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].isDefault === true) {
                    dispatch(setAddressDefault(res.data.data[i]));
                }
            }
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
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={IMAGES.back_icon} style={styles.back_button} />
                </TouchableOpacity>
                <Text style={styles.title_header}>Địa chỉ đã lưu</Text>
            </View>

            <ScrollView style={styles.container_body}>
                <View style={styles.container_item}>
                    <Text style={styles.title_item}>ĐỊA CHỈ MẶC ĐỊNH</Text>
                    <View style={styles.space} />
                    <View style={styles.item_selected}>
                        <Image source={IMAGES.address_icon} style={styles.icon} />
                        {
                            addressDefault.detail === undefined ? (
                                <Text style={styles.text_content} numberOfLines={3}>Chưa chọn địa chỉ mặc định</Text>
                            ) : (
                                <Text style={styles.text_content} numberOfLines={3}>
                                    {
                                        (addressDefault.detail) ? addressDefault.detail + ", " + addressDefault.addressString : addressDefault.addressString
                                    }
                                </Text>
                            )
                        }
                    </View>
                </View>
                <View style={styles.space} />

                <View style={styles.container_header_list}>
                    <Text style={styles.title_list}>DANH SÁCH ĐỊA CHỈ ĐÃ LƯU</Text>
                </View>

                <ScrollView style={styles.list}>
                    {
                        listAddressOfUser.map((item, index) => {
                            if (item.isDefault === false) {
                                return (
                                    <ItemAddress key={index} item={item} index={index} getDataAPI={getDataAPI} />
                                )
                            }
                        })
                    }
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddressManageScreen