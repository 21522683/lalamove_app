import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import { useNavigation } from '@react-navigation/native';

const PrivatePolicyScreen = () => {

    const navigation = useNavigation();
    const text1 = "Ứng dụng cung cấp nền tảng công nghệ Ứng dụng; qua đó Người Dùng có nhu cầu sử dụng dịch vụ vận chuyển có thể sử dụng Ứng dụng và Hệ thống của chúng tôi để được kết nối trực tiếp tới các Đối tác Giao hàng để có thể sử dụng dịch vụ. Khi sử dụng Hệ thống và Ứng dụng của chúng tôi, Chúng tôi hiểu rằng Người Dùng đã đọc, tìm hiểu, chấp nhận, và đồng ý sử dụng Hệ thống và Ứng dụng của chúng tôi theo các Điều kiện và Điều khoản này. Điều khoản và Chính sách này có thể thay thế bất kỳ thỏa thuận, thương lượng khác với chủ đề liên quan. Trừ trường hợp app và Người Dùng có ký kết một thỏa thuận khác, những Điều khoản và Điều kiện này sẽ được ưu tiên áp dụng hơn bất kỳ trao đổi và thỏa thuận nào giữa chúng tôi và Người Dùng, dù bằng văn bản hay lời nói.";
    const text2 = "Vui lòng đọc kỹ các Điều Khoản này trước khi truy cập hoặc sử dụng Nền Tảng. Các Điều Khoản này cho dù được nêu hay được tham chiếu theo cách khác ở đây đều quy định các quyền và nghĩa vụ và tạo thành một thỏa thuận pháp lý giữa chúng tôi và Người Dùng.";
    const text3 = "Bằng cách sử dụng hoặc truy cập Nền Tảng, Người Dùng xác nhận rõ ràng rằng:";
    const text4 = "* Người Dùng đã đọc và hiểu Điều Khoản này;";
    const text5 = "* Người Dùng sẽ tuân thủ Điều Khoản này;";
    const text6 = "* Người Dùng sẽ tuân thủ Nguyên Tắc Cộng Đồng;";
    const text7 = "* Người Dùng ít nhất đã đủ tuổi thành niên theo quy định pháp luật tại nơi cư trú và có đủ năng lực hành vi dân sự để ký kết tham gia vào các hợp đồng.";
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={IMAGES.back_icon} style={styles.back_button} onPress={() => {navigation.goBack()}}/>
                <Text style={styles.title_header}>Chính sách người dùng</Text>
            </View>

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_content}>{text1}</Text>
                    <Text style={styles.text_content}>{text2}</Text>
                    <Text style={styles.text_content}>{text3}</Text>
                    <Text style={styles.sub_text_content}>{text4}</Text>
                    <Text style={styles.sub_text_content}>{text5}</Text>
                    <Text style={styles.sub_text_content}>{text6}</Text>
                    <Text style={styles.sub_text_content}>{text7}</Text>
                    <Text style={styles.text_content}>{text1}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PrivatePolicyScreen