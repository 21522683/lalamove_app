import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import styles from './style';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {FlatList, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../../../constants/baseUrl';
const formatDateString = d => {
  const date = new Date(d);
  const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' nếu cần
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
function ComplainManagementScreen() {
  const [filter, setFilter] = useState({
    search: '',
    time: 'Gần đây',
    status: 'Chưa phản hồi',
  });
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
        `${baseUrl}/complain/getAllComplains`,
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
    console.log('nee', complain);
  }, [complain]);
  useEffect(() => {
    console.log('1');
    let tmp = [...complainsOrign];
    console.log(filter);
    if (filter.search.trim() !== '') {
      tmp = tmp.filter(
        item =>
          item.title
            .trim()
            .toLowerCase()
            .includes(filter.search.trim().toLowerCase()) ||
          item._id.includes(filter.search.trim().toLowerCase()),
      );
    }
    tmp = tmp.filter(item => {
      if (filter.status === 'Chưa phản hồi') return item.isResponsed === false;
      else if (filter.status === 'Đã phản hồi')
        return item.isResponsed === true;
    });
    if (filter.time === 'Cũ nhất') {
      tmp.sort((a, b) => new Date(a.complainDate) - new Date(b.complainDate));
    } else
      tmp.sort((a, b) => new Date(b.complainDate) - new Date(a.complainDate));

    setComplains([...tmp]);
  }, [filter]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <Icon name="arrowleft" size={24} />
        <Text style={styles.title}>Quản lý khiếu nại</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={styles.body_padding}>
        <View style={styles.search_container}>
          <Icon name="search1" size={20} color="#BDBDBD" />
          <TextInput
            value={filter.search}
            onChangeText={text => setFilter(prev => ({...prev, search: text}))}
            placeholder="Tìm kiếm..."
            style={styles.search_input}></TextInput>
        </View>
        <View
          style={{flexDirection: 'row', gap: scale(6), marginTop: scale(16)}}>
          <View style={{width: scale(140)}}>
            <Text style={{fontSize: scale(14), fontWeight: '500'}}>
              Thời gian
            </Text>

            <Picker
              mode="dropdown"
              selectedValue={filter.time}
              onValueChange={value =>
                setFilter(prev => ({...prev, time: value}))
              }>
              <Picker.Item label={'Gần đây'} value={'Gần đây'}></Picker.Item>
              <Picker.Item label={'Cũ nhất'} value={'Cũ nhất'}></Picker.Item>
            </Picker>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: scale(14), fontWeight: '500'}}>
              Trạng thái
            </Text>
            <Picker
              mode="dropdown"
              selectedValue={filter.status}
              onValueChange={value =>
                setFilter(prev => ({...prev, status: value}))
              }>
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
            getAllComplains={getAllComplains}
          />
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const ModalComponent = ({setVisibleModal, complain, getAllComplains}) => {
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(false);
  const userAuth = useSelector(state => state.users.userAuth);
  const handleClickResponse = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
        'Content-Type': 'application/json',
      },
    };
    console.log(response);
    const data = await axios.patch(
      `${baseUrl}/complain/${complain._id}`,
      {
        response: response,
      },
      config,
    );
    setLoading(false);
    setVisibleModal(false);
    getAllComplains();
  };
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
              <FontAwesome name="user" size={20} />
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Khách hàng:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            {complain.order.customer.fullName}
          </Text>
        </View>

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

        <View style={{gap: 4}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Phản hồi:
          </Text>
          {complain.isResponsed ? (
            <Text
              style={{
                ...styles.titleComplainCard,
                width: 'unset',
                marginLeft: scale(8),
              }}>
              {complain.response}
            </Text>
          ) : (
            <TextInput
              value={response}
              onChangeText={text => setResponse(text)}
              style={{
                ...styles.titleComplainCard,
                width: 'unset',
                backgroundColor: 'transparent',
                borderColor: '#DDDDDD',
                borderWidth: 1,
              }}
              multiline={true}
              numberOfLines={4}
              underlineColorAndroid={'transparent'}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-end',
            position: 'relative',
            marginTop: verticalScale(12),
          }}>
          {!complain.isResponsed && (
            <Pressable onPress={handleClickResponse}>
              <View
                style={{
                  borderRadius: 4,
                  minWidth: 90,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F16722',
                }}>
                {isLoading && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                )}
                {!isLoading && (
                  <Text style={{fontWeight: '500', color: 'white'}}>
                    Xác nhận
                  </Text>
                )}
              </View>
            </Pressable>
          )}

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

export default ComplainManagementScreen;
