import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import styles from './style';
import {verticalScale} from 'react-native-size-matters';
import {IMAGES} from '../../../../../assets/images';
import {useSelector} from 'react-redux';
import formatCurrencyVND from '../../../../../utils/formatCurrencyVND';

const VoucherItemPrevOrder = ({}) => {
  const voucher = useSelector(state => state.createOrder.voucher);

  const img = useMemo(() => {
    console.log(11);
  }, [voucher]);

  return (
    <Pressable>
      <View
        style={[
          styles.card,
          styles.shadowCard,
          {flexDirection: 'column', gap: 12},
        ]}>
        <View style={{flexDirection: 'row', gap: 24, alignItems: 'center'}}>
          <View style={{gap: 6}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Voucher: {voucher.voucherCode}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default VoucherItemPrevOrder;
