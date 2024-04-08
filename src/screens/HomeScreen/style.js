import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import FONT_FAMILY from '../../constants/font';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: FONT_FAMILY.MediumItalic
  },
  logo: {
    width: scale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: moderateScale(10),
    margin: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
