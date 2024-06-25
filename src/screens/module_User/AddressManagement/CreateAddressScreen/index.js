import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {Surface} from 'react-native-paper';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {GetCoordinatesFromInfo} from '../../../../utils/opencagedata';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CreateAddressScreen = () => {
  const CustomLayoutSpring = {
    ...LayoutAnimation.Presets.easeInEaseOut,
    duration: 120,
  };
  LayoutAnimation.configureNext(CustomLayoutSpring);
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    province: '',
    district: '',
    ward: '',
  });
  const dispatch = useDispatch();
  const handleClickReset = () => {
    setAddress({
      province: '',
      provinceId: '',
      district: '',
      districtId: '',
      ward: '',
      wardId: '',
    });
  };
  const getAPI = async () => {
    const link =
      address.province === ''
        ? 'https://vapi.vnappmob.com/api/province'
        : address.district === ''
        ? `https://vapi.vnappmob.com/api/province/district/${address.provinceId}`
        : `https://vapi.vnappmob.com/api/province/ward/${address.districtId}`;
    console.log(link);
    const response = await fetch(link);

    const data = await response.json();
    setListDataAPI(data.results);
    setListDataAPIOrigin(data.results);
  };
  const [listDataAPI, setListDataAPI] = useState([]);
  const [listDataAPIOrigin, setListDataAPIOrigin] = useState([]);
  useEffect(() => {
    getAPI();
  }, [address]);

  const handleClickDataItem = item => {
    if (address.province === '') {
      setAddress(prev => ({
        ...prev,
        province: item.province_name,
        provinceId: item.province_id,
      }));
    } else if (address.district === '') {
      setAddress(prev => ({
        ...prev,
        district: item.district_name,
        districtId: item.district_id,
      }));
    } else
      setAddress(prev => ({
        ...prev,
        ward: item.ward_name,
        wardId: item.ward_id,
      }));
  };
  function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normalize to remove diacritics
    str = str.replace(/đ/g, 'd');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  const handleChangeTextSearch = searchString => {
    setListDataAPI(prev =>
      listDataAPIOrigin.filter(item => {
        let current =
          address.province === ''
            ? item.province_name
            : address.district === ''
            ? item.district_name
            : item.ward_name;
        current = removeVietnameseTones(current).toLowerCase().trim();
        searchString = removeVietnameseTones(searchString).toLowerCase().trim();
        return current.includes(searchString);
      }),
    );
  };
  const handleSaveXYZ = () => {
    const {province, ward, district} = address;
    const addressFormCreate = {province, ward, district};
    console.log(addressFormCreate);
    navigation.setParams({addressFormCreate});
    navigation.goBack();
  };
  const handleClickContinue = async () => {
    if (!address.ward) return;
    try {
      const {latitude, longitude} = await GetCoordinatesFromInfo(
        address.ward,
        address.district,
        address.province,
      );

      navigation.navigate('ChooseMapScreen2', {
        ok: {
          latitude,
          longitude,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn địa chỉ</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View
        style={[styles.body, {gap: 16, backgroundColor: '#f5f5f5', flex: 1}]}>
        <View style={styles.search_container}>
          <Icon name="search1" size={20} color="#BDBDBD" />
          <TextInput
            placeholder="Tìm kiếm địa chỉ..."
            onChangeText={handleChangeTextSearch}
            style={styles.search_input}></TextInput>
        </View>
        {address.province === '' && (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              backgroundColor: 'white',
              paddingVertical: 12,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#DDDDDD',
              borderRadius: 4,
            }}>
            <Icon2 name="location-dot" color="#F12E22" size={24} />
            <Pressable
              onPress={() => {
                navigation.navigate('ChooseMapScreen');
              }}>
              <Text style={{fontSize: 15, color: '#222222'}}>
                Sử dụng vị trí hiện tại của tôi
              </Text>
            </Pressable>
          </View>
        )}

        {address.province && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 15}}>Khu vực được chọn</Text>
              <Pressable onPress={handleClickReset}>
                <Text style={{fontSize: 15, color: '#E72425'}}>
                  Thiết lập lại
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                {
                  padding: 12,
                  backgroundColor: 'white',
                  marginTop: 12,
                  borderRadius: 4,
                },
                styles.shadowCard,
                {elevation: 2},
              ]}>
              <View
                style={[
                  {flexDirection: 'row', gap: 12},
                  {
                    paddingHorizontal: 8,
                    borderColor: '#dadada',
                    borderRadius: 4,
                  },
                ]}>
                <View style={{alignItems: 'center'}}>
                  <Icon3 name="dot-fill" size={20} color="#D9D9D9" />
                  <View
                    style={{
                      width: 2,
                      height: 18,
                      backgroundColor: '#DADADA',
                    }}></View>
                </View>
                <Text style={{fontSize: 15}}>{address.province}</Text>
              </View>

              <View
                style={[
                  {flexDirection: 'row', gap: 12},
                  {
                    paddingHorizontal: 8,
                    borderColor: '#dadada',
                    borderRadius: 4,
                  },
                  address.district == '' &&
                    address.province !== '' && {
                      paddingVertical: 12,
                      borderWidth: 1,
                      marginTop: 4,
                      alignItems: 'center',
                    },
                ]}>
                {address.province !== '' && (
                  <>
                    <View style={{alignItems: 'center'}}>
                      {address.district == '' ? (
                        <Icon4
                          name="dot-circle-o"
                          size={12}
                          color="#E72425"
                          style={{marginBottom: 4}}
                        />
                      ) : (
                        <View style={{alignItems: 'center'}}>
                          <Icon3 name="dot-fill" size={20} color="#D9D9D9" />
                          <View
                            style={{
                              width: 2,
                              height: 18,
                              backgroundColor: '#DADADA',
                            }}></View>
                        </View>
                      )}
                    </View>
                    <Text style={{fontSize: 15}}>
                      {address.district ? address.district : 'Chọn Quận/Huyện'}
                    </Text>
                  </>
                )}
              </View>
              <View
                style={[
                  {flexDirection: 'row', gap: 12},
                  {
                    paddingHorizontal: 8,
                    borderColor: '#dadada',
                    borderRadius: 4,
                  },
                  address.ward == '' &&
                    address.district !== '' && {
                      paddingVertical: 12,
                      borderWidth: 1,
                      marginTop: 4,
                      alignItems: 'center',
                    },
                ]}>
                {address.district !== '' && (
                  <>
                    <View style={{alignItems: 'center'}}>
                      {address.ward == '' ? (
                        <Icon4
                          name="dot-circle-o"
                          size={12}
                          color="#E72425"
                          style={{marginBottom: 4}}
                        />
                      ) : (
                        <Icon3 name="dot-fill" size={20} color="#D9D9D9" />
                      )}
                    </View>
                    <Text style={{fontSize: 15}}>
                      {address.ward ? address.ward : 'Chọn Xã/Phường'}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}

        {!address.ward && (
          <View style={{marginTop: 8, flex: 1}}>
            <Text style={{fontSize: 15}}>
              {' '}
              {address.province === ''
                ? 'Tỉnh/Thành phố'
                : address.district === ''
                ? 'Quận/Huyện'
                : 'Xã/Phường/Thị trấn'}
            </Text>
            <View
              style={[
                {
                  backgroundColor: 'white',
                  flex: 1,
                  padding: 12,
                  marginTop: 8,
                  borderRadius: 4,
                },
                styles.shadowCard,
                {elevation: 2},
              ]}>
              <FlatList
                // scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                data={listDataAPI}
                contentContainerStyle={{}}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    onPress={() => handleClickDataItem(item)}>
                    <View
                      style={{
                        paddingBottom: 12,
                        paddingTop: index !== 0 ? 12 : 4,
                        borderBottomWidth: 1,
                        borderBottomColor: '#DADADA',
                      }}>
                      <Text style={{fontSize: 15}}>
                        {address.province === ''
                          ? item.province_name
                          : address.district === ''
                          ? item.district_name
                          : item.ward_name}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        )}
        <Pressable onPress={handleClickContinue}>
          <View
            style={{
              backgroundColor: address.ward !== '' ? '#F16722' : '#ccc',
              height: 45,
              marginHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Tiếp tục
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateAddressScreen;
