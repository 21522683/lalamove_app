import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    card: {
        flexDirection: 'column',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16),
        backgroundColor: 'white',
        borderRadius: 8
        // gap: 8
    },
    shadowCard: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4
    },

    name: {
        fontWeight:'700',
        fontSize: scale(13)
    },
    edit: {
        fontSize: scale(13),
        fontWeight: '500',
        color:'#F16722'
    },
    textAddress: {
        fontWeight: '400',
        fontSize: 15,
        color: '#222222'
    }
})

export default styles