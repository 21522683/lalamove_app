import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { Surface } from 'react-native-paper'
import styles from '../style'
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../assets/images';
import VehicleItem from '../ChooseVehicleScreen/VehicleItem';
import VehicleItemPrevOrder from './VehicleItemPrevOrder';


const PrevCompletedOrderScreen = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef();
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };
  useFocusEffect(
    React.useCallback(() => {
      scrollToTop();
      return () => {};
    }, [])
  );
  return (
    <ScrollView style={{flex: 1,  backgroundColor: 'white'}}
    ref={scrollViewRef}>
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

        <View style={[styles.body, {gap: 16, backgroundColor:'white'}]}>
           
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', padding: 16}}>
              <View style={{gap:6}}>
                <Text style={{color: '#333333', fontSize:15}}>Nhận hàng</Text>
                <Text style={{color: '#333333', fontSize: 20, fontWeight: '700'}}>Càng sớm càng tốt</Text>
              </View>
              <Image source={IMAGES.xemayprevorder} style={{width: 80, height: 80, resizeMode: 'cover'}}/>
        </View>

        <View style={[{backgroundColor:'white', padding: 16, paddingBottom: 32, borderRadius: 4},styles.shadowCard]}>
            <View style={{flexDirection: 'row', gap:12, alignItems: 'center'}}>
                    <Icon name='heart' size={24} color='#F16722'/>
                    <Text style={{color: '#606060', fontWeight: '500', fontSize:16}}>Cảm ơn bạn đã tin tưởng Lalamove</Text>
            </View>
            <View style={{marginTop:24}}>
                <View style={{marginLeft: 24, gap: 24}}>
                <View style={{flexDirection: 'row', gap:8, alignItems: 'center', 
                paddingBottom:  12, borderBottomColor: '#DDDDDD', borderBottomWidth: 1}}>
                        <Icon2 name='map-marker-distance' size={24} color='#6F6F6F'/>
                        <Text style={{color: '#606060', fontSize:15}}>
                            Quãng đường vận chuyển: x km
                            </Text>
                    </View>
                <View style={{flexDirection: 'row', gap:8, alignItems: 'center', 
                paddingBottom:  12, borderBottomColor: '#DDDDDD', borderBottomWidth: 1}}>
                        <Icon2 name='clock-time-eleven-outline' size={24} color='#6F6F6F'/>
                        <Text style={{color: '#606060', fontSize:15}}>
                            Ước tính lấy hàng trong: x giờ
                            </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap:8, alignItems: 'center',
                paddingBottom:  12, borderBottomColor: '#DDDDDD', borderBottomWidth: 1}}>
                        <Icon2 name='clock-time-eleven-outline' size={24} color='#6F6F6F'/>
                        <Text style={{color: '#606060', fontSize:15}}>
                            Ước tính giao hàng trong: x giờ
                            </Text>
                    </View>

                    <View style={{flexDirection: 'row', gap:8, alignItems: 'center',
                paddingBottom:  12, borderBottomColor: '#DDDDDD', borderBottomWidth: 1}}>
                        <Icon3 name='dollar' size={20} color='#6F6F6F' style={{marginLeft: 4}}/>
                        <Text style={{color: '#606060', fontSize:15}}>
                            Tiền thanh toán: đ250,000,000
                            </Text>
                    </View>
                </View>


                <View style={{flexDirection: 'row', gap:12, alignItems: 'center', marginTop: 32, marginBottom: 20}}>
                    <Icon2 name='van-utility' size={24} color='#F16722'/>
                    <Text style={{color: '#606060', fontWeight: '500', fontSize:16}}>Xe đã chọn</Text>
                </View>
                <View style={{gap: 24}}>
                    <VehicleItemPrevOrder/>
                    <VehicleItemPrevOrder/>
                    <VehicleItemPrevOrder/>
                </View>

             
              </View>

              <Pressable 
               
               onPress={()=> navigation.navigate('CompletedOrderScreen')}>
               <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
               alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:32}}>
                   <Text style={{fontSize: 15, fontWeight: '400',color:'white'}}>Tiếp tục</Text>
               </View>
             </Pressable>
        </View>
          
        </View>
      
    </ScrollView>
  )
}

export default PrevCompletedOrderScreen