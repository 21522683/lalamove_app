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
    padding: moderateScale(16),
    borderBottomColor: '#AEAEAE',
    borderBottomWidth: verticalScale(1.5),
    width: '100%',
  },
  back_button: {
    padding: moderateScale(10),
    width: scale(20),
    height: verticalScale(20)
  },
  title_header: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: scale(20),
  },
  container_input: {
    paddingHorizontal: scale(30),
    marginVertical: verticalScale(6),
  },
  title_input: {
    color: CUSTOM_COLOR.Black,
  },
  input_field: {
    backgroundColor: CUSTOM_COLOR.White,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Grey,
    borderRadius: moderateScale(5),
    paddingLeft: scale(20),
    paddingRight: scale(60),
    paddingVertical: verticalScale(12),
    marginVertical: verticalScale(8),
    width: '100%',
    flex: 1,
  },
  space: {
    marginVertical: verticalScale(15),
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
  },
  container_body: {
    marginVertical: verticalScale(30),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_eye: {
    padding: moderateScale(10),
    marginLeft: moderateScale(-50),
  },
  icon_eye: {
    width: scale(26),
    height: verticalScale(22),
  }

  
});

export default styles;
