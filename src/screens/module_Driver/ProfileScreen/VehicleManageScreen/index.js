import { SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import ItemVehicleDriver from './ItemVehicleDriver'
import CUSTOM_COLOR from '../../../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { getDriverInforAction } from '../../../../redux/slices/usersSlices'

const VehicleManageScreen = ({ navigation }) => {
  const userInfor = useSelector(state => state?.users?.userInfor);
  const { vehicles } = userInfor
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDriverInforAction("vehicles"));
  }, [dispatch])
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.list_diver}>
        {
          vehicles?.map((item, index) => {
            return (
              <ItemVehicleDriver key={item.id} item={item} navigation={navigation} />
            )
          })
        }
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 20,
          right: 10,
          height: 60,
          backgroundColor: CUSTOM_COLOR.Primary,
          borderRadius: 100,
        }}

        onPress={() => {
          navigation.navigate('vehicle-driver-form', {
            name: 'Thêm phương tiện',
            type: 'add'
          })
        }}
      >
        <Ionicons name='plus' size={30} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default VehicleManageScreen