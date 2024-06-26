import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../../constants/colors';

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
  title_item: {
    fontSize: scale(12),
  },
  content_item: {
    fontWeight: '400',
    color: '#000000',
    fontSize: scale(12),
    marginTop: verticalScale(4)
  }
});

export default styles;
