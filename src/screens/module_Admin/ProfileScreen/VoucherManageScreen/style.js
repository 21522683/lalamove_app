import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  list_diver: {
    flexDirection: 'column',
    paddingTop:5,
    padding: moderateScale(20),
  },
});

export default styles;
