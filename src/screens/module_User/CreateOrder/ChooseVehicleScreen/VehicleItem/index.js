import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome6';

import styles from './style'
import { verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../../../../../assets/images';


const VehicleItem = ({index,setIndexChosen, indexChosen}) => {
  const [isChosen,setChosen] = useState(false) 
  const handlePress = () =>{
    setChosen(prev => !prev)
  }
  return (
    <Pressable 
    onPress={handlePress}>
      <View style={[styles.card, styles.shadowCard, 
     ,
      isChosen && {
        borderBottomColor: '#F16722',
        borderLeftColor: '#F16722',
        borderRightColor: '#F16722',
        borderBottomWidth:4,
        borderLeftWidth:1,
        borderRightWidth:1,
      }
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
       {
        isChosen && 
        <>
        <View style={{flexDirection: 'row', gap:8, alignItems: 'center', marginTop: 20}}>
          <Icon2 name='money-bills' size={18} color='#6F6F6F'/>
            <Text style={{color: '#898989'}}>
            Phí gốc: 
            </Text>
            <Text style={{color: '#333'}}>200,000/1 xe</Text>
        </View>
      
        <View style={{flexDirection: 'row', gap:8, alignItems: 'center', marginTop: 12}}>
          <Icon3 name='speedometer' size={18} color='#6F6F6F'/>
            <Text style={{color: '#898989'}}>
              Cước phí di chuyển: 
            </Text>
            <Text style={{color: '#333'}}>200,000/1 xe/1km</Text>
        </View>
      
        </>
       }
        
        </View>
    </Pressable>
  )
}

export default VehicleItem