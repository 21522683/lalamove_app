import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';

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
  info_more: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  status: {
    color: 'green'
  },
  date_create: {
    marginLeft: scale(8),
    fontSize: scale(10),
  }
});

export default styles;
