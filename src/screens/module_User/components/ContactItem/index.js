import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import CUSTOM_COLOR from '../../../../constants/colors';

const ContactItem = props => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        margin: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {props.avatar ? (
          <View></View>
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
            <Icon name="user" size={20} />
          </View>
        )}
        <View style={{marginLeft: 12}}>
          <Text style={{color: '#2F2E36', fontSize: 15}}>{props.name}</Text>
          <Text style={{color: '#B8B8B8', fontSize: 13}}>
            {props.phoneNumber}
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
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
          <Icon name="phone" size={20} color={CUSTOM_COLOR.Primary} />
        </View>
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
          <Icon2 name="messenger" size={20} color="#F2AB58" />
        </View>
      </View>
    </View>
  );
};

export default ContactItem;
