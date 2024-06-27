import { View, Text, Keyboard, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IMAGES } from '../../../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../../../constants/colors.js';
import Input from '../../../../../components/Input.js';
import MyButton from '../../../../../components/MyButton.js';
import storage from '@react-native-firebase/storage';
import { Promise } from "bluebird";
import { updateDriverInforAction } from '../../../../../redux/slices/usersSlices.js';
import { useDispatch } from 'react-redux';


const LicenseDriverForm = ({ navigation, route }) => {
    const { type, item } = route.params
    const [driverLisenceImage, setDriverLisenceImage] = useState(item?.driverLisenceImage ?? '')
    const [showBs, setShowBs] = useState(false)
    const [typeImg, setTypeImg] = useState('')
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        driverLisenceNumber: item?.driverLisenceNumber ?? '',
        driverLisenceImage: item?.driverLisenceImage ?? '',
        driverLisenceType: item?.driverLisenceType ?? '',
    });
    const pickImg = () => {
        let options = {
            storageOptions: {
                path: 'image'
            }
        }
        launchImageLibrary(options, response => {
            if (!!response.assets) {
                if (typeImg === 'dlimg') {
                    setDriverLisenceImage(response.assets[0].uri);
                    setTypeImg('');
                }
                setShowBs(false)
            } else return;
        })
    }
    async function uploadImg(file, type, name) {
        try {
            if (file.startsWith('file:')) {
                // if (type) {
                //     try {
                //         let imageRef = storage().refFromURL(type);
                //         await imageRef.delete();
                //     } catch (error) {
                //         console.log(error)
                //     }
                // }
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
        if (driverLisenceImage === '') {
            handleError('Làm ơn nhập hình ảnh', 'img');
            isValid = false;
        }
        if (isValid) {
            const [a] = await Promise.all([
                uploadImg(driverLisenceImage, item?.driverLisenceImage, inputs.driverLisenceNumber),
            ])
            const pl = {
                bd: {
                    action: type + ' license',
                    data: {
                        id: item?.id,
                        driverLisenceImage: a,
                        driverLisenceNumber: inputs?.driverLisenceNumber,
                        driverLisenceType: inputs?.driverLisenceType
                    }
                },
                navigation: navigation,
                type: 'license'

            }
            console.log(pl)
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

                <ScrollView style={{ marginTop: 0, width: '100%', height: '70%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'driverLisenceNumber')}
                        onFocus={() => handleError(null, 'driverLisenceNumber')}
                        label="Số giấy phép lái xe"
                        placeholder="cxxxxxx"
                        defaultValue={inputs.driverLisenceNumber}
                        error={errors.driverLisenceNumber}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'driverLisenceType')}
                        onFocus={() => handleError(null, 'driverLisenceType')}
                        label="Bằng loại"
                        placeholder="A1"
                        defaultValue={inputs.driverLisenceType}
                        error={errors.driverLisenceType}
                    />

                    <Text style={{ fontSize: 14, marginVertical: 5, color: '#2F394E' }}>Bằng lái xe</Text>

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
                        <View style={{ flexDirection: 'row', flex: 1, height: 250, padding: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, width: 50, borderStyle: 'dashed', borderWidth: 1, borderRadius: 4, height: '90%', alignItems: 'center', marginHorizontal: 5, justifyContent: 'center' }}>
                                {
                                    driverLisenceImage == '' ?
                                        <Image source={IMAGES.plus_icon} style={{
                                            width: '30%',
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

export default LicenseDriverForm;