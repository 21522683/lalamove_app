import { ScaledSheet, moderateScale, scale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    header: {
        height: 50,
        elevation:  4,
        justifyContent:"space-between",
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingHorizontal: moderateScale(12)
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500"
    },

    body: {
        padding: moderateScale(20),
        backgroundColor: '#fff',
        fontSize: scale(14)
    },

    floatingButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    shadowCard: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4
    },
})

export default styles