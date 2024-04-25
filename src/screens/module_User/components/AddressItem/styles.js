import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';
const styles = ScaledSheet.create({
  outer_addresses: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    marginTop: 7,
    marginHorizontal: 10,
    padding: moderateScale(20),
    paddingVertical: moderateScale(10),
  },

  outer_dot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  inner_dot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 10,
    height: 10,
    marginTop: 5,
    borderColor: CUSTOM_COLOR.Primary,
    borderWidth: 1.5,
    marginBottom: 3,
  },

  address_detail: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2F2E36',
  },

  address_info: {
    fontSize: 13,
    fontWeight: 'regular',
    color: '#9C9C9C',
    paddingVertical: 4,
    paddingBottom: 6,
  },

  outer_arrow_icon: {
    backgroundColor: '#F1F1F1',
    padding: 9,
    borderRadius: 2,
    marginLeft: 10,
  },
});

export default styles;
