import { View, Text, Keyboard, ScrollView, TouchableOpacity, Image, PermissionsAndroid, FlatList } from 'react-native';
import styles from './style.js';
import React, { useState, useRef } from 'react';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import { IMAGES } from '../../../assets/images/index.js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CUSTOM_COLOR from '../../../constants/colors.js';
import FONT_FAMILY from '../../../constants/font.js';
import { scale } from 'react-native-size-matters';

const Step3Screen = ({ navigation }) => {
    const [driverLisenceImage, setDriverLisenceImage] = useState('')
    const [avatarImg, setAvatarImg] = useState('')
    const [CCCDImage, setCCCDImage] = useState('')
    const [showBs, setShowBs] = useState(false)
    const [typeImg, setTypeImg] = useState('')
    const [inputs, setInputs] = useState({
        driverLisenceNumber: '',
        driverLisenceImage: '',
        driverLisenceType: '',
        CCCDImage: '',
        avatarImg: '',
    });
    const pickImg = () => {
        let options = {
            storageOptions: {
                path: 'image'
            }
        }
        launchImageLibrary(options, response => {
            if (typeImg === 'cccd') {
                setCCCDImage(response.assets[0].uri);
                setTypeImg('');
            }
            if (typeImg === 'avt') {
                setAvatarImg(response.assets[0].uri);
                setTypeImg('');
            }
            if (typeImg === 'dlimg') {
                setDriverLisenceImage(response.assets[0].uri);
                setTypeImg('');
            }
            setShowBs(false)
        })
    }
    const pickImgFromCamera = async () => {
        try {
            let options = {
                storageOptions: {
                    path: 'image'
                }
            }
            const result = await launchCamera({ mediaType: 'photo' })

            console.log(result)

        } catch (e) {
            console.log(e)
        }
    }
    const [errors, setErrors] = useState({});
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.driverLisenceNumber) {
            handleError('Please input driverLisenceNumber', 'driverLisenceNumber');
            isValid = false;
        }
        if (!inputs.driverLisenceType) {
            handleError('Please input driverLisenceType', 'driverLisenceType');
            isValid = false;
        }
        if (CCCDImage === '' || avatarImg === '' || driverLisenceImage === '') {
            handleError('Please input image', 'img');
            isValid = false;
        }
        if (isValid) {
            navigation.navigate('Step3')
        }
    };

    return (
        <View style={{
            ...styles.container, paddingHorizontal: 0,
            paddingVertical: 0,
        }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    opacity: showBs ? 0.8 : 1,
                    backgroundColor: '#fff',
                    width: '100%'
                }}>
                <Text style={{ ...styles.subText, marginTop: 0, marginBottom: 10 }}>Bước 3:</Text>
                <Text style={styles.titleText}>Thêm một số thông tin thêm</Text>
                <ScrollView style={{ marginTop: 10, width: '100%', height: '70%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'driverLisenceNumber')}
                        onFocus={() => handleError(null, 'driverLisenceNumber')}
                        label="Số giấy phép lái xe"
                        placeholder="cxxxxxx"
                        error={errors.driverLisenceNumber}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'driverLisenceType')}
                        onFocus={() => handleError(null, 'driverLisenceType')}
                        label="Bằng loại"
                        placeholder="A1"
                        error={errors.driverLisenceType}
                    />

                    <Text style={{ fontSize: 14, marginVertical: 5, color: '#2F394E' }}>Thêm một vài tài liệu</Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F2F2F2',
                            borderRadius: 4,
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            setTypeImg('dlimg');
                            setShowBs(true);
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 70, padding: 10, }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: 50, alignItems: 'center', marginHorizontal: 5 }}>
                                {
                                    driverLisenceImage == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '70%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                        : <Image source={{ uri: driverLisenceImage }} style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                }
                            </View>
                            <View style={{ flex: 5, height: '100%', justifyContent: 'center', marginHorizontal: 6, alignItems: 'flex-start' }}>
                                <Text style={{ ...styles.btnTAText, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Bằng lái xe</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F2F2F2',
                            borderRadius: 4,
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5,
                        }}
                        onPress={() => {
                            setTypeImg('cccd');
                            setShowBs(true);
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 70, padding: 10, }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: 50, alignItems: 'center', marginHorizontal: 5 }}>
                                {
                                    CCCDImage == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '70%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                        : <Image source={{ uri: CCCDImage }} style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                }
                            </View>
                            <View style={{ flex: 5, height: '100%', justifyContent: 'center', marginHorizontal: 6, alignItems: 'flex-start' }}>
                                <Text style={{ ...styles.btnTAText, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>CCCD (Mặt trước)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F2F2F2',
                            borderRadius: 4,
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 5,
                        }}
                        onPress={() => {
                            setTypeImg('avt');
                            setShowBs(true);
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 70, padding: 10, }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: 50, alignItems: 'center', marginHorizontal: 5 }}>
                                {
                                    avatarImg == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '70%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                        : <Image source={{ uri: avatarImg }} style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                }
                            </View>
                            <View style={{ flex: 5, height: '100%', justifyContent: 'center', marginHorizontal: 6, alignItems: 'flex-start' }}>
                                <Text style={{ ...styles.btnTAText, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Ảnh chân dung</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {errors.img && (
                        <Text style={{ marginTop: 7, color: CUSTOM_COLOR.Primary, fontSize: 14 }}>
                            {errors.img}
                        </Text>
                    )}
                </ScrollView>



                <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
                    <MyButton text={'Gửi'} onPress={validate} />
                </View>
            </View>

            <TouchableOpacity onPress={() => { setShowBs(false) }}
                style={{
                    backgroundColor: '#ccc',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    opacity: 0.4,
                    display: showBs ? 'flex' : 'none'
                }} />
            <View style={{ ...styles.bottomSheet, display: showBs ? 'flex' : 'none', zIndex: 11, alignItems: 'center' }}>
                <View style={{ width: '80%', marginTop: 35, marginHorizontal: 20 }}>
                    <MyButton text={'Sử dụng camera'} onPress={() => { pickImgFromCamera(); }} />

                </View>
                <View style={{ width: '80%', marginTop: 15, marginHorizontal: 20 }}>
                    <MyButton text={'Sử dụng thư viện'} onPress={pickImg} />
                </View>

            </View>

        </View>
    );
};

export default Step3Screen;