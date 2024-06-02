import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';

const styles = ScaledSheet.create({
  container_text_2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(6),
  },
  title_text_2: {
    fontSize: scale(12),
    color: CUSTOM_COLOR.Grey,
  },
  content_text_2: {
    color: CUSTOM_COLOR.Black,
    fontWeight: '500',
    fontSize: scale(12),
  },
  status_text_2: {
    color: CUSTOM_COLOR.Primary,
    fontWeight: '500',
    fontSize: scale(12),
  },
  status_text_2_red: {
    color: 'red',
    fontWeight: '500',
    fontSize: scale(12),
  },
  status_text_2_green: {
    color: 'green',
    fontWeight: '500',
    fontSize: scale(12),
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
  container_img_2: {
    flexDirection: 'column',
    marginVertical: verticalScale(8),
  },
  title_text_2: {
    fontSize: scale(12),
    color: CUSTOM_COLOR.Grey,
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
    marginVertical: verticalScale(10),
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
    fontSize: scale(12),
  },
  tab_nav_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: verticalScale(5),
    marginVertical: moderateScale(30),
    marginHorizontal: moderateScale(20),
    justifyContent:'space-around',
    alignItems: 'center',
  },
  btn_tab: {
    width: '33%',
    borderRadius: 4,
  },
  item_tab: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  text_tab: {
    color: '#000000',
    fontSize: 15,
  },
  item_tab_active: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: CUSTOM_COLOR.Primary
  },
  text_tab_active: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default styles;
