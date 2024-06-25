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
import styles from './style';
import AddressItem from '../components/AddressItem';
import ContactItem from '../components/ContactItem';
import ReviewModal from './ReviewModal';
import CUSTOM_COLOR from '../../../constants/colors';
import UserModalCreateComplain from './UserModalCreateComplain';
import Map from './Map';

const OrderDetailScreen = ({navigation, route}) => {
  var order = {...route.params};

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
      order.status === 'Đang giao hàng' &&
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
      {order.status !== 'Đang giao hàng' && (
        <View
          style={{
            position: 'absolute',
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}>
          <Map order={order} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        {order.status !== 'Đang giao hàng' && (
          <View>
            <View style={{height: windowHeight / 2 - 20}}></View>
            <ContactItem {...order.sourceAddress} />
          </View>
        )}
        <View
          style={{
            backgroundColor: '#fff',
            height:
              windowHeight - (order.status === 'Đang giao hàng' ? 80 : 40),
          }}>
          {order.status !== 'Đã hủy' && order.status !== 'Đang chờ nhận' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.calendarIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày giao hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>
                  {new Date(order.date).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
          {order.status === 'Đã hoàn thành' && (
            <View style={styles.outer_good}>
              <Image
                source={ICONS.receiverTimeIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <View>
                <Text style={styles.main_type_good}>Ngày nhận hàng</Text>
                <View style={{height: 7}}></View>
                <Text style={styles.title_good_info_item}>
                  {new Date(order.date).toLocaleString()}
                </Text>
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
                <Text style={styles.title_good_info_item}>
                  {new Date(order.date).toLocaleString()}
                </Text>
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
              <Text style={styles.main_type_good}>{order.goodsType}</Text>

              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Mô tả: </Text>
                <Text style={styles.content_good_info_item}>
                  {order.shortDescription}
                </Text>
              </View>
              <View style={styles.outer_good_info_item}>
                <Text style={styles.title_good_info_item}>Ghi chú: </Text>
                <Text style={styles.content_good_info_item}>{order.note}</Text>
              </View>
              <View>
                <Text style={styles.title_good_info_item}>Hình ảnh: </Text>
                <View style={{width: '85%'}}>
                  <Image
                    width={100}
                    height={100}
                    source={{uri: order.goodsImage}}
                  />
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
              <Text style={styles.main_type_good}>
                {order.vehicleType.vehicleTypeName}
              </Text>
              <View style={{width: '90%'}}>
                <Text style={styles.title_good_info_item}>
                  {order.vehicleType.size} {'\n'}
                  {order.vehicleType.suitableFor}
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
        {order.status === 'Đã hoàn thành' && (
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

export default OrderDetailScreen;
