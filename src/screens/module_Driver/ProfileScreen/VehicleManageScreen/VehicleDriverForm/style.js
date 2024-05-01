import {  scale, ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import FONT_FAMILY from '../../../../../constants/font';
const WINDOW_HEIGHT = Dimensions.get('window').height
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    justifyContent: 'center',
    fontSize: scale(22),
    fontWeight: '600',
    color: 'black',
    fontFamily: FONT_FAMILY.Medium
  },
  subText: {
    marginVertical: 20,
    fontSize: scale(14),
    fontWeight: 'normal',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    fontFamily: FONT_FAMILY.Light,
    
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: WINDOW_HEIGHT * 0.23,
    bottom: WINDOW_HEIGHT * 0,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#a8bed2",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: { width: 2, height: 2 }
      }
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    
  }

});

export default styles;