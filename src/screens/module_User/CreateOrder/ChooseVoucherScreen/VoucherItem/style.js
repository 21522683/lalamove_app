import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CUSTOM_COLOR from '../../../../../constants/colors';

const styles = ScaledSheet.create({
  container_item:{
    borderRadius: 8, 
    backgroundColor:'white', 
    width:'100%', 
    height:'auto',
    display:'flex',
    flexDirection:'column',
    padding: verticalScale(10),
    marginVertical:verticalScale(8),
    borderColor:'#ccc',
    borderWidth:1
  },
  row_item_voucher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: verticalScale(5),
  },
  voucher_code:{
    fontSize:16,
    fontWeight:'600'
  },
  normal_font:{
    fontSize:14,
    color:'#a3a3a3'
  },
  bold_font:{
    fontSize:14,
    color:'black'
  }
  
});

export default styles;
