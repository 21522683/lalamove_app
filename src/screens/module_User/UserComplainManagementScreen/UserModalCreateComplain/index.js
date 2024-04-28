import { View, Text, Modal, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import { scale, verticalScale } from 'react-native-size-matters';
import { launchImageLibrary } from 'react-native-image-picker';
import { runCLI } from 'jest';

const UserModalCreateComplain = () => {

   const [listImage,setListImage] = useState([]) 
   const [isVisibleModal,setVisibleModal] = useState(false)
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
 
        setListImage(prev => [...prev, response.assets[0]]);
    })
   }
   const handleRemoveImage = (indexImage) => {
    setListImage(prev => [...listImage].filter((item,index) => index!==indexImage))
   }
  return (
    <Modal
        visible={isVisibleModal}
        animationType="slide"
        transparent={true}>

    <ScrollView>
    <View style={styles.modalOverlay}>
            <View style={{...styles.modalInner, gap: 18}}>
                <View style={{flexDirection: 'row', gap: 12}}>
                    <Icon2 name='file-invoice' size={20} color={'#EA7000'}/>
                    <Text style={{fontSize: 16, fontWeight: "500", color: '#606060', flex: 1}}>
                    Đơn hàng #123455
                    </Text>
                    
                </View>
                <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Tài xế:
                 </Text>
                 <Text style={{...styles.title}} >
                     Nguyễn Văn Phát
                 </Text>
                 <Image source={{ uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg'}}
                  style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}}/>
                </View>
                <View style={{flexDirection: 'column', gap: 8,}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Tiêu đề:
                 </Text>
                 <TextInput
                 placeholder='Tìm kiếm'
                 style={styles.input}>
                    
                 </TextInput>
                
                </View>

               

                <View style={{ gap: 8}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Nội dung:
                 </Text>
                 <TextInput
                    style={styles.inputArea}
                    multiline={true}
                    numberOfLines={4}
               
                    
                   
                />
                
                </View>


                <View style={{ gap: 8}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Hình ảnh:
                 </Text>
                <View style={{flexDirection: 'row', gap: 12}}>
                {/* {
                    [1,2,3].map((item,index) => {
                        return (
                            <Image key={index} source={{ uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg'}}
                            style={{width: 60, height: 60, resizeMode: 'cover', borderRadius: 8}}/>
                        )
                    })
                } */}
                {
                    listImage.length > 0 && 
                    listImage.map((item,indexImage) => {
                        return (
                            <View style={{width: 80, height: 80, position: 'relative'}}
                            key={indexImage}>
                                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 8}} source={{uri: item.uri}}/>

                                <Pressable style={{position: 'absolute', top: -5, right: -5, }}
                                onPress={() => handleRemoveImage(indexImage)}>
                                    <Icon name='closecircle' size={20} color='white' />
                                </Pressable>
                            </View>
                        )
                    })
                }
                </View>
               {
                listImage.length < 2 && 
                <Pressable
                onPress={selectImage}>
                    <View style={{
                        borderRadius: 4,
                        minWidth: 90,
                        height: 40,
                        marginTop: 16,
                        alignSelf: 'baseline',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F16722'}}>
                        <Text style={{fontWeight: '500', color: 'white'}}>Thêm ảnh</Text>
                    </View>
        </Pressable>
               }
                
                </View>
                <View style={{height: 1, backgroundColor: '#CCCCCC', marginVertical: verticalScale(12)}}>

                </View>

           

                <View style={{flexDirection: 'row', gap: 12, justifyContent: 'flex-end', marginTop: verticalScale(12)}}>
                        <View style={{
                            borderRadius: 4,
                            minWidth: 90,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F16722'}}>
                            <Text style={{fontWeight: '500', color: 'white'}}>Gửi</Text>
                        </View>

                        <TouchableOpacity
                        activeOpacity={1}
                        delayPressIn={0}
                        onPress={() => setVisibleModal(false)}>
                            <View style={{
                                borderRadius: 4,
                                minWidth: 90,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#F16722'}}>
                                <Text style={{fontWeight: '500', color: '#F16722'}}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    
                </View>
                
            </View>
        </View>
    </ScrollView>
    </Modal>
  )
}

export default UserModalCreateComplain