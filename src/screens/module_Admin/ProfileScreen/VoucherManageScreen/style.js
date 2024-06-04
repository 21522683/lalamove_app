import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  list_diver: {
    flexDirection: 'column',
    paddingTop:5,
    padding: moderateScale(20),
  },
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BABABA',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
    borderRadius: scale(4),
  },
  search_input: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    fontSize: scale(12),
    color: '#000000',
  },
  icon_search: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(20),
  },
  tab_nav_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: verticalScale(5),
    marginBottom: verticalScale(20),
    marginHorizontal: moderateScale(20),
    justifyContent:'space-around',
    alignItems: 'center',
  },
  btn_tab: {
    width: '25%',
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
    fontSize: scale(10),
    textAlign: 'center'
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
    fontSize: scale(10),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title_list: {
    marginHorizontal: scale(20),
    color: CUSTOM_COLOR.Primary,
    fontWeight: 'bold',
  },

});

export default styles;
