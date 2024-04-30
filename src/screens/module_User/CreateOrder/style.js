import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    header: {
        height: 50,
        elevation:  4,
        justifyContent:"space-between",
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        backgroundColor:'white',
        paddingHorizontal: moderateScale(12)
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500"
    },

    body: {
        padding: moderateScale(20),
        paddingTop: verticalScale(20),
        backgroundColor: '#fff',
        fontSize: scale(14),
    },
    shadowCard: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3
    },

    textInput:{
        fontSize: 15,
        borderWidth: 1, 
        borderColor: '#DDDDDD', 
        height: 40, 
        borderRadius:4, 
        paddingHorizontal:16,

    }

})

export default styles