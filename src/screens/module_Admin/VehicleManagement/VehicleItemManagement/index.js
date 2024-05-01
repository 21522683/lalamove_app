import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome6';

import styles from './style'
import { verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../../../../assets/images';


const VehicleItemManagement = ({onClickItem}) => {
  return (
    <Pressable 
    onPress={() => onClickItem()}>
      <View style={[styles.card, styles.shadowCard, 
      ]}>
        <View style={ {flexDirection: 'row', alignItems: 'center', gap: 24}}>
          <Image source={IMAGES.xemay} style={{width: 70, height: 70, resizeMode:'cover'}}/>
          <View style={{flex: 1, gap: 6}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>Xe Máy</Text>
          <Text style={{color: '#333', fontSize:13}}>
            Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng
          </Text>
          <View style={{flexDirection: 'row', gap:8, alignItems: 'center'}}>
          <Icon4 name='package' size={18} color='#6F6F6F'/>
            <Text style={{color: '#898989', fontSize:13, flex:1}}>
              0.5 x 0.5 x 0.5 Mét . Đến 30 kg
            </Text>
          </View>
          </View>
        </View>
     
        
        </View>
    </Pressable>
  )
}

export default VehicleItemManagement