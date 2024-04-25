import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../constants/colors';
import AddressItem from '../../components/AddressItem';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    position: 'relative',
  },

  header_container: {
    backgroundColor: CUSTOM_COLOR.Primary,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },

  receive_instance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: moderateScale(20),
  },

  inner_header_distance_text: {
    color: '#2F2E36',
    fontWeight: '400',
    fontSize: 17,
    alignSelf: 'flex-start',
  },

  space_between: {
    justifyContent: 'space-between',
  },

  distance: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#fff',
  },

  status_text: {
    color: '#F16722',
    backgroundColor: '#FAF2EA',
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },

  outer_addresses: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowRadius: 6,
    elevation: 6,
    marginTop: -20,
    marginHorizontal: 10,
    padding: moderateScale(20),
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },

  horizontal_line: {
    height: 1,
    flex: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 12,
  },
  navigate_header: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.07)',
    flex: 1,
    width: '100%',
    paddingVertical: 15,
    paddingLeft: 15,
  },
  text_inner_header: {
    color: '#2F2E36',
    fontSize: 20,
  },
  outer_des: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    padding: 10,
    display: 'flex',
  },

  address_info: {
    fontSize: 16,
    color: '#2f2f2f',
  },

  outer_receiver_slider: {
    backgroundColor: CUSTOM_COLOR.Primary,
    height: 50,
    marginTop: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default styles;
