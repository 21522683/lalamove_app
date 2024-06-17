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
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BABABA',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
    borderRadius: scale(4),
    padding: moderateScale(2),
  },
  search_input: {
    flex: 1,
    fontSize: scale(12),
    color: '#000000',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
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
    textAlign: 'center',
  },
  list: {
    flexDirection: 'column',
    margin: moderateScale(20),
  },
});

export default styles;
