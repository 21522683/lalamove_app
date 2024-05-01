import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import FONT_FAMILY from '../../../constants/font';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems:'flex-start',
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor: '#fff',
  },
  titleText: {
    justifyContent:'center',
    fontSize: scale(22),
    fontWeight: '600',
    color: 'black',
    fontFamily: FONT_FAMILY.Medium
  },
  subText: {
    marginVertical:20,
    fontSize: scale(14),
    fontWeight: 'normal',
    justifyContent:'center',
    color: 'black',
    fontFamily: FONT_FAMILY.Light
  },

  
});

export default styles;