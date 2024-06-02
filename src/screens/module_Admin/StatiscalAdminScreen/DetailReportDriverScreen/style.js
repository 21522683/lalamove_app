import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors.js';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    color: CUSTOM_COLOR.Black,
    flex: 1,
    textAlign: 'center',
    marginRight: scale(20),
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
    margin: moderateScale(20),
  },
  container_info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    margin: moderateScale(20),
  },
  img: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    resizeMode: 'contain',
  },
  info_driver: {
    flexDirection: 'column',
    justifyContent:'space-between',
  },
  name: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Primary,
  },
  email: {
    fontSize: scale(11),
    color: '#818181',
    fontWeight: '400',
  },
  phone: {
    fontSize: scale(11),
    color: '#818181',
    fontWeight: '400',
  },
  status: {
    fontSize: scale(11),
    color: 'green',
    fontWeight: '400',
  },
  
});

export default styles;