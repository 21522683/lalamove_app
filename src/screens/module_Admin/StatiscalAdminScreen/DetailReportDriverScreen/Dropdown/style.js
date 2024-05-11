import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
  option: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12)
  },
  selectedOption: {
    backgroundColor: '#FF831E',
  },
  optionText: {
    fontSize: scale(12),
    color: '#000000',
    fontWeight: 'bold'
  }
});

export default styles