import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../../../assets/images';
import AddressItem from '../../components/AddressItem';
import styles from './style';
import cs from '../../CustomStyle';
import ContactItem from '../../components/ContactItem';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import CUSTOM_COLOR from '../../../../constants/colors';

const DriverReviewMap = ({navigation, route}) => {
  var order = {...route.params};

  const address = {
    ...order,
    sourceAddress: {
      addressId: '1',
      userId: '1',
      name: 'Vị trí của tôi',
      province: 'Bình Dương',
      district: 'Bình Tân',
      ward: 'Tân tạo A',
      detail: '4519 Nguyễn Cửu Phú',
      phoneNumber: '0868008460',
      latitude: 128.168,
      longtitude: 169.259,
    },
  };

  const [isStart, setIsStart] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.map} style={{position: 'absolute'}}></Image>
      <Image
        source={IMAGES.map}
        style={{position: 'absolute', bottom: 0, zIndex: -1}}></Image>
      {isStart ? (
        <View style={styles.outer_des}>
          <View style={[cs.horizontal_flex]}>
            <View style={styles.outer_location}>
              <Icon3 name="location" size={22} color={CUSTOM_COLOR.green} />
            </View>
            <View style={{marginLeft: 14}}>
              <View style={{width: '90%'}}>
                <Text style={styles.address_info}>
                  {`${address.sourceAddress.detail}, ${address.sourceAddress.ward}, ${address.sourceAddress.district}, ${address.sourceAddress.province}`}
                </Text>
              </View>
            </View>
            <View style={styles.outer_arrow_icon}>
              <Icon2
                name="location-arrow"
                size={24}
                color={CUSTOM_COLOR.Primary}
              />
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.outer_addresses}>
        {!isStart ? (
          <View>
            <View style={[cs.horizontal_flex, styles.space_between]}>
              <Text style={styles.inner_header_distance_text}>
                {order.distance} Kilometers
              </Text>
              <TouchableOpacity onPress={() => setIsStart(true)}>
                <Text style={styles.status_text}>Bắt đầu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontal_line}></View>
            <AddressItem props={address} current />
            <View style={styles.horizontal_line}></View>
          </View>
        ) : null}
        <ContactItem {...order.destinationAddress} />
        {isStart ? (
          <TouchableOpacity
            style={[styles.outer_receiver_slider]}
            onPress={() =>
              navigation.navigate('VerifyOrderDriverScreen', {...order})
            }>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Đã đến nơi
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.navigate_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2F2E36" />
        </TouchableOpacity>
        <Text style={styles.text_inner_header}>Order #19892381233593</Text>
      </View>
    </View>
  );
};

export default DriverReviewMap;
