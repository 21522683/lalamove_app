import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../../assets/images';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAddVehicleTypeSuccess,
  setInforText,
} from '../../../../redux/slices/vehicleTypeAdmin';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';
import storage from '@react-native-firebase/storage';

const DetaiVehicleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const vehicleType = useSelector(state => state.vehicleTypeAdmin.vehicleType);
  const isEdit = useSelector(state => state.vehicleTypeAdmin.isEdit);
  const userAuth = useSelector(state => state.users.userAuth);

  const vehicleTypes = useSelector(
    state => state.vehicleTypeAdmin.vehicleTypes,
  );
  const [isExists, setExists] = useState(false);
  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 500,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log(response.error);
        return;
      }
      dispatch(
        setInforText({
          name: 'image',
          text: response.assets[0].uri,
        }),
      );
    });
  };

  const isContinue = useMemo(() => {
    return Object.keys(vehicleType).every(key => {
      if (key === 'image') return true;
      if (!vehicleType[key]) return false;
      else return true;
    });
  }, [vehicleType]);

  const handleEditVehicleType = async () => {
    const isExists = vehicleTypes.some(
      item =>
        item._id !== vehicleType._id &&
        item.vehicleTypeName === vehicleType.vehicleTypeName,
    );
    if (isExists) {
      setExists(true);
      return;
    }

    const uid = new Date().getTime();
    const reference = storage().ref(`/images/img_${uid}`);

    let url;
    if (vehicleType.image) {
      await reference.putFile(vehicleType.image);
      url = await reference.getDownloadURL();
    }
    const body = {...vehicleType};
    body.image = url;
    body.mount = `${vehicleType.mount}kg`;
    body.size = `${vehicleType.size1}cm x ${vehicleType.size2}cm x ${vehicleType.size3}cm`;
    body.minLength = Number(body.minLength);
    body.minPrice = Number(body.minPrice);
    body.priceAddIfOut = Number(body.priceAddIfOut);
    delete body.size1;
    delete body.size2;
    delete body.size3;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.patch(
      `${baseUrl}/vehicle-type/${vehicleType._id}`,
      body,
      config,
    );
    dispatch(setAddVehicleTypeSuccess(true));
    navigation.goBack();
  };
  const handleAddVehicleType = async () => {
    const isExists = vehicleTypes.some(
      item => item.vehicleTypeName === vehicleType.vehicleTypeName,
    );
    if (isExists) {
      setExists(true);
      return;
    }

    const uid = new Date().getTime();
    const reference = storage().ref(`/images/img_${uid}`);

    let url;
    if (vehicleType.image) {
      await reference.putFile(vehicleType.image);
      url = await reference.getDownloadURL();
    }
    const body = {...vehicleType};
    body.image = url;
    body.mount = `${vehicleType.mount}kg`;
    body.size = `${vehicleType.size1}cm x ${vehicleType.size2}cm x ${vehicleType.size3}cm`;
    body.minLength = Number(body.minLength);
    body.minPrice = Number(body.minPrice);
    body.priceAddIfOut = Number(body.priceAddIfOut);
    delete body.size1;
    delete body.size2;
    delete body.size3;
    delete body._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/vehicle-type`, body, config);
    dispatch(setAddVehicleTypeSuccess(true));
    navigation.goBack();
  };
  const handleClickOk = () => {
    if (!isContinue) return;
    if (isEdit) handleEditVehicleType();
    else handleAddVehicleType();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          Chi tiết phương tiện
        </Text>
        <View style={{width: 28}}></View>
      </Surface>

      <ScrollView>
        <View
          style={[
            styles.body,
            {gap: 16, backgroundColor: 'white', paddingBottom: 60},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={
                vehicleType.image ? {uri: vehicleType.image} : IMAGES.xemay
              }
              style={{flex: 1, resizeMode: 'contain', height: 200}}
            />
            <Pressable style={{alignSelf: 'flex-end'}} onPress={selectImage}>
              <Icon2 name="image-edit-outline" size={36} color="#F16722" />
            </Pressable>
          </View>

          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Loại xe
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>
            <View style={[styles.textInputContainer, {width: 220}]}>
              <TextInput
                placeholder="Ex: Xe máy"
                value={vehicleType.vehicleTypeName}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'vehicleTypeName',
                      text: text,
                    }),
                  )
                }
                style={{fontSize: 15, paddingVertical: 0, flex: 1}}></TextInput>
            </View>
            {isExists && (
              <Text style={{color: '#F16722'}}>Loại xe đã tồn tại</Text>
            )}
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Tải trọng tối đa
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>

            <View style={[styles.textInputContainer, {width: 150}]}>
              <TextInput
                placeholder="Ex: 5000"
                keyboardType="numeric"
                value={vehicleType.mount}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'mount',
                      text: text,
                    }),
                  )
                }
                style={{fontSize: 15, paddingVertical: 0, flex: 1}}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>kg</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Kích thước
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <TextInput
                keyboardType="numeric"
                value={vehicleType.size1}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'size1',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 100"
                style={[styles.textInput, {width: 80}]}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>x</Text>
              <TextInput
                keyboardType="numeric"
                value={vehicleType.size2}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'size2',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 100"
                style={[styles.textInput, {width: 80}]}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>x</Text>
              <TextInput
                keyboardType="numeric"
                value={vehicleType.size3}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'size3',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 100"
                style={[styles.textInput, {width: 80}]}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>{'(cm)'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Quãng đường tối thiểu
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>

            <View style={[styles.textInputContainer, {width: 220}]}>
              <TextInput
                keyboardType="numeric"
                value={vehicleType.minLength.toString()}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'minLength',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 500,000"
                style={{fontSize: 15, paddingVertical: 0, flex: 1}}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>km</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Phí gốc cho {vehicleType.minLength ?? 'x'} km
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>

            <View style={[styles.textInputContainer, {width: 220}]}>
              <TextInput
                value={vehicleType.minPrice.toString()}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'minPrice',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 500,000"
                keyboardType="numeric"
                style={{fontSize: 15, paddingVertical: 0, flex: 1}}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>VNĐ</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Cước phí tính thêm /1km
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>

            <View style={[styles.textInputContainer, {width: 220}]}>
              <TextInput
                value={vehicleType.priceAddIfOut.toString()}
                onChangeText={text =>
                  dispatch(
                    setInforText({
                      name: 'priceAddIfOut',
                      text: text,
                    }),
                  )
                }
                placeholder="Ex: 75,000"
                keyboardType="numeric"
                style={{fontSize: 15, paddingVertical: 0, flex: 1}}></TextInput>
              <Text style={{fontSize: 15, color: '#555555'}}>VNĐ</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Phù hợp cho
              </Text>
              <Text style={{fontSize: 16, color: '#F16722', marginLeft: 4}}>
                *
              </Text>
            </View>
            <TextInput
              value={vehicleType.suitableFor}
              placeholder="Ex: Hàng cồng kềnh..."
              multiline={true}
              numberOfLines={6}
              onChangeText={text =>
                dispatch(
                  setInforText({
                    name: 'suitableFor',
                    text: text,
                  }),
                )
              }
              style={styles.inputArea}></TextInput>
          </View>
          <View style={{flexDirection: 'column', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
                Trạng thái
              </Text>
            </View>
            <View style={{width: 220}}>
              <Picker
                mode="dropdown"
                selectedValue={vehicleType.status}
                onValueChange={value =>
                  dispatch(
                    setInforText({
                      name: 'status',
                      text: value,
                    }),
                  )
                }>
                <Picker.Item
                  label={'Đang hoạt động'}
                  value={'Đang hoạt động'}></Picker.Item>
                <Picker.Item
                  label={'Ngừng hoạt động'}
                  value={'Ngừng hoạt động'}></Picker.Item>
              </Picker>
            </View>
          </View>

          {/* <View style={{flexDirection: 'column', gap: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#222222'}}>
              Ghi chú:
            </Text>
            <TextInput
              placeholder="Ex: Ghi chú..."
              multiline={true}
              numberOfLines={6}
              style={styles.inputArea}></TextInput>
          </View> */}

          <Pressable onPress={handleClickOk}>
            <View
              style={{
                backgroundColor: isContinue ? '#F16722' : '#ccc',
                height: 45,
                marginHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginTop: 32,
              }}>
              <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                Lưu
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetaiVehicleScreen;
