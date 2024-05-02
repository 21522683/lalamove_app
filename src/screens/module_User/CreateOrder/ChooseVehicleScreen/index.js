import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { Surface } from 'react-native-paper'
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import styles from '../style'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import VehicleItem from './VehicleItem';
import { FlatList } from 'react-native-gesture-handler';
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const ChooseVehicleScreen = () => {
  const navigation = useNavigation()
  const [listChosenVihicle,setListChosenVihicle] = useState([])
  const [indexChosen,setIndexChosen] = useState(-1)
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
    <SafeAreaView style={{flex: 1,  backgroundColor: 'white'}}
    >
        <Surface style={styles.header}>
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            ><Icon name="arrowleft" size={24}/></TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Chọn phương tiện</Text>
            <View style={{width: 28}}></View>
        </Surface>

        <ScrollView ref={scrollViewRef}>
          <View style={[styles.body, {gap: 16, backgroundColor:'white'}]}>
        
             <FlatList 
             data={Array.from({length:4})}
             contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 2,
              paddingBottom: 10
             }}
             renderItem={({item,index}) =>  <VehicleItem key={index} setIndexChosen={(index) => setIndexChosen(index)} indexChosen={indexChosen}/>}
             />
             
             <Pressable 
                 
                 onPress={()=> navigation.navigate('PrevCompletedOrderScreen')}>
                 <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
                 alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:20}}>
                     <Text style={{fontSize: 15, fontWeight: '400',color:'white'}}>Tiếp tục</Text>
                 </View>
               </Pressable>
          </View>
        </ScrollView>
      
    </SafeAreaView>
  )
}

export default ChooseVehicleScreen