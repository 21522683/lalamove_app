import { View, Text, TouchableOpacity, TextInput, Switch, Pressable, Image, ScrollView, Dimensions, FlatList, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Surface } from 'react-native-paper'
import styles from '../style'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../assets/images';
import { launchImageLibrary } from 'react-native-image-picker';


const DetaiVehicleScreen = () => {
  const navigation = useNavigation()
  const [image,setImage] = useState(null);
  const selectImage = () => {
    let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 500,
        quality: 1,
        includeBase64: true
    }
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker')
            return;
        }
        else if (response.error) {
            console.log(response.error)
            return;
        }
 
        setImage(response.assets[0]);
    })
  }
  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: 'white'}}>
        <Surface style={styles.header}>
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            ><Icon name="arrowleft" size={24}/></TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Chi tiết phương tiện</Text>
            <View style={{width: 28}}></View>
        </Surface>

       <ScrollView>
            <View style={[styles.body, {gap: 16, backgroundColor:'white', paddingBottom: 60}]}>
               
                <View style={{flexDirection: 'row'}}>
                    <Image source={image ? {uri: image.uri} :IMAGES.car} style={{flex:1, resizeMode:'contain', height: 200}}/>
                    <Pressable style={{alignSelf: 'flex-end'}}
                    onPress={selectImage}
                    >
                        <Icon2 name='image-edit-outline' size={36} color='#F16722'/>
                    </Pressable>
                </View>
    
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Tên loại xe:
                     </Text>
                     <TextInput
                     placeholder='Ex: Xe van'
                     style={styles.textInput}>
                        
                     </TextInput>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Tải trọng tối đa:
                     </Text>
                     <View style={[styles.textInputContainer, {width: 150}]}>
                        <TextInput
                        placeholder='Ex: 5000'
                        keyboardType='numeric'
                        style={{fontSize: 15, paddingVertical:0, flex:1}}>
    
                        
                     </TextInput>
                     <Text style={{fontSize: 15, color:'#555555'}}>Kg</Text>
                     </View>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Kích thước:
                     </Text>
                     <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                     <TextInput
                      placeholder='Ex: 100'
                     style={[styles.textInput, {width: 80}]}>
                        
                     </TextInput>
                        <Text style={{fontSize: 15, color:'#555555'}}>x</Text>
                        <TextInput
                      placeholder='Ex: 100'
                     style={[styles.textInput, {width: 80}]}>
                        
                     </TextInput>
                        <Text style={{fontSize: 15, color:'#555555'}}>x</Text>
                        <TextInput
                      placeholder='Ex: 100'
                     style={[styles.textInput, {width: 80}]}>
                        
                     </TextInput>
                        <Text style={{fontSize: 15, color:'#555555'}}>{'(M)'}</Text>
                     </View>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Phí gốc:
                     </Text>
                     <View style={[styles.textInputContainer, {width: 220}]}>
                        <TextInput
                        placeholder='Ex: 500,000'
                        keyboardType='numeric'
                        style={{fontSize: 15, paddingVertical:0, flex:1}}>
    
                        
                     </TextInput>
                     <Text style={{fontSize: 15, color:'#555555'}}>VNĐ</Text>
                     </View>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Cước phí /1km:
                     </Text>
                     <View style={[styles.textInputContainer, {width: 220}]}>
                        <TextInput
                        placeholder='Ex: 75,000'
                        keyboardType='numeric'
                        style={{fontSize: 15, paddingVertical:0, flex:1}}>
    
                        
                     </TextInput>
                     <Text style={{fontSize: 15, color:'#555555'}}>VNĐ</Text>
                     </View>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Phù hợp cho:
                     </Text>
                     <TextInput
                     placeholder='Ex: Hàng cồng kềnh...'
                     multiline={true}
                     numberOfLines={6}
                     style={styles.inputArea}>
                        
                     </TextInput>
                </View>
    
                <View style={{flexDirection: 'column', gap: 8,}}>
                     <Text style={{fontSize: 16, fontWeight: "500", color: '#222222'}}>
                         Ghi chú:
                     </Text>
                     <TextInput
                     placeholder='Ex: Ghi chú...'
                     multiline={true}
                     numberOfLines={6}
                     style={styles.inputArea}>
                        
                     </TextInput>
                </View>
    
                <Pressable 
                   
                   onPress={()=> {}}>
                   <View style={{backgroundColor: '#F16722', height: 45, marginHorizontal: 12, 
                   alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:32}}>
                       <Text style={{fontSize: 15, fontWeight: '400',color:'white'}}>Lưu</Text>
                   </View>
                 </Pressable>
                
            </View>
       </ScrollView>

      
    </SafeAreaView>
  )
}

export default DetaiVehicleScreen