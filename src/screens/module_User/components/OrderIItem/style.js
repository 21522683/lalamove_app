import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import FONT_FAMILY from '../../../../constants/font';
import CUSTOM_COLOR from '../../../../constants/colors';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },

  outer__header_distance: {
    backgroundColor: CUSTOM_COLOR.Primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inner_header_distance_text: {
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    fontSize: 14,
  },

  status_text: {
    color: CUSTOM_COLOR.Primary,
    backgroundColor: '#FEF7EC',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  horizontal_flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  outer_location: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicle_type: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  horizontal_line: {
    height: 1,
    flex: 1,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 15,
  },
  outer_money: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
});

export default styles;
