import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon7 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import {Surface} from 'react-native-paper';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

const GoodsInformationScreen = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 500,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log(response.error);
        return;
      }

      setImage(response.assets[0]);
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Surface style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          Thông tin hàng hóa
        </Text>
        <View style={{width: 28}}></View>
      </Surface>

      <ScrollView>
        <View style={[styles.body, {gap: 32, backgroundColor: 'white'}]}>
          <View
            style={[
              {
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginTop: 12,
                backgroundColor: 'white',
                paddingBottom: 24,
                gap: 28,
              },
              styles.shadowCard,
            ]}>
            <View style={{gap: 12}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Icon4 name="package" size={24} color="#F16722" />
                <Text
                  style={{color: '#222222', fontSize: 15, fontWeight: '500'}}>
                  Đặc điểm hàng hóa
                </Text>
              </View>
              <TextInput
                placeholder="Ex: Dễ vỡ, đông lạnh, ..."
                selectionColor={'#F16722'}
                style={styles.textInput}></TextInput>
            </View>

            <View style={{gap: 12}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Icon7 name="description" size={24} color="#F16722" />
                <Text
                  style={{color: '#222222', fontSize: 15, fontWeight: '500'}}>
                  Mô tả sơ lược hàng hóa
                </Text>
              </View>
              <TextInput
                placeholder="Ex: Có 1 giường, 2 ghế, ..."
                selectionColor={'#F16722'}
                multiline={true}
                numberOfLines={6}
                style={[
                  styles.textInput,
                  {height: 'unset', textAlignVertical: 'top'},
                ]}></TextInput>
            </View>

            <View style={{gap: 12}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Icon3 name="image" size={24} color="#F16722" />
                <Text
                  style={{color: '#222222', fontSize: 15, fontWeight: '500'}}>
                  Ảnh chụp hàng hóa
                </Text>
              </View>
              <Pressable onPress={selectImage}>
                <View
                  style={[
                    {
                      width: 180,
                      height: 120,
                      borderWidth: image ? 0 : 1,
                      borderStyle: 'dashed',
                      borderColor: '#F16722',
                      overflow: 'hidden',
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  {image ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={{uri: image.uri}}
                    />
                  ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon3 name="pointer" size={40} color="#F16722" />
                      <Text
                        style={{
                          color: '#F16722',
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        Thêm ảnh
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </View>

            <View style={{gap: 12}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Icon7 name="edit-note" size={24} color="#F16722" />
                <Text
                  style={{color: '#222222', fontSize: 15, fontWeight: '500'}}>
                  Ghi chú cho tài xế
                </Text>
              </View>
              <TextInput
                placeholder="Ex: Giao hàng vào giờ , ..."
                selectionColor={'#F16722'}
                style={styles.textInput}></TextInput>
            </View>
            <Pressable
              onPress={() => navigation.navigate('ChooseVehicleScreen')}>
              <View
                style={{
                  backgroundColor: '#F16722',
                  height: 45,
                  marginHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
                  Tiếp tục
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoodsInformationScreen;
