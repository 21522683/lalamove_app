import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import FONT_FAMILY from '../../../constants/font';
import CUSTOM_COLOR from '../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: moderateScale(20),
    paddingTop: moderateScale(0),
  },

  header_container: {
    backgroundColor: CUSTOM_COLOR.White,
    paddingHorizontal: moderateScale(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  receive_instance: {
    fontSize: 20,
    fontWeight: '500',
    color: '#575757',
    marginTop: moderateScale(20),
  },
  search_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 10,
  },

  search_hint: {
    fontSize: 13,
    borderRadius: 10,
    // color: '#B8B8B8',
    color: '#000000',
  },

  text_base: {
    fontSize: scale(14),
    fontWeight: 'regular',
    fontFamily: FONT_FAMILY.Medium,
  },

  main_color: {
    color: '#F16722',
  },

  outline_button: {
    borderRadius: 15,
    borderColor: '#F16722',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  logo: {
    width: scale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: moderateScale(10),
    margin: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
