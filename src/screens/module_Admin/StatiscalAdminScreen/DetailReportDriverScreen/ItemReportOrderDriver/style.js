import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../../constants/colors.js';

const styles = ScaledSheet.create({
  container_item_diver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
  button_detail: {
    padding: moderateScale(10),
  },
  text_button: {
    color: CUSTOM_COLOR.Primary,
    fontSize: scale(12),
  },
  container_info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  date_create: {
    marginLeft: scale(8),
    fontSize: scale(10),
  }
});

export default styles;
