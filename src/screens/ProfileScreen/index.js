import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './style.js';
import {IMAGES} from '../../assets/images/index.js'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />
      <Text>ProfileScreen</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Trở về home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen;