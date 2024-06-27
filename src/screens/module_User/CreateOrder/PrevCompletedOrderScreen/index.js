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
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../../assets/images';
import storage from '@react-native-firebase/storage';
import baseUrl from '../../../../constants/baseUrl';
import VehicleItemPrevOrder from './VehicleItemPrevOrder';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import formatCurrencyVND from '../../../../utils/formatCurrencyVND';
import {refreshOrder} from '../../../../redux/slices/createOrderSlice';
import VoucherItemPrevOrder from './VoucherItemPrevOrder';

const PrevCompletedOrderScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const state = useSelector(state => state.createOrder);
  const userAuth = useSelector(state => state.users.userAuth);
  const dispatch = useDispatch();
  const [distance, setDistance] = useState(0);
  const [estimateTime, setEstimateTime] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [charge, setCharge] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };
  useFocusEffect(
    React.useCallback(() => {
      scrollToTop();
      return () => {};
    }, []),
  );
  const getEstimate = async () => {
    try {
      const apiLink = `https://api.tomtom.com/routing/1/calculateRoute/${state.sourceAddress.latitude},${state.sourceAddress.longitude}:${state.destinationAddress.latitude},${state.destinationAddress.longitude}/json?key=QaDHsyMVJAx8DeAIGLvYbciKZpHEh9on`;

      const response = await axios.get(apiLink);
      const data = response.data;

      let distance = (data.routes[0].summary.lengthInMeters * 1.0) / 1000;
      distance = Number(distance.toFixed(1));
      let estimateTime =
        (data.routes[0].summary.travelTimeInSeconds * 1.0) / 3600;
      estimateTime = Number(estimateTime.toFixed(2));
      const minLength = state.vehicleType.minLength;
      const minPrice = state.vehicleType.minPrice;

      let charge =
        distance > minLength
          ? minPrice + (distance - minLength) * state.vehicleType.priceAddIfOut
          : minPrice;
      charge = Number(charge.toFixed(0));

      if (state.voucher._id) {
        let discount = 0;
        if (state.voucher.isPercent) {
          discount = ((state.voucher.voucherPrice * 1.0) / 100) * charge;
          discount = Number(discount.toFixed(0));
        } else {
          discount = state.voucher.voucherPrice;
        }

        setDiscountPrice(discount);
      }

      setEstimateTime(estimateTime);
      setCharge(charge);
      setDistance(distance);
    } catch (error) {}
  };
  useEffect(() => {
    getEstimate();
  }, [
    state.sourceAddress,
    state.destinationAddress,
    state.vehicleType,
    state.voucher,
  ]);
  const handleClickCreateOrder = async () => {
    setLoading(true);
    const uid = new Date().getTime();
    const reference = storage().ref(`/images/img_${uid}`);

    let url;
    if (state.goodsImage) {
      await reference.putFile(state.goodsImage);
      url = await reference.getDownloadURL();
    }

    const sourceAddress = {
      fullName: state.sourceAddress.fullName,
      phoneNumber: state.sourceAddress.phoneNumber,
      addressString: state.sourceAddress.addressString,
      detail: state.sourceAddress.detail,
      latitude: state.sourceAddress.latitude,
      longitude: state.sourceAddress.longitude,
    };
    const destinationAddress = {
      fullName: state.destinationAddress.fullName,
      phoneNumber: state.destinationAddress.phoneNumber,
      addressString: state.destinationAddress.addressString,
      detail: state.destinationAddress.detail,
      latitude: state.destinationAddress.latitude,
      longitude: state.destinationAddress.longitude,
    };
    const order = {
      vehicleType: state.vehicleType._id,
      shortDescription: state.shortDescription,
      sourceAddress: sourceAddress,
      destinationAddress: destinationAddress,
      charge: charge,
      goodsType: state.goodsType,
      goodsImage: url ?? '',
      note: state.note,
      discountPrice: discountPrice,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    if (state.voucher._id) {
      order.voucherId = state.voucher._id;
    }
    const response = await axios.post(
      `${baseUrl}/order/addNewOrder`,
      order,
      config,
    );
    dispatch(refreshOrder());
    setLoading(false);
    navigation.navigate('CompletedOrderScreen');
  };

  const handleClickChooseVoucher = () => {
    navigation.navigate('ChooseVoucherScreen', {
      money: charge,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image
            source={IMAGES.logo2}
            style={{width: 30, height: 30, objectFit: 'cover'}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              fontStyle: 'italic',
              color: '#ff6e27',
            }}>
            LALAMOVE
          </Text>
        </View>
        <View style={{width: 28}}></View>
      </Surface>

      <ScrollView ref={scrollViewRef}>
        <View style={[styles.body, {gap: 16, backgroundColor: 'white'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <View style={{gap: 6}}>
              <Text style={{color: '#333333', fontSize: 15}}>Nhận hàng</Text>
              <Text style={{color: '#333333', fontSize: 20, fontWeight: '700'}}>
                Càng sớm càng tốt
              </Text>
            </View>
            <Image
              source={IMAGES.xemayprevorder}
              style={{width: 80, height: 80, resizeMode: 'cover'}}
            />
          </View>

          <View
            style={[
              {
                backgroundColor: 'white',
                padding: 16,
                paddingBottom: 32,
                borderRadius: 4,
              },
              styles.shadowCard,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
              }}>
              <Icon name="heart" size={24} color="#F16722" />
              <Text style={{color: '#606060', fontWeight: '500', fontSize: 16}}>
                Cảm ơn bạn đã tin tưởng Lalamove
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Icon2 name="van-utility" size={24} color="#F16722" />
              <Text style={{color: '#606060', fontWeight: '500', fontSize: 16}}>
                Xe đã chọn
              </Text>
            </View>
            <View style={{gap: 24}}>
              <VehicleItemPrevOrder />
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
                marginTop: 28,
                marginBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Icon4 name="discount" size={24} color="#F16722" />
                <Text
                  style={{color: '#606060', fontWeight: '500', fontSize: 16}}>
                  Voucher
                </Text>
              </View>
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Pressable onPress={handleClickChooseVoucher}>
                  <View
                    style={{
                      backgroundColor: '#F16722',
                      paddingHorizontal: 10,
                      paddingLeft: 16,
                      paddingVertical: 6,
                    }}>
                    <Text style={{color: 'white', fontWeight: 500}}>
                      Chọn voucher
                    </Text>
                  </View>
                </Pressable>
                <View
                  style={{
                    position: 'absolute',
                    right: -32,
                    top: 0,
                    bottom: 0,
                    borderWidth: 16,
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderLeftColor: '#F16722',
                  }}></View>
              </View>
            </View>
            {state.voucher._id && (
              <View style={{gap: 24}}>
                <VoucherItemPrevOrder />
              </View>
            )}

            <View style={{marginTop: 24}}>
              <View style={{marginLeft: 24, gap: 24}}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                  }}>
                  <Icon2 name="map-marker-distance" size={24} color="#6F6F6F" />
                  <Text style={{color: '#606060', fontSize: 15}}>
                    Quãng đường vận chuyển: {distance} km
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                  }}>
                  <Icon2
                    name="clock-time-eleven-outline"
                    size={24}
                    color="#6F6F6F"
                  />
                  <Text style={{color: '#606060', fontSize: 15}}>
                    Ước tính giao hàng trong:{' '}
                    {estimateTime < 1
                      ? `${(estimateTime * 60).toFixed(0)} phút`
                      : `${estimateTime} giờ`}{' '}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                  }}>
                  <Icon3
                    name="dollar"
                    size={20}
                    color="#6F6F6F"
                    style={{marginLeft: 4}}
                  />
                  <Text style={{color: '#606060', fontSize: 15}}>
                    Tổng tiền: {formatCurrencyVND(charge)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                  }}>
                  <Icon3
                    name="dollar"
                    size={20}
                    color="#6F6F6F"
                    style={{marginLeft: 4}}
                  />
                  <Text style={{color: '#606060', fontSize: 15}}>
                    Tiền giảm: {formatCurrencyVND(discountPrice)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                  }}>
                  <Icon3
                    name="dollar"
                    size={20}
                    color="#6F6F6F"
                    style={{marginLeft: 4}}
                  />
                  <Text style={{color: '#606060', fontSize: 15}}>
                    Tiền thanh toán: {formatCurrencyVND(charge - discountPrice)}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable onPress={handleClickCreateOrder}>
              <View
                style={{
                  backgroundColor: '#F16722',
                  height: 45,
                  marginHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginTop: 32,
                }}>
                <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                  Tiếp tục
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#FF5900" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PrevCompletedOrderScreen;
