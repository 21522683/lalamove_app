import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../constants/colors';
import { StyleSheet } from 'react-native';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(14),
    borderBottomColor: '#AEAEAE',
    borderBottomWidth: verticalScale(1.5),
    width: '100%',
  },
  container_body: {
    marginVertical: verticalScale(30),
  },
  back_button: {
    padding: moderateScale(10),
    width: scale(20),
    height: verticalScale(20),
  },
  title_header: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: scale(20),
  },
  container_item: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title_item: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(12),
    fontWeight: 'bold',
    marginLeft: scale(20),
    marginBottom: verticalScale(20),
  },
  item_selected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  button_change: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_content: {
    paddingRight: scale(40),
    paddingLeft: scale(20),
    textAlign: 'justify'
  },
  icon: {
    width: scale(34),
    height: scale(34),
    resizeMode: 'contain',
  },
  space: {
    height: verticalScale(4),
    backgroundColor: '#E0E0E0'
  },
  container_header_list: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  title_list: {
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  btn_add: {
    padding: moderateScale(4),
    flexDirection: 'row', 
    alignItems: 'center',
  },
  text_add: {
    color: CUSTOM_COLOR.Primary,
    fontSize: scale(12),
  },
  list: {
    flexDirection: 'column',
    paddingHorizontal: scale(10),
    marginHorizontal: moderateScale(20),
    marginVertical: verticalScale(6),
  },
});

export default styles;
