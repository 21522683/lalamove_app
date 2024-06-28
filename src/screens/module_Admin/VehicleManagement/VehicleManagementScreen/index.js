import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import baseUrl from '../../../../constants/baseUrl';
import axios from 'axios';
import VehicleItemManagement from '../VehicleItemManagement';
import {
  setAddVehicleType,
  setAddVehicleTypeSuccess,
  setStatusEdit,
  setVehicleTypes,
} from '../../../../redux/slices/vehicleTypeAdmin';

const VehicleManagementScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState({
    type: 'Tất cả',
    status: 'Đang hoạt động',
  });
  const dispatch = useDispatch();
  const [vehicleTypesOrigin, setVehicleTypesOrigin] = useState([]);
  const [vehicleTypeNames, setVehicleTypeNames] = useState([]);
  const userAuth = useSelector(state => state.users.userAuth);
  const vehicleTypes = useSelector(
    state => state.vehicleTypeAdmin.vehicleTypes,
  );

  const isAddVehicleTypeSuccess = useSelector(
    state => state.vehicleTypeAdmin.isAddVehicleTypeSuccess,
  );
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
      dispatch(setVehicleTypes(vhcTypes));
      setVehicleTypesOrigin(vhcTypes);
      const vehicleTypeNames = vhcTypes.map(item => item.vehicleTypeName);
      setVehicleTypeNames(vehicleTypeNames);
      if (isAddVehicleTypeSuccess) {
        dispatch(setAddVehicleTypeSuccess(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllVehicleTypes();
    }, []),
  );

  useEffect(() => {
    if (isAddVehicleTypeSuccess) {
      getAllVehicleTypes();
    }
  }, [isAddVehicleTypeSuccess]);

  const handleChangeType = value => {
    setSelectedTime(value);
  };
  const handleChangeStatus = value => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    let tmp = [];
    if (filter.type !== 'Tất cả') {
      tmp = [...vehicleTypesOrigin].filter(
        item =>
          item.vehicleTypeName === filter.type && item.status === filter.status,
      );
    } else
      tmp = [...vehicleTypesOrigin].filter(
        item => item.status === filter.status,
      );
    console.log(tmp);
    dispatch(setVehicleTypes(tmp));
  }, [filter]);

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
          Quản lý phương tiện
        </Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={[styles.body, {gap: 16, backgroundColor: 'white', flex: 1}]}>
        {/* <View style={styles.search_container}>
          <Icon name="search1" size={20} color="#BDBDBD" />
          <TextInput
            placeholder="Tìm kiếm..."
            onChangeText={handleChangeSearch}
            style={styles.search_input}></TextInput>
        </View> */}
        <View style={{flexDirection: 'row', gap: 8}}>
          <View style={{width: scale(140)}}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Loại xe</Text>

            <Picker
              mode="dropdown"
              selectedValue={filter.type}
              onValueChange={value =>
                setFilter(prev => ({...prev, type: value}))
              }>
              <Picker.Item label={'Tất cả'} value={'Tất cả'}></Picker.Item>
              {vehicleTypeNames.map((item, index) => {
                return <Picker.Item label={item} value={item}></Picker.Item>;
              })}
            </Picker>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Trạng thái</Text>

            <Picker
              style={{width: 200}}
              mode="dropdown"
              selectedValue={filter.status}
              onValueChange={value =>
                setFilter(prev => ({...prev, status: value}))
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

        <FlatList
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 2,
            paddingBottom: 30,
          }}
          data={vehicleTypes}
          renderItem={({item, index}) => (
            <VehicleItemManagement key={index} item={item} />
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          dispatch(setStatusEdit(false));
          dispatch(setAddVehicleType());
          navigation.navigate('DetaiVehicleScreen');
        }}>
        <Icon name="pluscircle" size={40} color="#F16722" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VehicleManagementScreen;
