import { View, Text, Keyboard, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './style.js';
import React, { useState } from 'react';
import { IMAGES } from '../../../../../assets/images/index.js';
import CUSTOM_COLOR from '../../../../../constants/colors.js';
import Input from '../../../../../components/Input.js';
import MyButton from '../../../../../components/MyButton.js';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale } from 'react-native-size-matters';
import FONT_FAMILY from '../../../../../constants/font.js';
import { numbersOnly } from '../../../../../constants/validate.js';
import { addVoucherAction } from '../../../../../redux/slices/voucherSlices.js';


const VoucherForm = ({ navigation, route }) => {
    const { type, item } = route.params
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showchosenType, setShowchosenType] = useState(false)

    const formatDateString = (date) => {
        const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate || date;
            console.log(currentDate)
            setDate(currentDate);
            // toggleDatePicker();
            handleError(null, 'startDate')

            handleOnchange(formatDateString(currentDate), "startDate");

        }
        else {
            toggleDatePicker();
        }
    }
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    const onChange2 = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate || date;
            console.log(currentDate)
            setDate2(currentDate);
            // toggleDatePicker();
            handleError(null, 'expiredDate')
            handleOnchange(formatDateString(currentDate), "expiredDate");
        }
        else {
            toggleDatePicker2();
        }
    }
    const toggleDatePicker2 = () => {
        setShowPicker2(!showPicker2);
    }
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        voucherCode: item?.voucherCode ?? '',
        voucherPrice: item?.voucherPrice ?? '',
        isPercent: item?.isPercent ?? false,
        minPrice: item?.minPrice ?? '',
        quality: item?.quality ?? '',
        applyFor: item?.applyFor ?? '',
        description: item?.description ?? '',
        startDate: item?.startDate ?? '',
        expiredDate: item?.expiredDate ?? '',

    });
    const [date, setDate] = useState(new Date);
    const [date2, setDate2] = useState(new Date);

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
        if (!inputs.voucherCode) {
            handleError('Làm ơn nhập mã khuyến mãi', 'voucherCode');
            isValid = false;
        }
        if (!inputs.voucherPrice) {
            handleError('Làm ơn nhập mệnh giá', 'voucherPrice');
            isValid = false;
        } else if (!numbersOnly(inputs.voucherPrice)) {
            handleError('Sai định dạng', 'voucherPrice');
            isValid = false;
        } else if (parseInt(inputs.voucherPrice) <= 0) {
            handleError('Mệnh giá phải lớn hơn 0', 'voucherPrice');
            isValid = false;
        }
        if (!inputs.minPrice) {
            handleError('Làm ơn nhập giá tối thiểu', 'minPrice');
            isValid = false;
        } else if (!numbersOnly(inputs.minPrice)) {
            handleError('Sai định dạng', 'minPrice');
            isValid = false;
        } else if (parseInt(inputs.minPrice) < 0) {
            handleError('Giá tối thiểu phải dương', 'minPrice');
            isValid = false;
        }
        if (!inputs.quality) {
            handleError('Bắt buộc', 'quality');
            isValid = false;
        } else if (!numbersOnly(inputs.quality)) {
            handleError('Sai định dạng', 'quality');
            isValid = false;
        } else if (parseInt(inputs.quality) <= 0) {
            handleError('Sai định dạng', 'quality');
            isValid = false;
        }
        if (!inputs.startDate) {
            handleError('Bắt buộc', 'startDate');
            isValid = false;
        }
        if (!inputs.expiredDate) {
            handleError('Bắt buộc', 'expiredDate');
            isValid = false;
        }
        if (!inputs.applyFor) {
            handleError('Làm ơn nhập áp dụng cho', 'applyFor');
            isValid = false;
        }
        if (!inputs.description) {
            handleError('Làm ơn nhập mô tả', 'description');
            isValid = false;
        }
        if (isValid) {
            console.log('isValid')
            try {
                const pl = {
                    bd: {
                        voucherCode: inputs?.voucherCode,
                        voucherPrice: inputs?.voucherPrice,
                        isPercent: inputs?.isPercent ?? false,
                        minPrice: inputs?.minPrice,
                        quality: inputs?.quality,
                        applyFor: inputs?.applyFor,
                        description: inputs?.description,
                        startDate: formatDob(inputs?.startDate),
                        expiredDate: formatDob(inputs?.expiredDate),
                    },
                    navigation: navigation,
                }
                console.log(pl)
                dispatch(addVoucherAction(pl));
            } catch (error) {
                console.log(error)
            }

        }
    };
    function formatDob(val) {
        let [day, month, year] = val.split('/');
        let date = new Date(`${year}-${month}-${day}`);

        // Format the date into ISO 8601 format without milliseconds
        return date.toISOString().split('.')[0];
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
                    opacity: 1,
                    backgroundColor: '#fff',
                    width: '100%'
                }}>

                <ScrollView style={{ marginTop: 0, width: '100%', height: '70%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'voucherCode')}
                        onFocus={() => handleError(null, 'voucherCode')}
                        label="Mã khuyến mãi"
                        placeholder="KHACHHANGMOI"
                        defaultValue={inputs.voucherCode}
                        error={errors.voucherCode}
                    />
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 3, marginRight: 20 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'voucherPrice')}
                                onFocus={() => handleError(null, 'voucherPrice')}
                                label="Mệnh giá"
                                placeholder={inputs?.isPercent ? "30 %" : "50.000 VNĐ"}
                                defaultValue={inputs.voucherPrice}
                                error={errors.voucherPrice}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                marginVertical: 5,
                                fontSize: 14,
                                color: '#2F394E',
                                marginBottom: 12
                            }}>Theo %</Text>

                            <Checkbox
                                status={inputs?.isPercent ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    handleOnchange(!inputs?.isPercent, 'isPercent')
                                }}
                            />

                        </View>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 2, marginRight: 20 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'minPrice')}
                                onFocus={() => handleError(null, 'minPrice')}
                                label="Giá trị tốt thiếu"
                                placeholder="150.000 VNĐ"
                                defaultValue={inputs.minPrice}
                                error={errors.minPrice}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                onChangeText={text => handleOnchange(text, 'quality')}
                                onFocus={() => handleError(null, 'quality')}
                                label="Số lượng"
                                placeholder="500"
                                defaultValue={inputs.quality}
                                error={errors.quality}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 20 }}>
                            <TouchableOpacity onPress={toggleDatePicker}>
                                <Input
                                    onChangeText={text => handleOnchange(text, 'startDate')}
                                    onFocus={() => handleError(null, 'startDate')}
                                    label="Ngày bắt đầu"
                                    editable={false}
                                    value={inputs.startDate}
                                    placeholder="DD/MM/YYYY"
                                    error={errors.startDate}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={toggleDatePicker2}>
                                <Input
                                    onChangeText={text => handleOnchange(text, 'expiredDate')}
                                    onFocus={() => handleError(null, 'expiredDate')}
                                    label="Ngày hết hạn"
                                    editable={false}
                                    value={inputs.expiredDate}
                                    placeholder="DD/MM/YYYY"
                                    error={errors.expiredDate}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showPicker && <DateTimePicker mode="date" value={date} display="spinner" onChange={onChange} />}
                    {showPicker2 && <DateTimePicker mode="date" value={date2} display="spinner" onChange={onChange2} />}
                    <Input
                        onChangeText={text => handleOnchange(text, 'applyFor')}
                        onFocus={() => handleError(null, 'applyFor')}
                        label="Áp dụng cho"
                        placeholder={inputs.applyFor === '' ? "Áp dụng cho" : inputs.applyFor}
                        error={errors.applyFor}
                        enalble={true}
                        c={'white'}
                        dropdown
                        showMd={() => { setShowchosenType(true) }}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'description')}
                        onFocus={() => handleError(null, 'description')}
                        label="Mô tả khuyến mãi"
                        placeholder="Khuyến mãi mừng quốc tế thiếu nhi"
                        multiline={true}
                        numLines={2}
                        numberOfLines={5}
                        defaultValue={inputs.description}
                        error={errors.description}
                    />


                </ScrollView>



                <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', }}>
                    <MyButton text={'Gửi'} onPress={validate} />
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
                <TouchableOpacity onPress={() => { setShowchosenType(false); handleError(null, 'applyFor') }} style={{ margin: 20 }}>
                    <Image source={IMAGES.close} style={{ width: 20, height: 20, }} />
                </TouchableOpacity>
                <FlatList
                    style={{ padding: 20 }}
                    data={[
                        {
                            id: 1,
                            applyFor: 'Khách hàng mới',
                            des: 'Khách hàng mới chưa có đơn hàng nào'
                        },
                        {
                            id: 2,
                            applyFor: 'Khách hàng trung thành',
                            des: 'Khách hàng có trên 5 đơn hàng trong 3 tháng gần nhất'

                        },
                        {
                            id: 3,
                            applyFor: 'Khách hàng tiềm năng',
                            des: 'Khách hàng trên 3 đơn trong 1 tháng gần đây.'
                        }
                    ]}
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
                            borderColor: inputs.applyFor === item.applyFor ? CUSTOM_COLOR.Primary : '#C3C7E5'
                        }}
                        onPress={() => {
                            handleOnchange(item.applyFor, 'applyFor')
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
                                }}>{item?.applyFor}</Text>
                                <Text style={{
                                    fontSize: scale(16),
                                    fontWeight: '400',
                                    fontFamily: FONT_FAMILY.Light, color: '#8D929C'
                                }}>{item?.des}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>}
                />

            </View>


        </View>
    );
};

export default VoucherForm;