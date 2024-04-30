import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    card: {
        flexDirection: 'column',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(12),
        backgroundColor: 'white',
        borderRadius: 8
        // gap: 8
    },
    shadowCard: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3
    },

  
})

export default styles