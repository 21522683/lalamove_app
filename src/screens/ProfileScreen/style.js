import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
});

export default styles;
