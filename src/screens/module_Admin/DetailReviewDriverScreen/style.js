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
    height: verticalScale(20),
  },
  title_header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    flex: 1,
    textAlign: 'center',
    marginRight: scale(20),
  },
  scroll_body: {
    flexDirection: 'column',
    margin: moderateScale(20),
  },
  container_avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(20),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: CUSTOM_COLOR.Grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(20),
  },
  title_text: {
    fontSize: scale(11),
    color: CUSTOM_COLOR.Grey,
  },
  content_text: {
    color: CUSTOM_COLOR.Black,
    fontWeight: '500',
    fontSize: scale(14),
  },
  status_text: {
    color: CUSTOM_COLOR.Primary,
    fontWeight: '500',
    fontSize: scale(14),
  },
  container_img: {
    flexDirection: 'column',
    marginVertical: verticalScale(14),
  },
  img: {
    width: '100%',
    height: verticalScale(180),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(10),
    borderRadius: scale(6),
    borderColor: CUSTOM_COLOR.Grey,
  },
  container_button: {
    marginVertical: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn_accept: {
    backgroundColor: CUSTOM_COLOR.Primary,
    borderRadius: scale(4),
    padding: scale(10),
    width: scale(120),
  },
  btn_reject: {
    backgroundColor: CUSTOM_COLOR.Primary,
    borderRadius: scale(4),
    padding: scale(10),
    width: scale(120),
  },
  text_btn: {
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: scale(14),
  }
});

export default styles;
