import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Surface } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style'
import { verticalScale } from 'react-native-size-matters';

const AddressItem = () => {

const [isDefault,setDefault] = useState(false)
  return (
    <View style={[styles.card, styles.shadowCard]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems:  'center', gap:8}}>
                <Text style={styles.name}>
                    Jane Doe
                </Text>
                <Text style={{fontSize: 16}}>
                    |
                </Text>
                <Text style={styles.phone}>
                    0868208744
                </Text>
            </View>
            <Text style={styles.edit}>
                Edit
            </Text>
        </View>
        <View style={{marginTop: verticalScale(8), gap: 4}}>
            <Text style={styles.textAddress}>
                Thôn Tuyết Diêm 2
            </Text>
            <Text style={styles.textAddress}>
                Bình Thuận, Bình Sơn, Quảng Ngãi
            </Text>
        </View>
        <Pressable
        onPress={() => setDefault(d => !d)}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(12), gap: 8}}>
                {
                    isDefault ?<Icon3 name='checkbox-marked' size={28} color='#F16722'/> :<Icon3 name='checkbox-blank-outline' size={28} />
                }
                <Text style={{color: '#222222'}}>Sử dụng làm địa chỉ mặc định</Text>
            </View>
        </Pressable>

    </View>
  )
}

export default AddressItem