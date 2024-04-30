import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { Surface } from 'react-native-paper'
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import styles from '../style'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import VehicleItem from './VehicleItem';
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const ChooseVehicleScreen = () => {
  const navigation = useNavigation()
  const [listChosenVihicle,setListChosenVihicle] = useState([])
  const scrollViewRef = useRef();
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };
  const CustomLayoutSpring = {
    ...LayoutAnimation.Presets.easeInEaseOut,
    duration: 180, 
    
  };
  LayoutAnimation.configureNext(CustomLayoutSpring);
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
            <Text style={{fontSize: 18, fontWeight: '600'}}>Chọn phương tiện</Text>
            <View style={{width: 28}}></View>
        </Surface>

        <View style={[styles.body, {gap: 16, backgroundColor:'white'}]}>
            <View style={{flexDirection: 'row', minHeight: 20}}>
                {
                    listChosenVihicle.length >0  && 
                    <>
                        <Text style={{ fontSize: 15}}>Đã chọn: </Text>
                        <Text style={{fontWeight: '600', fontSize: 15}}>{listChosenVihicle.length}</Text>
                    </>
                }
            </View>
           <VehicleItem setListChosenVihicle={setListChosenVihicle}/>
           <VehicleItem setListChosenVihicle={setListChosenVihicle}/>
           <VehicleItem setListChosenVihicle={setListChosenVihicle}/>
           <VehicleItem setListChosenVihicle={setListChosenVihicle}/>
           
           <Pressable 
               
               onPress={()=> navigation.navigate('PrevCompletedOrderScreen')}>
               <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
               alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:20}}>
                   <Text style={{fontSize: 15, fontWeight: '400',color:'white'}}>Tiếp tục</Text>
               </View>
             </Pressable>
        </View>
      
    </ScrollView>
  )
}

export default ChooseVehicleScreen