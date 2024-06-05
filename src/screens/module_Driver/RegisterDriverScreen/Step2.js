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
import { useSelector } from 'react-redux';

const Step2Screen = ({ navigation, route }) => {
    const [vehicleImg, setVehicleImg] = useState('')
    const [cavetImg, setCavetImg] = useState('')
    const [showBs, setShowBs] = useState(false)
    const [showchosenType, setShowchosenType] = useState(false)
    const vehicleTypes = useSelector(state => state?.users?.vehicleTypes)
    const [typeImg, setTypeImg] = useState('')
    const [inputs, setInputs] = useState({
        lisencePlate: '',
        vehicleName: '',
        vehicleType: '',
        vehicleTypeId: '',
        cavetText: '',
        vehicleImage: '',
        cavetImage: ''
    });
    const pickImg = () => {
        let options = {
            storageOptions: {
                path: 'image'
            }
        }
        try {
            launchImageLibrary(options, response => {
                if (!!response.assets) {
                    if (typeImg === 'vehicleImg') {
                        setVehicleImg(response ? response?.assets[0]?.uri : '');
                        setTypeImg('');
                    }
                    if (typeImg === 'cavetImg') {
                        setCavetImg(response ? response?.assets[0]?.uri : '');
                        setTypeImg('');
                    }
                    setShowBs(false)

                }
                else { return; }
            })
        } catch (error) {
            console.log(error)
        }

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
        if (!inputs.lisencePlate) {
            handleError('Làm ơn nhập biến số phương tiện', 'lisencePlate');
            isValid = false;
        }
        if (!inputs.vehicleName) {
            handleError('Làm ơn nhập tên phương tiện', 'vehicleName');
            isValid = false;
        }
        if (!inputs.vehicleType) {
            handleError('Làm ơn nhập loại phương tiện', 'vehicleType');
            isValid = false;
        }
        if (!inputs.cavetText) {
            handleError('Làm ơn nhập số đăng ký phương tiện', 'cavetText');
            isValid = false;
        }
        if (vehicleImg === '' || cavetImg === '') {
            handleError('Làm ơn nhập hình ảnh', 'img');
            isValid = false;
        }
        // console.log('Photo upload!');


        // }
        // console.log('Photo uploaded successfully!');
        // setImage(null);
        if (isValid) {
            navigation.navigate('Step3', {
                ...route.params,
                vehicleImg,
                cavetImg,
                ...inputs
            })
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
                <Text style={{ ...styles.subText, marginTop: 0, marginBottom: 10 }}>Bước 2:</Text>
                <Text style={styles.titleText}>Thêm thông tin phương tiện</Text>
                <ScrollView style={{ marginTop: 10, width: '100%', height: '70%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'lisencePlate')}
                        onFocus={() => handleError(null, 'lisencePlate')}
                        label="Biển số phương tiện"
                        placeholder="99X8-98765"
                        error={errors.lisencePlate}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'vehicleName')}
                        onFocus={() => handleError(null, 'vehicleName')}
                        label="Tên phương tiện"
                        placeholder="Nhập tên phương tiện"
                        error={errors.vehicleName}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'vehicleType')}
                        onFocus={() => handleError(null, 'vehicleType')}
                        label="Loại phương tiện"
                        placeholder={inputs.vehicleType === '' ? "Loại phương tiện" : inputs.vehicleType}
                        error={errors.vehicleType}
                        enalble={true}
                        c={'white'}
                        dropdown
                        showMd={() => { setShowchosenType(true) }}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'cavetText')}
                        onFocus={() => handleError(null, 'cavetText')}
                        label="Số đăng ký phương tiện"
                        placeholder="XXXXXX"
                        error={errors.cavetText}
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
                            setTypeImg('vehicleImg');
                            setShowBs(true);
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 70, padding: 10, }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: 50, alignItems: 'center', marginHorizontal: 5 }}>
                                {
                                    vehicleImg == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '70%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                        : <Image source={{ uri: vehicleImg }} style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                }
                            </View>
                            <View style={{ flex: 5, height: '100%', justifyContent: 'center', marginHorizontal: 6, alignItems: 'flex-start' }}>
                                <Text style={{ ...styles.btnTAText, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Ảnh phương tiện của bạn với biển số xe</Text>
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
                            setTypeImg('cavetImg');
                            setShowBs(true);
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 70, padding: 10, }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: 50, alignItems: 'center', marginHorizontal: 5 }}>
                                {
                                    cavetImg == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '70%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                        : <Image source={{ uri: cavetImg }} style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }} />
                                }
                            </View>
                            <View style={{ flex: 5, height: '100%', justifyContent: 'center', marginHorizontal: 6, alignItems: 'flex-start' }}>
                                <Text style={{ ...styles.btnTAText, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>Ảnh đăng ký xe</Text>
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
                    <MyButton text={'Tiếp tục'} onPress={validate} />
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
            <View style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: 'white',
                bottom: 0, display: showchosenType ? 'flex' : 'none',
                zIndex: 11,
                height: '100%',
                flexDirection: 'column'

            }}>
                <TouchableOpacity onPress={() => { setShowchosenType(false) }} style={{ margin: 20 }}>
                    <Image source={IMAGES.close} style={{ width: 20, height: 20, }} />
                </TouchableOpacity>
                <FlatList
                    style={{ padding: 20 }}
                    data={vehicleTypes}
                    renderItem={({ item }) => <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 8,
                            borderColor: '#C3C7E5',
                            borderWidth: 1,
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                            borderColor: inputs.vehicleType === item.vehicleTypeName ? CUSTOM_COLOR.Primary : '#C3C7E5'
                        }}
                        onPress={() => {
                            handleOnchange(item.vehicleTypeName, 'vehicleType')
                            handleOnchange(item._id, 'vehicleTypeId')
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 90, padding: 20, }}>
                            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={IMAGES.userAcc} style={{
                                    marginRight: 10,
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain',
                                }} />
                            </View>
                            <View style={{ flex: 3, height: '100%', justifyContent: 'center' }}>
                                <Text style={{
                                    fontSize: scale(16),
                                    fontWeight: '400',
                                    fontFamily: FONT_FAMILY.Light, fontSize: 18, fontWeight: '700', marginBottom: 5
                                }}>{item?.vehicleTypeName}</Text>
                                <Text style={{
                                    fontSize: scale(16),
                                    fontWeight: '400',
                                    fontFamily: FONT_FAMILY.Light, color: '#8D929C'
                                }}>{item?.size}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>}
                />

            </View>
        </View>
    );
};

export default Step2Screen;