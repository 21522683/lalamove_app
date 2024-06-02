import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CUSTOM_COLOR.White,
  },
  scroll_body: {
    flexDirection: 'column',
    margin: moderateScale(20),
    marginTop:5
  },
  container_text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  title_text: {
    fontSize: scale(14),
    color: CUSTOM_COLOR.Grey,
  },
  content_text: {
    color: CUSTOM_COLOR.Black,
    fontWeight: '500',
    fontSize: scale(14),
  },

  container_img: {
    flexDirection: 'column',
    marginVertical: verticalScale(14),
  },
  img: {
    width: '100%',
    height: verticalScale(180),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(10),
    borderRadius: scale(6),
    borderColor: CUSTOM_COLOR.Grey,
  },
  
});

export default styles;
