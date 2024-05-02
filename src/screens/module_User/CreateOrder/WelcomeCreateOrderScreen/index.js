import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import Icon6 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/Feather';
import { Surface } from 'react-native-paper'
import styles from '../style'
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../assets/images';


const WelcomeCreateOrderScreen = () => {
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

        <View style={[styles.body, {gap: 32, backgroundColor:'white'}]}>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', padding: 16}}>
              <View style={{gap:6}}>
                <Text style={{color: '#333333', fontSize:15}}>Chào mừng</Text>
                <Text style={{color: '#333333', fontSize: 20, fontWeight: '700'}}>Lalamove</Text>
              </View>
              <Image source={IMAGES.welcomeOrder}/>
            </View>

            <View style={[{backgroundColor:'white', padding: 16, paddingBottom: 32, borderRadius: 4}, styles.shadowCard]}>
              <View style={{flexDirection: 'row', gap:12, alignItems: 'center'}}>
                <Icon2 name='checkmark-circle' size={24} color='#FF671D'/>
                <Text style={{color: '#606060', fontWeight: '500', fontSize:16}}>Chất lượng - Uy tín - Tận tâm</Text>
              </View>
              <View style={{marginTop:36}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                  <Icon3 name='dot-circle-o'  size={16} color='#FF671D' style={{marginTop: 3, marginRight: 12}}/>
                  <View style={{gap:8, flex:1}}>
                    <Pressable onPress={() => navigation.navigate('ChooseAddressScreen')}>
                      <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                        <Text style={{color: '#2F2E36', fontSize:15 }}>Địa điểm nhận hàng</Text>
                        <Icon4 name='chevron-right'  size={20} />
                      </View>
                    </Pressable>
                    <Text>4519 Nguyễn Cửu Phú, Tân Tạo A, Bình 
                          Tân, Thành phố Hồ Chí Minh, Việt Nam</Text>
                  </View>
                  <Icon name='download'  size={20} style={{alignSelf:'center'}}/>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 24}}>
                  <Icon6 name='location-outline'  size={16} color='#4CAF50' style={{marginTop: 3, marginRight: 12}}/>
                  <View style={{gap:8, flex:1}}>
                   
                      <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                        <Text style={{color: '#2F2E36', fontSize:15 }}>Địa điểm nhận hàng</Text>
                        <Icon4 name='chevron-right'  size={20} />
                      </View>
               
                    <Text>4519 Nguyễn Cửu Phú, Tân Tạo A, Bình 
                          Tân, Thành phố Hồ Chí Minh, Việt Nam</Text>
                  </View>
                  <Icon name='download'  size={20} style={{alignSelf:'center'}}/>
                </View>

                <Pressable 
                onPress={()=> navigation.navigate('GoodsInformationScreen')}>
                <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
                alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 160}}>
                    <Text style={{fontSize: 15, fontWeight: '400',color:'white'}}>Tiếp tục</Text>
                </View>
              </Pressable>
              </View>
            </View>
        </View>
    </View>
  )
}

export default WelcomeCreateOrderScreen