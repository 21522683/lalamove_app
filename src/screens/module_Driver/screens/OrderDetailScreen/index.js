import {
  View,
  Text,
  PanResponder,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import CUSTOM_COLOR from '../../../../constants/colors';
import cs from '../../CustomStyle';
import {ICONS} from '../../../../assets/icons';
import AddressItem from '../../components/AddressItem';
import {LocationContext} from '../../../../../TrackLocation';

const OrderDetailDriverScreen = ({navigation, route}) => {
  var order = {...route.params};
  const {isTransport} = useContext(LocationContext);
  const animatedValue = useRef(new Animated.ValueXY()).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const windowWidth = Dimensions.get('window').width;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animatedValue.setValue({x: gesture.dx, y: gesture.dy});
        opacityValue.setValue(1 - gesture.dx / (windowWidth - 85));
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < windowWidth - 85) {
          animatedValue.setValue({x: 0, y: gesture.dy});
          opacityValue.setValue(1);
        } else {
          navigation.navigate('ReceiverDetailDriverScreen', {...order});
          animatedValue.setValue({x: 0, y: gesture.dy});
          opacityValue.setValue(1);
        }
      },
    }),
  ).current;

  const swipeAnimation = {
    transform: [
      {
        translateX: animatedValue.x,
      },
    ],
  };
  const opacityAnimation = {
    opacity: opacityValue,
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.receive_instance}>Nhận đơn ngay</Text>
        <Text style={styles.distance}>
          Cách ~{Math.round(order.distance * 10) / 10} Kilomet
        </Text>
        <Text style={styles.status_text}>{order.status}</Text>
      </View>
      <ScrollView style={{marginTop: -20}}>
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
        <View style={{height: 90}}></View>
      </ScrollView>
      {!isTransport && (
        <View
          {...panResponder.panHandlers}
          style={styles.outer_receiver_slider}>
          <Animated.View style={opacityAnimation}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Trượt để nhận đơn
            </Text>
          </Animated.View>
          <View style={{position: 'absolute', left: 10}}>
            <Animated.View style={swipeAnimation}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                }}>
                <Icon
                  name="arrow-forward"
                  size={24}
                  color={CUSTOM_COLOR.Primary}
                />
              </View>
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderDetailDriverScreen;
