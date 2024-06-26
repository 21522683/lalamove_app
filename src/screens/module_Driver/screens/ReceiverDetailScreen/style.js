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

  contact_phone_text: {
    fontSize: 14,
    fontWeight: '500',
    textAlignVertical: 'center',
  },

  outer_contact_icon: {
    backgroundColor: '#F1F1F1',
    padding: 9,
    borderRadius: 2,
    marginLeft: 10,
  },

  receive_instance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: moderateScale(20),
  },

  distance: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#fff',
  },

  status_text: {
    color: '#F2AB58',
    backgroundColor: '#FEF7EC',
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginVertical: 7,
    marginTop: moderateScale(9),
    marginBottom: moderateScale(15),
  },

  outer_addresses: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    marginTop: 7,
    marginHorizontal: 10,
    padding: moderateScale(20),
    paddingVertical: moderateScale(10),
  },

  outer_good: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    marginTop: 7,
    marginHorizontal: 10,
    padding: moderateScale(20),
    paddingVertical: moderateScale(10),
    display: 'flex',
    flexDirection: 'row',
  },
  main_type_good: {
    fontSize: 16,
    color: '#606060',
    fontWeight: '600',
  },

  outer_good_info_item: {
    display: 'flex',
    flexDirection: 'row',
  },
  title_good_info_item: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9C9C9C',
  },
  content_good_info_item: {
    fontSize: 14,
    color: '#7B7B7B',
    fontWeight: '600',
  },
  outer_receiver_slider: {
    backgroundColor: CUSTOM_COLOR.Primary,
    height: 50,
    marginHorizontal: 10,
    marginTop: 7,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  space_between: {
    justifyContent: 'space-between',
  },

  signal_text: {
    color: '#2F2F2F',
    marginLeft: 20,
    fontSize: 14,
    width: '90%',
  },
  sign_outer: {
    backgroundColor: '#E1F2FA',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  width_50: {
    width: '45%',
  },
  outer_cancel_btn: {
    backgroundColor: '#fff',
    height: 50,
    borderColor: CUSTOM_COLOR.Primary,
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 7,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default styles;
