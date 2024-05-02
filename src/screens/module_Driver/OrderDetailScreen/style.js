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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },

  header_container: {
    backgroundColor: CUSTOM_COLOR.White,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingTop: moderateScale(20),
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  receive_instance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#575757',
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
    marginBottom: moderateScale(20),
  },

  outer_addresses: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    marginHorizontal: 10,
    padding: moderateScale(20),
    marginTop: 7,
  },

  outer_dot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  inner_dot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    width: 16,
    height: 16,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    marginBottom: 3,
  },

  line_under_dot: {
    backgroundColor: CUSTOM_COLOR.green,
    width: 6,
    height: 6,
    borderRadius: 6,
  },

  address_detail: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2F2E36',
  },

  address_info: {
    fontSize: 13,
    fontWeight: 'regular',
    color: '#9C9C9C',
    paddingVertical: 4,
    paddingBottom: 6,
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
    paddingVertical: moderateScale(12),
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
    height: 70,
    marginHorizontal: 10,
    marginTop: 7,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
});

export default styles;
