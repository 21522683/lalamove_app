import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ICONS} from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import AddressItem from '../components/AddressItem';
import {IMAGES} from '../../../assets/images';
import ContactItem from '../components/ContactItem';
import ReviewModal from './ReviewModal';
import CUSTOM_COLOR from '../../../constants/colors';
import UserModalCreateComplain from './UserModalCreateComplain';

const OrderDetailScreen = ({navigation, route}) => {
  var order = {...route.params};

  var goodInfo = {
    type: 'Thực phẩm và đồ uống',
    amount: '10kg đến 30kg',
    quantity: 2,
    description:
      'Giữ hàng cần thận nha, khi giao đến nhắn bạn nhận là chúc mừng ngày cá tháng tư',
    vehicleDescription: 'Giao hàng cồng kềnh, 60x50x60 cm, lên đến 50 kg',
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const scrollViewRef = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [visibleReview, setVisibleReview] = useState(false);
  const [isVisibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (scrollViewRef.current) {
      order.status === 'Đang giao' &&
        scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.receive_instance}>{order.status}</Text>
      </View>
      <TouchableOpacity
        style={{marginTop: -35, marginLeft: 15}}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#575757" />
      </TouchableOpacity>
      {order.status === 'Đang giao' && (
        <Image
          source={IMAGES.map}
          style={{position: 'absolute', zIndex: -1}}></Image>
      )}

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        {order.status === 'Đang giao' && (
          <View>
            <View style={{height: windowHeight / 2 - 20}}></View>
            <ContactItem {...order.sourceAddress} />
          </View>
        )}
        <View
          style={{
            backgroundColor: '#fff',
            height: windowHeight - (order.status === 'Đang giao' ? 80 : 40),
          }}>
          {order.status !== 'Đã hủy' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.calendarIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày giao hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}
          {order.status === 'Hoàn thành' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.receiverTimeIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày nhận hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}
          {order.status === 'Đã hủy' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.cancelTimeIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày hủy</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>{order.date}</Text>
              </View>
            </View>
          )}

          <View style={styles.outer_addresses}>
            <AddressItem props={order} hide />
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.goodIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>{goodInfo.type}</Text>

              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>
                  Tổng khối lượng:{' '}
                </Text>
                <Text style={styles.content_good_info_item}>
                  {goodInfo.amount}
                </Text>
              </View>
              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Số lượng: </Text>
                <Text style={styles.content_good_info_item}>
                  {goodInfo.quantity}
                </Text>
              </View>
              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Mô tả: </Text>
                <View style={{width: '85%'}}>
                  <Text style={styles.content_good_info_item}>
                    {goodInfo.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.vehicleIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>{order.vehicleType}</Text>
              <View style={{height: 7}} />
              <View style={{width: '90%'}}>
                <Text style={styles.title_good_info_item}>
                  {goodInfo.vehicleDescription}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.outer_good}>
            <Image
              source={ICONS.dollarMoneyIcon}
              style={{width: 24, height: 24, marginRight: 10}}
            />
            <View>
              <Text style={styles.main_type_good}>
                {VND.format(order.charge)}
              </Text>
              <View style={{height: 7}} />
              <Text style={styles.title_good_info_item}>Thu tiền mặt</Text>
            </View>
          </View>
          {/* <View style={{height: windowHeight}}></View> */}
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingBottom: 10,
          bottom: 0,
        }}>
        <View style={{flex: 1}}>
          <View>
            <TouchableOpacity
              style={[styles.outer_receiver_slider, styles.back_white]}
              onPress={() => setVisibleModal(true)}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: CUSTOM_COLOR.Primary,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Khiếu nại
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {order.status === 'Hoàn thành' && (
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={[styles.outer_receiver_slider, styles.width_50]}
              onPress={() => setVisibleReview(true)}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Đánh giá
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal animationType="fade" transparent={true} visible={visibleReview}>
          <ReviewModal
            onClose={() => {
              setVisibleReview(false);
            }}
            props={{
              orderId: order.orderId,
              driverName: 'Lê Văn Phát',
              avatar: 'Hello',
            }}
          />
        </Modal>
        <Modal
          visible={isVisibleModal}
          animationType="slide"
          transparent={true}>
          <ScrollView>
            {/* <ModalComponent setVisibleModal={setVisibleModal} /> */}
            <UserModalCreateComplain
              isVisibleModal={isVisibleModal}
              setVisibleModal={setVisibleModal}
            />
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

const ModalComponent = ({setVisibleModal}) => {
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
            Đơn hàng #123455
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text>Đã phản hồi</Text>
            <Icon name="checkcircle" color="#F16722" />
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Tài xế:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            Nguyễn Văn Phát
          </Text>
          <Image
            source={{
              uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Khách hàng:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            Lê Văn A
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Ngày:
          </Text>
          <Text style={{...styles.titleComplainCard, width: 'unset'}}>
            15/02/2003
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 12}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Tiêu đề:
          </Text>
          <Text style={{...styles.titleComplainCard, flex: 1}}>
            Phản ánh về chất lượng hàng hóa
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
              marginLeft: 8,
            }}>
            Phản ánh về chất lượng hàng không kka akafkdk dfjdkf df kdfj dfjdkfj
            dflkfdl dfldkf
          </Text>
        </View>

        <View style={{gap: 4}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Hình ảnh:
          </Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            {[1, 2, 3].map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(22).jpg',
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                    borderRadius: 8,
                  }}
                />
              );
            })}
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#CCCCCC',
            marginVertical: 12,
          }}></View>

        <View style={{gap: 4}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#222222'}}>
            Phản hồi:
          </Text>
          <Text
            style={{
              ...styles.titleComplainCard,
              width: 'unset',
              marginLeft: 8,
            }}>
            Xin lỗi về sự .... Chúng tôi đã có liên hệ thỏa đáng về sự việc
            trên. Chúc bạn có những trải nghiệm tốt nhất về dịch vụ của chúng
            tôi
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-end',
            marginTop: 12,
          }}>
          <View
            style={{
              borderRadius: 4,
              minWidth: 90,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F16722',
            }}>
            <Text style={{fontWeight: '500', color: 'white'}}>Xóa</Text>
          </View>

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

export default OrderDetailScreen;
