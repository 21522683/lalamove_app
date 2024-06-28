import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import CUSTOM_COLOR from '../../../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const ContactItem = props => {
  const navigator = useNavigation();
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
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#F5F5F5',
              borderRadius: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <Image
              style={{width: 40, height: 40}}
              source={{
                uri: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
              }}
            />
          </View>
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
          <Text style={{color: '#2F2E36', fontSize: 15}}>{props.fullName}</Text>
          <Text style={{color: '#B8B8B8', fontSize: 13}}>
            {props.phoneNumber}
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${props.phoneNumber}`);
          }}>
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
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#F5F5F5',
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigator.navigate('ChatUserScreen', {
              name: props.fullName,
              uid: props._id,
              avatar: props.avatar,
            });
          }}>
          <Icon2 name="messenger" size={20} color="#F2AB58" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactItem;
