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
    height: "30%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
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
    borderColor: '#EFEFEF',
  },
  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: verticalScale(50),
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
    alignItems: 'center',
  },
  num: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color:CUSTOM_COLOR.Primary,
  },
  email: {
    fontSize: scale(12),
    color: '#919191',
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
    width: scale(18),
    height: scale(15),
  },
  container_selection: {
    flexDirection: 'column',
    paddingHorizontal: scale(20),
  },
  item_selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: "#ccc",
    paddingVertical: moderateScale(8),
  },
  icon_selection: {
    width: scale(25),
    height: scale(25),
  },
  title_selection: {
    fontSize: scale(15),
    color: '#5D5D5D',
    marginLeft:15
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
