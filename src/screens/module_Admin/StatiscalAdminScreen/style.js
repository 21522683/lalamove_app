import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  header: {
    width: '100%',
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.Primary,
  },
  title: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  body_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: moderateScale(30),
  },
  info_container: {
    flexDirection: 'column',
    marginVertical: verticalScale(20),
  },
  item_info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginVertical: verticalScale(10),
    width: '100%',
  },
  title_info: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    fontSize: scale(13),
    color: '#818181'
  },
  container_charts: {
    margin: moderateScale(10),
  },
  container_final: {
    paddingHorizontal: moderateScale(30),
    marginBottom: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  container_hoahong: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title_hoahong: {
    fontSize: scale(15),
    color: '#000000',
    fontWeight: 'bold',
    marginRight: scale(10),
  },
  tyle: {
    fontSize: scale(14),
    color: '#818181'
  },
  btn_edit: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    backgroundColor: CUSTOM_COLOR.Primary,
    borderRadius: scale(4),
  },
  text_btn: {
    color: CUSTOM_COLOR.White,
    textAlign: 'center',
    fontSize: scale(10),
  }
  
});

export default styles;
