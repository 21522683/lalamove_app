import { Dimensions } from "react-native";
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#777575',
    },
    input: {
        paddingHorizontal: scale(8),
        borderWidth: 1,
        borderColor: '#DDDDDD',
        flex: 1,
        paddingVertical: verticalScale(4)
    },

    inputArea: {
        paddingHorizontal: scale(12),
        borderWidth: 1,
        borderColor: '#DDDDDD',
        flex: 1,
        textAlignVertical: 'top',
        paddingVertical: verticalScale(8),
        justifyContent: 'flex-start',
        fontSize: scale(14)
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        minHeight: Dimensions.get('window').height
     
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