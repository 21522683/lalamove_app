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
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.Primary,
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  body_container: {
    flex: 1,
    flexDirection: 'column',
  },
  item_profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    backgroundColor: '#ffffff',
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderColor: '#ccc',
    paddingHorizontal: scale(16)
  },
  avatar: {
    width: scale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(40),
    borderWidth: 0.5,
    borderColor: CUSTOM_COLOR.Grey,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: scale(10)
  },
  name: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: scale(11),
    color: '#919191',
    fontStyle: 'italic',
    marginVertical: scale(2)
  },
  container_status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status_color: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: 'green',
    marginHorizontal: scale(6)
  },
  status: {
    fontSize: scale(11),
    color: '#919191',
    fontStyle: 'italic',
  },
  button_foward: {
    padding: moderateScale(14),
    borderRadius: moderateScale(40),
  },
  icon_next: {
    width: scale(20),
    height: scale(20),
  },
  container_selection: {
    flexDirection: 'column',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(40),
  },
  item_selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: CUSTOM_COLOR.Primary,
    padding: moderateScale(8),
  },
  icon_selection: {
    width: scale(34),
    height: scale(34),
  },
  title_selection: {
    fontSize: scale(16),
    color: '#5D5D5D',
  }, 
  button_lock: {
    backgroundColor: CUSTOM_COLOR.Primary,
    width: scale(180),
    padding: moderateScale(16),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(10),
  },
  title_button: {
    textAlign: 'center',
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    fontSize: scale(14),
  }
});

export default styles;
