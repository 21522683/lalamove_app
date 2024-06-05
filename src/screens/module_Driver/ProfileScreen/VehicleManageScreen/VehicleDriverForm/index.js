import { View, Text, Keyboard, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IMAGES } from '../../../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../../../constants/colors.js';
import Input from '../../../../../components/Input.js';
import MyButton from '../../../../../components/MyButton.js';
import { scale } from 'react-native-size-matters';
import FONT_FAMILY from '../../../../../constants/font.js';
import { Promise } from "bluebird";
import { useDispatch, useSelector } from 'react-redux';
import { updateDriverInforAction } from '../../../../../redux/slices/usersSlices.js';
import storage from '@react-native-firebase/storage';


const VehicleDriverForm = ({ navigation, route }) => {
    const { type, item } = route.params
    const [vehicleImg, setVehicleImg] = useState(item?.vehicleImage ?? '')
    const [cavetImg, setCavetImg] = useState(item?.cavetImage ?? '')
    const [showBs, setShowBs] = useState(false)
    const [showchosenType, setShowchosenType] = useState(false)
    const vehicleTypes = useSelector(state => state?.users?.vehicleTypes)
    const dispatch = useDispatch();

    const [typeImg, setTypeImg] = useState('')
    const [inputs, setInputs] = useState({
        lisencePlate: item?.lisencePlate ?? '',
        vehicleName: item?.vehicleName ?? '',
        vehicleType: item?.vehicleType?.vehicleTypeName ?? '',
        cavetText: item?.cavetText ?? '',
        vehicleImage: '',
        cavetImage: '',
        vehicleTypeId: item?.vehicleType?.id ?? '',
    });
    const pickImg = () => {
        let options = {
            storageOptions: {
                path: 'image'
            }
        }
        launchImageLibrary(options, response => {
            if (!!response.assets) {
                if (typeImg === 'vehicleImg') {
                    setVehicleImg(response.assets[0].uri);
                    setTypeImg('');
                }
                if (typeImg === 'cavetImg') {
                    setCavetImg(response.assets[0].uri);
                    setTypeImg('');
                }
                setShowBs(false)
            } else return;
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
    async function uploadImg(file, type, name) {
        try {
            if (file.startsWith('file:')) {
                if (type) {
                    try {
                        let imageRef = storage().refFromURL(type);
                        await imageRef.delete();
                    } catch (error) {
                        console.log(error)
                    }
                }
                const uid = Date.now();
                const reference = storage().ref(`/images/img_${name}_${uid}`);

                await reference.putFile(file);
                const url = await reference.getDownloadURL();
                console.log(url)
                return url;

            } else {
                return file;
            }
        } catch (error) {
            console.log(error);
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
            handleError('Làm ơn nhập biển số', 'lisencePlate');
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
        console.log(vehicleImg, cavetImg)
        if (vehicleImg === '' || cavetImg === '') {
            handleError('Làm ơn nhập hình ảnh', 'img');
            isValid = false;
        }
        if (isValid) {
            const [a, b] = await Promise.all([
                uploadImg(vehicleImg, item?.vehicleImage, inputs.lisencePlate),
                uploadImg(cavetImg, item?.cavetImage, inputs.cavetText),
            ])
            const pl = {
                bd: {
                    action: type + ' vehicle',
                    data: {
                        id: item?.id,
                        vehicleName: inputs?.vehicleName,
                        lisencePlate: inputs?.lisencePlate,
                        cavetText: inputs?.cavetText,
                        cavetImage: b,
                        vehicleImage: a,
                        vehicleType: inputs?.vehicleTypeId
                    }
                },
                navigation: navigation,
                type:'vehicles'
            }
            dispatch(updateDriverInforAction(pl));
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
                <ScrollView style={{ marginTop: 10, width: '100%', height: '70%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'lisencePlate')}
                        onFocus={() => handleError(null, 'lisencePlate')}
                        label="Biển số phương tiện"
                        placeholder="99X8-98765"
                        defaultValue={inputs.lisencePlate}
                        error={errors.lisencePlate}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'vehicleName')}
                        onFocus={() => handleError(null, 'vehicleName')}
                        label="Tên phương tiện"
                        placeholder="Nhập tên phương tiện"
                        defaultValue={inputs.vehicleName}
                        error={errors.vehicleName}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'vehicleType')}
                        onFocus={() => handleError(null, 'vehicleType')}
                        label="Loại phương tiện"
                        placeholder={inputs.vehicleType === '' ? "Loại phương tiện" : inputs.vehicleType}
                        error={errors.vehicleType}
                        enalble={true}
                        defaultValue={inputs.vehicleType}
                        c={'white'}
                        dropdown
                        showMd={() => { setShowchosenType(true) }}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'cavetText')}
                        onFocus={() => handleError(null, 'cavetText')}
                        label="Số đăng ký phương tiện"
                        placeholder="XXXXXX"
                        defaultValue={inputs.cavetText}
                        error={errors.cavetText}
                    />
                    <Text style={{ fontSize: 14, marginVertical: 5, color: '#2F394E', marginBottom: 10 }}>Ảnh phương tiện của bạn với biển số xe</Text>

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
                        <View style={{ flexDirection: 'row', flex: 1, height: 250, padding: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: '90%', alignItems: 'center', marginHorizontal: 5, justifyContent: 'center' }}>
                                {
                                    vehicleImg == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '30%',
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

                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, marginVertical: 5, color: '#2F394E', marginBottom: 10 }}>Ảnh đăng ký xe</Text>

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
                        <View style={{ flexDirection: 'row', flex: 1, height: 250, padding: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: '90%', alignItems: 'center', marginHorizontal: 5, justifyContent: 'center' }}>
                                {
                                    cavetImg == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '30%',
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

export default VehicleDriverForm;