import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../../constants/colors';

const styles = ScaledSheet.create({
  container_item_diver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: verticalScale(12),
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
  },
  container_info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  license_number: {
    fontSize: scale(15),
    color: CUSTOM_COLOR.Black,
    fontWeight: '400'
  },
  type: {
    fontSize: scale(12),
    color: 'grey',
    marginTop:5,
    fontWeight: '300'
  },
  info_more: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    padding:2,
    paddingHorizontal:8,
    borderRadius:8
  },
  status: {
    color: 'green'
  },
  button_foward: {
    borderRadius: moderateScale(40),
  },
  icon_next: {
    width: scale(18),
    height: scale(15),
  },
});

export default styles;
