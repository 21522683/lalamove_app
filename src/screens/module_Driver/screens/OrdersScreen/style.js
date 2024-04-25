import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import FONT_FAMILY from '../../../../constants/font';

const styles = ScaledSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: moderateScale(20),
  },

  horizontal_flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  gap_10: {
    gap: moderateScale(10),
  },

  gap_20: {
    gap: moderateScale(20),
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
