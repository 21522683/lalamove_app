import {View, Text} from 'react-native';
import React from 'react';
import cs from '../../../module_Driver/CustomStyle';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import CUSTOM_COLOR from '../../../../constants/colors';
const AddressItem = ({props, hide, current}) => {
  return (
    <View>
      <View style={[cs.horizontal_flex]}>
        <View style={styles.outer_dot}>
          <View style={styles.inner_dot}>
            <View style={styles.line_under_dot}></View>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: '#D9D9D9',
              flex: 1,
              marginBottom: 4,
            }}></View>
        </View>
        <View
          style={{
            marginLeft: 14,
          }}>
          <Text style={styles.address_detail}>
            {hide ? props.sourceAddress.detail : props.sourceAddress.name}
          </Text>
          <View style={{width: hide ? '95%' : '90%'}}>
            <Text style={styles.address_info}>
              {hide
                ? `${props.sourceAddress.ward}, ${props.sourceAddress.district}, ${props.sourceAddress.province}`
                : `${props.sourceAddress.detail}, ${props.sourceAddress.ward}, ${props.sourceAddress.district}, ${props.sourceAddress.province}`}
            </Text>
          </View>
        </View>
        {!hide && !current && (
          <View style={styles.outer_arrow_icon}>
            <Icon2
              name="location-arrow"
              size={24}
              color={CUSTOM_COLOR.Primary}
            />
          </View>
        )}
      </View>
      <View style={[cs.horizontal_flex]}>
        <View style={styles.outer_location}>
          <Icon
            name="location-outline"
            size={18}
            color={CUSTOM_COLOR.Primary}
            style={{marginLeft: -4}}
          />
          <View style={{width: 1, flex: 1}}></View>
        </View>
        <View style={{marginLeft: 14}}>
          <Text style={styles.address_detail}>
            {hide
              ? props.destinationAddress.detail
              : props.destinationAddress.name}
          </Text>
          <View style={{width: hide ? '95%' : '90%'}}>
            <Text style={styles.address_info}>
              {hide
                ? `${props.destinationAddress.ward}, ${props.destinationAddress.district}, ${props.destinationAddress.province}`
                : `${props.destinationAddress.detail}, ${props.destinationAddress.ward}, ${props.destinationAddress.district}, ${props.destinationAddress.province}`}
            </Text>
          </View>
        </View>
        {!hide && !current && (
          <View style={styles.outer_arrow_icon}>
            <Icon2
              name="location-arrow"
              size={24}
              color={CUSTOM_COLOR.Primary}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default AddressItem;
