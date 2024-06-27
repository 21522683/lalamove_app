import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import styles from './style';
import {Surface} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import UserModalCreateComplain from './UserModalCreateComplain';
import {useSelector} from 'react-redux';
import baseUrl from '../../../constants/baseUrl';
import Icon4 from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
const formatDateString = d => {
  const date = new Date(d);
  const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
function UserComplainManagementScreen() {
  const [selectedStatus, setSelectedStatus] = useState('Chưa phản hồi');
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [complains, setComplains] = useState([]);
  const [complainsOrign, setComplainsOrigin] = useState([]);
  const [complain, setComplain] = useState({});
  const userAuth = useSelector(state => state.users.userAuth);
  const getAllComplains = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `${baseUrl}/complain/getComplainsOfCurrentUser`,
        config,
      );
      const complains = response.data.data;
      setComplains(complains);
      setComplainsOrigin(complains);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllComplains();
  }, []);
  useEffect(() => {
    setComplains(prev =>
      [...complainsOrign].filter(item => {
        if (selectedStatus === 'Đã phản hồi') {
          return item.isResponsed === true;
        } else return item.isResponsed === false;
      }),
    );
  }, [selectedStatus]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <Icon name="arrowleft" size={24} />
        <Text style={styles.title}>Quản lý khiếu nại</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={styles.body_padding}>
        <View
          style={{flexDirection: 'row', gap: scale(24), marginTop: scale(16)}}>
          <View style={{width: 190}}>
            <Text style={{fontSize: scale(14), fontWeight: '500'}}>
              Trạng thái
            </Text>
            <Picker
              mode="dropdown"
              selectedValue={selectedStatus}
              style={{width: 190}}
              onValueChange={value => setSelectedStatus(value)}>
              <Picker.Item
                label={'Đã phản hồi'}
                value={'Đã phản hồi'}></Picker.Item>
              <Picker.Item
                label={'Chưa phản hồi'}
                value={'Chưa phản hồi'}></Picker.Item>
            </Picker>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingBottom: 200,
            marginTop: 12,
          }}
          showsVerticalScrollIndicator={false}
          data={complains}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 16, marginHorizontal: 2}} key={index}>
              <ComplainCard
                setVisibleModal={setVisibleModal}
                item={item}
                setComplain={setComplain}
              />
            </View>
          )}
        />
      </View>

      <Modal visible={isVisibleModal} animationType="slide" transparent={true}>
        <ScrollView>
          <ModalComponent
            setVisibleModal={setVisibleModal}
            complain={complain}
          />
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const ModalComponent = ({setVisibleModal, complain}) => {
  console.log(complain);
  return (
    <View style={styles.modalOverlay}>
      <View style={{...styles.modalInner, gap: 18}}>
        <View style={{flexDirection: 'row', gap: 12}}>
          <Icon2 name="file-invoice" size={20} color={'#EA7000'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#606060',
              flex: 1,
            }}>
            Đơn hàng #{complain._id.substr(complain._id.length - 12)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 8,
            }}>
            <Text>
              {complain.isResponsed ? 'Đã phản hồi' : 'Chưa phản hồi'}
            </Text>
            {complain.isResponsed ? (
              <Icon name="checkcircle" color="#F16722" />
            ) : (
              <Icon name="close" color="#F16722" />
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Tài xế:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            {complain.order.drive.fullName}
          </Text>
          {complain.order.drive.avatar ? (
            <Image
              source={{
                uri: complain.order.drive.avatar,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'cover',
              }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#F5F5F5',
                borderRadius: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon4 name="user" size={20} />
            </View>
          )}
        </View>
        <View
          style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}></View>

        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Ngày khiếu nại:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            {formatDateString(complain.complainDate)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 12}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Tiêu đề:
          </Text>
          <Text style={{...styles.titleComplainCard, flex: 1}}>
            {complain.title}
          </Text>
        </View>

        <View style={{gap: 4}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Nội dung:
          </Text>
          <Text
            style={{
              ...styles.titleComplainCard,
              width: 'unset',
              marginLeft: scale(8),
            }}>
            {complain.content}
          </Text>
        </View>

        {complain.image && (
          <View style={{gap: 4}}>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
              Hình ảnh:
            </Text>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Image
                source={{
                  uri: complain.image,
                }}
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
            </View>
          </View>
        )}
        <View
          style={{
            height: 1,
            backgroundColor: '#CCCCCC',
            marginVertical: verticalScale(12),
          }}></View>

        {complain.isResponsed && (
          <View style={{gap: 4}}>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
              Phản hồi:
            </Text>
            <Text
              style={{
                ...styles.titleComplainCard,
                width: 'unset',
                marginLeft: scale(8),
              }}>
              {complain.response}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-end',
            marginTop: verticalScale(12),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            delayPressIn={0}
            onPress={() => setVisibleModal(false)}>
            <View
              style={{
                borderRadius: 4,
                minWidth: 90,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#F16722',
              }}>
              <Text style={{fontWeight: '500', color: '#F16722'}}>Đóng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ComplainCard = ({setVisibleModal, item, setComplain}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setVisibleModal(true);
        setComplain(item);
      }}
      activeOpacity={1}
      delayPressIn={0}>
      <View style={[styles.complainCard, styles.shadowCard]}>
        <View style={{flexDirection: 'row', gap: 16}}>
          <Icon2 name="file-invoice" size={20} color={'#EA7000'} />
          <View style={{flex: 1, gap: 12}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#606060'}}>
              Đơn hàng #{item._id.substr(item._id.length - 12)}
            </Text>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Tiêu đề:
              </Text>
              <Text
                style={styles.titleComplainCard}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
                Ngày:
              </Text>
              <Text
                style={styles.titleComplainCard}
                numberOfLines={1}
                ellipsizeMode="tail">
                {formatDateString(item.complainDate)}
              </Text>
            </View>
          </View>
          <Icon name="right" size={20} style={{alignSelf: 'center'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
          }}>
          <Text>{item.isResponsed ? 'Đã phản hồi' : 'Chưa phản hồi'}</Text>
          {item.isResponsed ? (
            <Icon name="checkcircle" color="#F16722" />
          ) : (
            <Icon name="close" color="#F16722" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserComplainManagementScreen;
