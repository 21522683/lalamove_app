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
        paddingHorizontal: moderateScale(12)
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500"
    },

    body: {
        padding: moderateScale(20),
        paddingTop: verticalScale(12),
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
    search_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
        borderRadius: 4,
        paddingHorizontal: 16,
        width: '100%',
        marginTop: 10,
        borderColor: '#979797',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    
    search_input: {
        fontSize: 13,
        backgroundColor: 'white',
        paddingVertical: 0,
        fontSize: 15,
        marginLeft: 10,
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    
    },
})

export default styles