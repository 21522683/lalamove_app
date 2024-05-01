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
  container_body: {
    marginVertical: verticalScale(30),
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

  container_avatar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: scale(80),
    height: verticalScale(80),
    resizeMode: 'contain',
    borderRadius: scale(80),
    borderWidth: 1,
    borderColor: '#A2A2A2'
  },
  button_change: {
    width: scale(100),
    backgroundColor: CUSTOM_COLOR.Primary,
    padding: moderateScale(8),
    borderRadius: moderateScale(6),
    marginTop: verticalScale(10),

  },
  text_change: {
    textAlign: 'center',
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold'
  },
  container_input: {
    paddingHorizontal: scale(30),
    marginVertical: verticalScale(10),
  },
  title_input: {
    color: CUSTOM_COLOR.Black,
  },
  input_field: {
    backgroundColor: CUSTOM_COLOR.White,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Grey,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    marginVertical: verticalScale(6),
    width: '100%',
    
  },
  text_validation: {
    fontSize: scale(10),
    color: CUSTOM_COLOR.Primary,
  },
  button_update: {
    backgroundColor: CUSTOM_COLOR.Primary,
    width: scale(180),
    padding: moderateScale(16),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
  },
  title_button: {
    textAlign: 'center',
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    fontSize: scale(14),
  }
  
});

export default styles;
