import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import {ICONS} from '../../../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';
import CUSTOM_COLOR from '../../../../constants/colors';

const ReviewModal = ({onClose, props}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          width: '90%',
        }}>
        <Image source={ICONS.documentPolicy} size={21}></Image>
        <View>
          <Text style={{color: '#606060', fontWeight: '600'}}>
            Đơn hàng {props.orderId}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={{color: '#222222', fontSize: 14}}>Tài xế: </Text>
            <Text>{props.driverName}</Text>
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
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginBottom: 10,
            }}>
            <Text style={{color: '#222222', fontSize: 14}}>Số sao: </Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={24}
              startingValue={0}
              //   onFinishRating={value => console.log(value)}
            />
          </View>
          <View>
            <Text style={{color: '#222222', fontSize: 14, marginBottom: 6}}>
              Nội dung:
            </Text>
            <TextInput
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
                height: 150,
                width: 250,
                padding: 10,
                textAlignVertical: 'top',
                marginBottom: 10,
              }}
              // onChangeText={onChangeText}
              // value={text}
              multiline={true}
              placeholder="Text here..."
            />
          </View>
          <View>
            <Text style={{color: '#222222', fontSize: 14, marginBottom: 6}}>
              Hình ảnh:
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginBottom: 6,
              }}>
              <View
                style={{
                  borderColor: CUSTOM_COLOR.Primary,
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderRadius: 4,
                }}></View>
              <View
                style={{
                  borderColor: CUSTOM_COLOR.Primary,
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderRadius: 4,
                }}></View>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: CUSTOM_COLOR.Primary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Thêm ảnh
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              gap: 5,
              marginTop: 50,
            }}>
            <TouchableOpacity onPress={() => onClose()}>
              <View
                style={{
                  backgroundColor: CUSTOM_COLOR.White,
                  borderColor: CUSTOM_COLOR.Primary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: CUSTOM_COLOR.Primary,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Đóng
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: CUSTOM_COLOR.Primary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Gửi
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewModal;
