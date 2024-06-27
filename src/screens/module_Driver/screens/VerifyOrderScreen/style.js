import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    position: 'relative',
  },

  header_container: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },

  text_receiver_time: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',
    color: '#575757',
    textAlignVertical: 'center',
    height: 50,
  },

  arrow_back_icon: {
    marginTop: -37,
  },

  submit_icon: {
    marginTop: -37,
    position: 'absolute',
    right: 0,
  },
});

export default styles;
