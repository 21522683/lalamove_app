import { Dimensions } from "react-native";
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },

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
    title: {
        fontSize: 18,
        fontWeight: "500"
    },

    body_padding: {
        padding: moderateScale(20),
        backgroundColor: '#fff',
        fontSize: scale(14)
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
        borderColor: '#9B9B9B',
        borderWidth: 1,
    },
    
    search_input: {
        fontSize: 13,
        backgroundColor: 'white',
        paddingVertical: 0,
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    
    },

    complainCard: {
        flexDirection: 'column',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(16),
        backgroundColor: 'white',
        gap: 8
    
        
    },
    titleComplainCard: {
        fontSize: 16,
        fontWeight: '500',
        color: '#777575',
        width: 200,
     
    },
    shadowCard: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
     
    },
    modalInner: {
        marginTop: verticalScale(76),
        width: Dimensions.get('window').width - 48,
        paddingVertical: verticalScale(24),
        paddingHorizontal: scale(16),
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 54
    
        
    }
    
})

export default styles