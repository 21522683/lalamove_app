import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from './style.js';
import { IMAGES } from '../../../../assets/images/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressDefault, setIndexSelectedAddressOfUser } from '../../../../redux/slices/usersSlices.js';
import { ActivityIndicator } from 'react-native-paper';
import baseUrl from '../../../../constants/baseUrl.js';
import axios from 'axios';

const ItemAddress = ({ item, index, getDataAPI }) => {

    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.users.userAuth);
    const listAddressOfUser = useSelector(state => state.users.listAddressOfUser);
    const [loading, setLoading] = useState(false);

    const handeClickSetDefault = async () => {
        dispatch(setIndexSelectedAddressOfUser(index));
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const url = `${baseUrl}/address/set-address-default/${listAddressOfUser[index]._id}`;
            const id = item.user;
            const data = {
                userId: id,
            }
            console.log("data: ", data);
            const res = await axios.put(url, data, config);
            dispatch(setAddressDefault(res.data));
            getDataAPI();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Authorization': `Bearer ${userAuth.access_token}`,
                    'Content-Type': 'application/json',
                },
            };
            const url = `${baseUrl}/address/delete-address-saved/${listAddressOfUser[index]._id}`;
            await axios.delete(url, config);
            getDataAPI();
            setLoading(false);
            Alert.alert("Thông báo", "Xóa thành công địa chỉ này");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleClickDelete = () => {
        dispatch(setIndexSelectedAddressOfUser(index));
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this address?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: handleDelete,
                },
            ],
            { cancelable: false }
        );
    }



    return (
        <View style={styles.container_item_list}>
            {
                loading ? (
                    <View style={[styles.containerLoading, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#FF5900" />
                    </View>
                ) : (
                    <>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button_change} onPress={handeClickSetDefault}>
                            <Image source={IMAGES.address_icon} style={styles.icon} />
                            <Text style={styles.text_change}>Chọn mặc định</Text>
                        </TouchableOpacity>
                        <Text style={styles.text_content_item_list} numberOfLines={3}>
                            {
                                (item.detail) ? item.detail + ", " + item.addressString : item.addressString
                            }
                        </Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button_more} onPress={handleClickDelete}>
                            <Text style={styles.icon_more}>Xóa</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
    )
}

export default ItemAddress