import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';

const styles = ScaledSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container_item_list: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(6),
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR.Grey,
    flex: 1,
  },
  button_change_list: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
  },
  text_content_item_list: {
    textAlign: 'justify',
    marginHorizontal: scale(16),
    flex: 7,
  },
  button_more: {
    width: scale(40),
    height: verticalScale(30),
    resizeMode: 'contain',
    flex: 1.5,
  },
  icon_more: {
    color: CUSTOM_COLOR.Primary, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_change: {
    color: CUSTOM_COLOR.Primary,
    fontSize: scale(8),
    fontWeight: '400',
    textAlign: 'center',
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  }
});

export default styles;
