import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react';
import styles from './style.js';
import { IMAGES } from '../../assets/images/index.js';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={IMAGES.avatar} style={styles.logo} />
        <Text
          style={{
            fontSize: 40,
            alignSelf: 'center',
            fontFamily: 'PublicSans-BoldItalic',
          }}>
          HomeScreen
        </Text>

        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Đi tới profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DriverOrders')}>
          <Text style={styles.text}>Driver Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>


  );
};

export default HomeScreen;
