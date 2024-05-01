import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
    borderBottomColor: '#AEAEAE',
    borderBottomWidth: verticalScale(1.5),
    width: '100%',
  },
  back_button: {
    padding: moderateScale(10),
  },
  title_header: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: scale(20),
  },
  content: {
    padding: moderateScale(20),
    flex: 1,
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
  },
  text_content: {
    textAlign: 'justify',
    color: CUSTOM_COLOR.Black, 
    opacity: 0.7,
    marginTop: verticalScale(5),
  }, 
  sub_text_content: {
    textAlign: 'justify',
    fontStyle: 'italic',
    color: CUSTOM_COLOR.Black, 
    opacity: 0.7,
    marginLeft: scale(20),
  }
  
});

export default styles;
