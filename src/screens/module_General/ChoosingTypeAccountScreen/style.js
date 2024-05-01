import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import FONT_FAMILY from '../../../constants/font';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    justifyContent: 'center',
    fontSize: scale(22),
    fontWeight: '600',
    color: 'black',
    fontFamily: FONT_FAMILY.Medium
  },
  subText: {
    marginVertical: 20,
    fontSize: scale(14),
    fontWeight: 'normal',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    fontFamily: FONT_FAMILY.Light
  },
  btnTAText: {
    fontSize: scale(16),
    fontWeight: '400',
    fontFamily: FONT_FAMILY.Light
  },
  btnTypeAccount: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#C3C7E5',
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20
  },
  icon: {
    marginRight: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }

});

export default styles;