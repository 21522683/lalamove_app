import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { Surface } from 'react-native-paper'
import styles from '../style'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import VehicleItemManagement from '../VehicleItemManagement';


const VehicleManagementScreen = () => {
  const navigation = useNavigation()
  const [selectedTime,setSelectedTime] = useState('Xe máy')
  const handleClickItemVehicle = () => {
    navigation.navigate('DetaiVehicleScreen')
  }

  return (
    <View style={{flex: 1,  backgroundColor: 'white'}}>
        <Surface style={styles.header}>
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            ><Icon name="arrowleft" size={24}/></TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Quản lý phương tiện</Text>
            <View style={{width: 28}}></View>
        </Surface>

        <View style={[styles.body, {gap: 16, backgroundColor:'white'}]}>
            <View style={styles.search_container}>
                <Icon name="search1" size={20} color="#BDBDBD" />
                <TextInput  placeholder="Tìm kiếm..." style={styles.search_input}></TextInput>
            </View>
            <View style={{width: scale(120)}}>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>Loại xe</Text>
                          
                            <Picker 
                                mode="dropdown"
                                selectedValue={selectedTime}
                                onValueChange={(value) => setSelectedTime(value)}>
                                  <Picker.Item
                                                label={'Xe máy'}
                                                value={'Xe máy'}
                                       >

                                  </Picker.Item>
                                  <Picker.Item
                                                label={'Xe bán tải'}
                                                value={'Xe bán tải'}
                                       >

                                  </Picker.Item>
                                  <Picker.Item
                                                label={'Xe van'}
                                                value={'Xe van'}
                                       >

                                  </Picker.Item>
                                  <Picker.Item
                                                label={'Xe tải'}
                                                value={'Xe tải'}
                                       >

                                  </Picker.Item>
                                  
                                </Picker>
                     
                         
             </View>

             <FlatList 
             contentContainerStyle={{
                gap:20,
                paddingHorizontal:2,
                paddingBottom: 220
             }}
             data={Array.from({length:8})}
             renderItem={({item,index}) => (
                <VehicleItemManagement key={index} onClickItem={handleClickItemVehicle}/>
             )}
             />
        </View>
        <TouchableOpacity style={styles.floatingButton}
        onPress={()=> {navigation.navigate('DetaiVehicleScreen')}}>
            <Icon name='pluscircle' size={40} color='#F16722'/>
        </TouchableOpacity>
      
    </View>
  )
}

export default VehicleManagementScreen