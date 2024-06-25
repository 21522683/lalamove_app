import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  header: {
    height: 50,
    elevation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingHorizontal: moderateScale(12),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },

  body: {
    padding: moderateScale(20),
    paddingTop: verticalScale(12),
    backgroundColor: '#fff',
    fontSize: scale(14),
  },
  calloutView: {
    width: 200,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
