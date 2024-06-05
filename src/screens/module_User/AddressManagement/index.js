import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {FAB, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import AddressItem from './AddressItem';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AddressManagementScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sổ địa chỉ</Text>
        <View style={{width: 28}}></View>
      </Surface>

      <View style={styles.body}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 100,
            marginTop: 12,
          }}
          showsVerticalScrollIndicator={false}
          data={Array.from({length: 4})}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 24, marginHorizontal: 2}} key={index}>
              <AddressItem />
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate('AddAddressScreen');
        }}>
        <Icon name="pluscircle" size={40} color="#F16722" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressManagementScreen;
