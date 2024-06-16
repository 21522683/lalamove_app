import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import AddressItem from './AddressItem';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import baseUrl from '../../../constants/baseUrl';

const AddressManagementScreen = () => {
  const navigation = useNavigation();
  const userAuth = useSelector(state => state.users.userAuth);
  const [allAddress, setAllAddress] = useState([]);
  const getAddressOfCurrentUser = async () => {
    try {
      console.log('vaoo');
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
      console.log(allAddress);
      setAllAddress(allAddress);
    } catch (error) {
      console.log(error);
    }
  };
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
          navigation.navigate('AddAddressScreen');
        }}>
        <Icon name="pluscircle" size={40} color="#F16722" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressManagementScreen;
