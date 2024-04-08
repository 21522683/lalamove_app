import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style.js';
import {IMAGES} from '../../assets/images/index.js';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <Image source={IMAGES.avatar} style={styles.logo} />

      {/* Ví dụ về sử dụng font, ae gõ tên font trong thư mục fonts là đc */}
      <Text style={{fontSize: 40, alignSelf: 'center', fontFamily: 'PublicSans-BoldItalic'}}>HomeScreen</Text>
      
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('Profile')}
        >
        <Text style={styles.text}>Đi tới profile</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;
