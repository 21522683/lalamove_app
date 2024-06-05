import { View, Text, Keyboard, ScrollView, TouchableOpacity, Image, PermissionsAndroid, FlatList } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import Input from '../../../components/Input.js';
import MyButton from '../../../components/MyButton.js';
import { IMAGES } from '../../../assets/images/index.js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CUSTOM_COLOR from '../../../constants/colors.js';
import storage from '@react-native-firebase/storage';
import { Promise } from "bluebird";
import { registerDriverAction } from '../../../redux/slices/usersSlices.js';
import { useDispatch } from 'react-redux';
import Dialog from "react-native-dialog";

const Step3Screen = ({ navigation, route }) => {
    const [driverLisenceImage, setDriverLisenceImage] = useState('')
    const [avatarImg, setAvatarImg] = useState('')
    const [CCCDImage, setCCCDImage] = useState('')
    const [showDialog, setShowDialog] = useState(false);
    const handleLogin = () => {
        setShowDialog(false)
        navigation.navigate('Login')
    }
    const dispatch = useDispatch();

    const [showBs, setShowBs] = useState(false)
    const [typeImg, setTypeImg] = useState('')
    const [inputs, setInputs] = useState({
        driverLisenceNumber: '',
        driverLisenceType: '',
        driverLisenceImageUrl: '',
        CCCDImageUrl: '',
        avatarImgUrl: '',
        vehicleImgUrl: '',
        cavetImgUrl: ''
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
                }
                else return;
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
        if (!inputs.driverLisenceNumber) {
            handleError('Làm ơn nhập số giấy phép lái xe', 'driverLisenceNumber');
            isValid = false;
        }
        if (!inputs.driverLisenceType) {
            handleError('Làm ơn nhập loại bằng lái', 'driverLisenceType');
            isValid = false;
        }
        if (CCCDImage === '' || avatarImg === '' || driverLisenceImage === '') {
            handleError('Làm ơn nhập hình ảnh', 'img');
            isValid = false;
        }
        if (isValid) {
            const [a, b, c, d, e] = await Promise.all([
                uploadImg(route.params.vehicleImg, "vehicleImgUrl", route.params.lisencePlate),
                uploadImg(route.params.cavetImg, "cavetImgUrl", route.params.cavetText),
                uploadImg(CCCDImage, "CCCDImageUrl", route.params.CCCD),
                uploadImg(avatarImg, "avatarImgUrl", 'avt'),
                uploadImg(driverLisenceImage, "driverLisenceImageUrl", inputs.driverLisenceNumber),
            ])
            const pl = {
                phoneNumber: route.params.phoneNumber,
                email: route.params.email,
                userType: "Driver",
                CCCDText: route.params.CCCD,
                address: route.params.address,
                fullName: route.params.fullName,
                dob: formatDob(route.params.birthday),
                driverLisenceNumber: inputs.driverLisenceNumber,
                driverLisenceImage: e,
                driverLisenceType: inputs.driverLisenceType,
                avatar: d,
                CCCDImage: c,
                vehicleName: route.params.vehicleName,
                lisencePlate: route.params.lisencePlate,
                vehicleImage: a,
                cavetImage: b,
                cavetText: route.params.cavetText,
                vehicleTypeId: route.params.vehicleTypeId,
            }
            console.log(pl)
            dispatch(registerDriverAction({
                bd: pl,
                setShowDialog: setShowDialog,
            }));
            // navigation.navigate('Step3')
        }
    };
    function formatDob(val) {
        let [day, month, year] = val.split('/');
        let date = new Date(`${year}-${month}-${day}`);

        // Format the date into ISO 8601 format without milliseconds
        return date.toISOString().split('.')[0];
    }
    async function uploadImg(file, type, name) {
        try {
            const uid = Date.now();
            const reference = storage().ref(`/images/img_${name}_${uid}`);

            await reference.putFile(file);
            const url = await reference.getDownloadURL();
            // console.log(url)
            return url;
        } catch (error) {
            console.log(error);
        }
    }
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
            {
                showDialog && (
                    <Dialog.Container visible={true}>
                        <Dialog.Title>Đã gửi yêu cầu xét duyệt tài khoản</Dialog.Title>
                        <Dialog.Description>
                            Vui lòng chờ admin duyệt tài khoản của bạn. Sẽ có mail gửi đến kết quả cho bạn trong vài ngày.
                        </Dialog.Description>

                        <Dialog.Button label="OK" onPress={handleLogin} />
                    </Dialog.Container>
                )
            }
        </View>
    );
};

export default Step3Screen;