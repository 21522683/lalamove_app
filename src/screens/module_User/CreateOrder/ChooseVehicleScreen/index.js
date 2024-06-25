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
import {Surface} from 'react-native-paper';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import styles from '../style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import VehicleItem from './VehicleItem';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../../constants/baseUrl';

const ChooseVehicleScreen = () => {
  const navigation = useNavigation();
  const userAuth = useSelector(state => state.users.userAuth);
  const [listVehicleTypes, setListVehycleTypes] = useState([]);
  const [indexChosen, setIndexChosen] = useState(-1);

  const getAllVehicleTypes = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `${baseUrl}/vehicle-type/getVehicleTypes`,
        config,
      );
      const vhcTypes = response.data.data;
      setListVehycleTypes(vhcTypes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllVehicleTypes();
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
        <Text style={{fontSize: 18, fontWeight: '600'}}>Chọn phương tiện</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={[styles.body, {gap: 16, backgroundColor: 'white'}]}>
        <FlatList
          data={listVehicleTypes}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 2,
            paddingBottom: 10,
          }}
          renderItem={({item, index}) => (
            <VehicleItem
              key={index}
              setIndexChosen={index => setIndexChosen(index)}
              item={item}
              indexChosen={indexChosen}
            />
          )}
        />

        <Pressable
          onPress={() => navigation.navigate('PrevCompletedOrderScreen')}>
          <View
            style={{
              backgroundColor: indexChosen !== -1 ? '#F16722' : '#ccc',
              height: 45,
              marginHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
              Tiếp tục
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChooseVehicleScreen;
