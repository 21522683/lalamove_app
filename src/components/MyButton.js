import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale,} from 'react-native-size-matters';
import FONT_FAMILY from "../constants/font";
import CUSTOM_COLOR from "../constants/colors";

const MyButton = ({
    onPress = () => { },
    text
}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: scale(16),
        fontWeight: '500',
        color: '#fff',
        fontFamily: FONT_FAMILY.RegularLight
    },
    button: {
        backgroundColor: CUSTOM_COLOR.Primary,
        borderRadius: 5,
        width: '100%',
        padding: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyButton;