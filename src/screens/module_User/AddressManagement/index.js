import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import AddressItem from './AddressItem';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import baseUrl from '../../../constants/baseUrl';
import {
  addNewAddressSuccessfully,
  setEditAddress,
  setStatusEditAddress,
} from '../../../redux/slices/createOrderSlice';

const AddressManagementScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.users.userAuth);
  const addNewAddress = useSelector(
    state => state.createOrder.addNewAddressSuccessfully,
  );
  const [allAddress, setAllAddress] = useState([]);
  const getAddressOfCurrentUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `${baseUrl}/address/getAddressOfCurrentUser`,
        config,
      );
      const allAddress = response.data.data;
      setAllAddress(allAddress);
      if (addNewAddress) {
        dispatch(addNewAddressSuccessfully(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (addNewAddress) {
      console.log('vaoooo');
      getAddressOfCurrentUser();
    }
  }, [addNewAddress]);
  const handleSetDefault = index => {
    setAllAddress(
      prev =>
        (prev = prev.map((item, index2) => {
          if (index === index2) {
            return {
              ...item,
              isDefault: !item.isDefault,
            };
          } else
            return {
              ...item,
              isDefault: false,
            };
        })),
    );
  };
  useEffect(() => {
    getAddressOfCurrentUser();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sổ địa chỉ</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={styles.body}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 100,
            marginTop: 12,
          }}
          showsVerticalScrollIndicator={false}
          data={allAddress}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 24, marginHorizontal: 2}} key={index}>
              <AddressItem
                address={item}
                getAddressOfCurrentUser={getAddressOfCurrentUser}
                index={index}
                handleSetDefault={handleSetDefault}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          dispatch(setStatusEditAddress(false));
          dispatch(
            setEditAddress({
              fullName: '',
              phoneNumber: '',
              detail: '',
              isDefault: false,
              addressString: '',
            }),
          );
          navigation.navigate('AddAddressScreen');
        }}>
        <Icon name="pluscircle" size={40} color="#F16722" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressManagementScreen;
