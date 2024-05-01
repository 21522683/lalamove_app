import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import FONT_FAMILY from '../../../constants/font';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor: '#fff',
  },
  titleText: {
    justifyContent:'center',
    fontSize: scale(36),
    fontWeight: 'bold',
    color: 'black',
    fontFamily: FONT_FAMILY.Medium
  },
  btnText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: '#fff',
    fontFamily: FONT_FAMILY.Light
  },
  subText: {
    marginVertical:20,
    paddingHorizontal:10,
    fontSize: scale(16),
    fontWeight: 'normal',
    textAlign:'center',
    color: 'black',
    fontFamily: FONT_FAMILY.Light
  },
  logo: {
    marginTop:30,
    width: scale(400),
    height: verticalScale(350),
    resizeMode: 'contain',
    marginBottom:20
  },
  button: {
    marginTop:40,
    backgroundColor: CUSTOM_COLOR.Primary,
    borderRadius: 5,
    width:'100%',
    padding: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
