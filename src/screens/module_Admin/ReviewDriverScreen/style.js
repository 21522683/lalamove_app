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
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BABABA',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(30),
    borderRadius: scale(4),
  },
  search_input: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    fontSize: scale(14),
    color: '#000000',
  },
  icon_search: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(20),
  },
  title_list: {
    marginHorizontal: scale(20),
    color: CUSTOM_COLOR.Primary,
    fontWeight: 'bold',
  },
  list_diver: {
    flexDirection: 'column',
    margin: moderateScale(20),
  },
});

export default styles;
