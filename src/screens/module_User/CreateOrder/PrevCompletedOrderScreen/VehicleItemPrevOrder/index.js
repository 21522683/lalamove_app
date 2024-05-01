import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import styles from './style'
import { verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../../../../../assets/images';


const VehicleItemPrevOrder = ({setListChosenVihicle, noAction}) => {
  
  return (
    <Pressable 
   >
      <View style={[styles.card, styles.shadowCard, 
      {flexDirection: 'column', gap: 12},
  
      ]}>
       <View style={{flexDirection: 'row', gap: 24, alignItems:'center'}}>
        <Image source={IMAGES.xemay} style={{width: 50, height: 50, resizeMode:'cover', alignSelf: 'flex-start'}}/>
          <View style={{gap: 6}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>Xe Máy</Text>
            <Text style={{color: '#333', fontSize:13}}>
              Phí gốc gốc: 300,000/1 xe
            </Text>
          </View>
       </View>
       <View style={{flexDirection: 'row', gap:8, alignItems: 'center'}}>
          <Icon3 name='speedometer' size={18} color='#6F6F6F'/>
            <Text style={{color: '#898989', fontSize:13, flex:1}}>
              Cước phí di chuyển: 200,000/1 xe/1km
            </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:8}}>
            <Text style={{color: '#000', fontSize:13, fontWeight: '500'}}>
            Số lượng: 2 xe
          </Text>
            <Text style={{color: '#000', fontSize:13, fontWeight: '500'}}>
            Thành tiền: 500,000
          </Text>
        </View> 
      </View>
      
    </Pressable>
  )
}

export default VehicleItemPrevOrder


