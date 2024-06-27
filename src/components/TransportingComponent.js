import {useDispatch, useSelector} from 'react-redux';
import {stopDelivery} from '../redux/slices/orderLocationSlice';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import CUSTOM_COLOR from '../constants/colors';
import {useContext} from 'react';
import {LocationContext} from '../../TrackLocation';

const TransportingComponent = () => {
  const navigation = useNavigation();
  const {curOrder, isToSource} = useContext(LocationContext);
  return (
    <View style={styles.container}>
      <View style={styles.outer__info}>
        <Image source={ICONS.deliveryManIcon} style={styles.icon__delivery} />
        <Text style={styles.text_info}>Bạn đang vận chuyển</Text>
      </View>
      <View style={styles.buttons_container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DriverReviewMap', {
              order: {...curOrder},
              isToSource: isToSource,
            });
          }}>
          <View style={styles.button_container}>
            <Text style={styles.text_container}>Mở bản đồ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  outer__info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon__delivery: {
    width: 35,
    height: 35,
  },
  text_info: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons_container: {
    display: 'flex',
    gap: 10,
  },
  button_container: {
    backgroundColor: CUSTOM_COLOR.Primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_container: {
    color: '#fff',
  },
});

export default TransportingComponent;
