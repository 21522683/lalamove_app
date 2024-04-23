import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale, } from 'react-native-size-matters';
import FONT_FAMILY from "../constants/font";
import { IMAGES } from "../assets/images";

const LoginGoogleBtn = ({
    onPress = () => { },
    text
}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
            
                <Image source={IMAGES.googleIcon} style={styles.icon} />
                <Text style={styles.btnText}>{text}</Text>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: scale(16),
        fontWeight: '400',
        fontFamily: FONT_FAMILY.Light
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#C3C7E5',
        borderWidth: 1,
        flexDirection:'row',
        width: '100%',
        padding: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight:10,
        width: scale(26),
        height: verticalScale(18),
        resizeMode: 'contain',
    }
});

export default LoginGoogleBtn;