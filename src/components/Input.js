import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CUSTOM_COLOR from '../constants/colors';
import { scale, verticalScale } from 'react-native-size-matters';
import { IMAGES } from '../assets/images';
import FONT_FAMILY from '../constants/font';
const Input = ({
  label,
  error,
  password,
  enalble,
  dropdown,
  showMd,
  onFocus = () => { },
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? 'red'
              : isFocused
                ? CUSTOM_COLOR.Primary
                : '#C3C7E5',
            alignItems: 'center',
          },
          {
            backgroundColor: enalble ? props?.c : 'white'
          }
        ]}>

        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          
          editable={!enalble}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          placeholderTextColor={!enalble ? '#ccc' : 'black'}
          style={{ color: '#2F394E', flex: 1, fontSize: 16 }}
          {...props}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={{ color: '#2F394E' }}
          >
            {hidePassword ? <Image source={IMAGES.showPass} style={style.icon} /> : <Image source={IMAGES.hidePass} style={style.icon} />}

          </TouchableOpacity>
        )}
        {dropdown && (
          <TouchableOpacity
            onPress={showMd}
            style={{ color: '#2F394E' }}
          >
            <Image source={IMAGES.arrowDown} style={{...style.icon, width: scale(14), height: verticalScale(14),}} /> 

          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: CUSTOM_COLOR.Primary, fontSize: 14 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#2F394E',
  },
  inputContainer: {
    height: 55,
    fontFamily: FONT_FAMILY.Regular,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 4
  },
  icon: {
    width: scale(26),
    height: verticalScale(26),
    resizeMode: 'contain',
  }
});

export default Input;