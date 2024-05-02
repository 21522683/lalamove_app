import { Image, Modal, ScrollView, Text, TouchableOpacity, TextInput, View, FlatList, SafeAreaView} from "react-native";
import styles from "./style";
import {  Surface } from "react-native-paper";
import {  scale, verticalScale } from "react-native-size-matters";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {  useState } from "react";
import { Picker } from "@react-native-picker/picker";
import UserModalCreateComplain from "./UserModalCreateComplain";



function UserComplainManagementScreen() {
    const [selectedTime,setSelectedTime] = useState('Gần đây')
    const [selectedStatus,setSelectedStatus] = useState('Phản hồi')
    const [isVisibleModal,setVisibleModal] = useState(false)
    return (
            <SafeAreaView style={{flex: 1,  backgroundColor: 'white'}}>
               <Surface style={styles.header}>
                    <Icon name="arrowleft" size={24}/>
                    <Text style={styles.title} >Quản lý khiếu nại</Text>
                    <View style={{width: 28}}></View>
               </Surface>
        
                   <View style={styles.body_padding}>
                      <View style={{flexDirection: 'row', gap: scale(24), marginTop: scale(16)}}>
                            <View style={{width: scale(120)}}>
                                <Text style={{fontSize: scale(14), fontWeight: '500'}}>Thời gian</Text>
                              
                                <Picker 
                                    mode="dropdown"
                                    selectedValue={selectedTime}
                                    onValueChange={(value) => setSelectedTime(value)}>
                                      <Picker.Item
                                                    label={'Gần đây'}
                                                    value={'Gần đây'}
                                           >
    
                                      </Picker.Item>
                                      <Picker.Item
                                                    label={'Cũ nhất'}
                                                    value={'Cũ nhất'}
                                           >
    
                                      </Picker.Item>
                                    </Picker>
                         
                             
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: scale(14), fontWeight: '500'}}>Trạng thái</Text>
                                <Picker 
                                mode="dropdown"
                                selectedValue={selectedStatus}
                                onValueChange={(value) => setSelectedStatus(value)}>
                                <Picker.Item
                                                label={'Phản hồi'}
                                                value={'Phản hồi'}
                                    >
    
                                </Picker.Item>
                                <Picker.Item
                                                label={'Chưa phản hồi'}
                                                value={'Chưa phản hồi'}
                                    >
    
                                </Picker.Item>
                        </Picker>
                         
                            </View>
                        </View>
    
                                       <FlatList 
                                       contentContainerStyle={{
                                        paddingBottom: 200,
                                        marginTop: 12
                                       }}
                                       
                                       showsVerticalScrollIndicator={false}
                                       data={Array.from({length:8})}
                                       keyExtractor={(item,index) => index}
                               
                                       renderItem={({item,index}) => (
                                        <View style={{marginBottom: 16, marginHorizontal: 2}} key={index}> 
                                                <ComplainCard setVisibleModal={setVisibleModal}/>
                                        </View>
                                       )}/>
                                 
                        
                   </View>
          
               <Modal
               visible={isVisibleModal}
               animationType="slide"
               transparent={true}>
            
                   <ScrollView><ModalComponent setVisibleModal={setVisibleModal}/></ScrollView>
               </Modal>
               <UserModalCreateComplain />
            </SafeAreaView>
    );

}

