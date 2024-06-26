import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors.js';

const styles = ScaledSheet.create({
  container_item_diver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  container_info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: scale(20),
    flex: 1,
  },
  name_diver: {
    fontSize: scale(12),
    color: CUSTOM_COLOR.Black,
    fontWeight: '400'
  },
  email: {
    fontSize: scale(10),
    color: CUSTOM_COLOR.Grey,
    fontWeight: '400',
    marginVertical: verticalScale(4)
  },
  status: {
    color: 'green',
    fontSize: scale(10),
  },
});

export default styles;
