import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import { Surface } from 'react-native-paper'
import styles from '../style'
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../assets/images';


const CompletedOrderScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={{flex: 1,  backgroundColor: 'white'}}>
        <Surface style={styles.header}>
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            ><Icon name="arrowleft" size={24}/></TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Image source={IMAGES.logo2} style={{width: 30, height: 30, objectFit: 'cover'}}/>
              <Text style={{fontSize: 18, fontWeight: '700', fontStyle: 'italic', color:'#ff6e27'}}>LALAMOVE</Text>
            </View>
            <View style={{width: 28}}></View>
        </Surface>

        <View style={[styles.body, {gap: 24, backgroundColor:'white'}]}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 80}}>
            <Icon2 name="circle-check" size={50} color='#FF671D' />
          </View>
          <View style={{flexDirection: 'column',}}>
            <Text style={{textAlign:'center', color:'#606060', fontSize: 16}}>Đơn hàng của bạn đã được tạo thành công.</Text>
            <Text style={{textAlign:'center', color:'#606060', fontSize: 16}}>Theo dõi đơn hàng ở mục Quản lý đơn hàng.</Text>
          </View>
          <Pressable     
              onPress={()=> navigation.navigate('User-Home')}>
              <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
              alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:16}}>
                  <Text style={{fontSize: 15, fontWeight: '500',color:'white'}}>Về trang chủ</Text>
              </View>
          </Pressable>
        </View>
    </View>
  )
}

export default CompletedOrderScreen