const ModalComponent = ({setVisibleModal}) => {
    return (
        <View style={styles.modalOverlay}>
            <View style={{...styles.modalInner, gap: 18}}>
                <View style={{flexDirection: 'row', gap: 12}}>
                    <Icon2 name='file-invoice' size={20} color={'#EA7000'}/>
                    <Text style={{fontSize: 16, fontWeight: "500", color: '#606060', flex: 1}}>
                    Đơn hàng #123455
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center', gap: 8}}>
                        <Text>Đã phản hồi</Text>
                        <Icon name='checkcircle' color='#F16722'/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Tài xế:
                 </Text>
                 <Text style={{...styles.titleComplainCard, width: 'unset'}} >
                     Nguyễn Văn Phát
                 </Text>
                 <Image source={{ uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg'}}
                  style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}}/>
                </View>
                <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Khách hàng:
                 </Text>
                 <Text style={{...styles.titleComplainCard, width: 'unset'}} >
                     Lê Văn A
                 </Text>
                
                </View>

                <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Ngày:
                 </Text>
                 <Text style={{...styles.titleComplainCard, width: 'unset'}} >
                     15/02/2003
                 </Text>
                
                </View>

                <View style={{flexDirection: 'row', gap: 12}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Tiêu đề:
                 </Text>
                 <Text style={{...styles.titleComplainCard, flex: 1}} >
                     Phản ánh về chất lượng hàng hóa
                 </Text>
                
                </View>

                <View style={{ gap: 4}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Nội dung:
                 </Text>
                 <Text style={{...styles.titleComplainCard, width: 'unset', marginLeft: scale(8)}} >
                 Phản ánh về chất lượng hàng không kka akafkdk dfjdkf df kdfj dfjdkfj dflkfdl dfldkf  
                 </Text>
                
                </View>


                <View style={{ gap: 4}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Hình ảnh:
                 </Text>
                <View style={{flexDirection: 'row', gap: 12}}>
                {
                    [1,2,3].map((item,index) => {
                        return (
                            <Image key={index} source={{ uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg'}}
                            style={{width: 60, height: 60, resizeMode: 'cover', borderRadius: 8}}/>
                        )
                    })
                }
                </View>
                
                </View>
                <View style={{height: 1, backgroundColor: '#CCCCCC', marginVertical: verticalScale(12)}}>

                </View>

                <View style={{ gap: 4}}>
                 <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                     Phản hồi:
                 </Text>
                 <Text
                    style={{...styles.titleComplainCard, 
                        width: 'unset', marginLeft: scale(8)}}
                    
                    
                   
                >
                    Xin lỗi về sự .... Chúng tôi đã có liên hệ thỏa đáng về sự việc trên. Chúc bạn có những trải nghiệm tốt nhất về dịch vụ của chúng tôi
                </Text>
                
                </View>

                <View style={{flexDirection: 'row', gap: 12, justifyContent: 'flex-end', marginTop: verticalScale(12)}}>
                        <View style={{
                            borderRadius: 4,
                            minWidth: 90,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F16722'}}>
                            <Text style={{fontWeight: '500', color: 'white'}}>Xóa</Text>
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
    )
}

const ComplainCard = ({setVisibleModal}) => {
    return (
        <TouchableOpacity
        onPress={() => setVisibleModal(true)}
        activeOpacity={1}
        delayPressIn={0}>
            <View style={[styles.complainCard,styles.shadowCard]}>
            <View style={{flexDirection: 'row', gap: 16}}>
            <Icon2 name='file-invoice' size={20} color={'#EA7000'}/>
             <View style={{flex: 1, gap: 12}}>
                 <Text style={{fontSize: 16, fontWeight: "500", color: '#606060'}}>
                     Đơn hàng #123455
                 </Text>
                 <View style={{flexDirection: 'row', gap: 12}}>
                     <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                         Tiêu đề:
                     </Text>
                     <Text style={styles.titleComplainCard} numberOfLines={1} ellipsizeMode="tail">
                         Phản ánh về chất lượng hàng hóa
                     </Text>
                 </View>
                 <View style={{flexDirection: 'row', gap: 12}}>
                     <Text style={{fontSize: 16, fontWeight: "400", color: '#222222'}}>
                         Ngày:
                     </Text>
                     <Text style={styles.titleComplainCard} numberOfLines={1} ellipsizeMode="tail">
                         15/02/2003
                     </Text>
                 </View>
                
             </View>
             <Icon name='right' size={20} style={{   alignSelf: 'center'}}/>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-end', gap: 8}}>
             <Text>Đã phản hồi</Text>
             <Icon name='checkcircle' color='#F16722'/>
         </View>
    
         </View>
        </TouchableOpacity>
    )
}

export default UserComplainManagementScreen;




