import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style.js';
import { IMAGES } from '../../../assets/images/index.js';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

const PrivatePolicyScreen = () => {

    const navigation = useNavigation();
    const text1 = "Chào mừng bạn đến với ShipMate! Chúng tôi cam kết cung cấp dịch vụ giao hàng chất lượng và tin cậy. Để đảm bảo quyền lợi và trách nhiệm của cả hai bên, vui lòng đọc kỹ chính sách người dùng dưới đây.";
    const text2 = "Khi đăng ký tài khoản, chúng tôi sẽ yêu cầu bạn cung cấp các thông tin cá nhân như họ tên, số điện thoại, địa chỉ email, và địa chỉ giao hàng.";
    const text3 = "Chúng tôi sẽ lưu trữ thông tin về các đơn hàng bạn đặt, bao gồm sản phẩm, giá trị đơn hàng, và lịch sử giao dịch.";
    const text4 = "Cải Thiện Dịch Vụ: Thông tin của bạn sẽ được sử dụng để cải thiện chất lượng dịch vụ, bao gồm việc theo dõi và phân tích dữ liệu để tối ưu hóa quy trình giao hàng.";
    const text5 = "Liên Hệ và Hỗ Trợ: Chúng tôi có thể sử dụng thông tin liên lạc của bạn để gửi thông báo về đơn hàng, cung cấp hỗ trợ khách hàng, và thông báo về các chương trình khuyến mãi.";
    const text6 = "Bảo Mật: Thông tin cá nhân của bạn sẽ được bảo mật và không chia sẻ với bên thứ ba mà không có sự đồng ý của bạn, trừ khi được yêu cầu bởi pháp luật.";
    const text7 = "Thông Tin Chính Xác: Bạn có trách nhiệm cung cấp thông tin chính xác và cập nhật khi đăng ký và sử dụng dịch vụ.";
    const text8 = "Bảo Vệ Tài Khoản: Bạn có trách nhiệm bảo mật tài khoản và không chia sẻ thông tin đăng nhập với người khác. Mọi hoạt động từ tài khoản của bạn sẽ được coi là do bạn thực hiện.";
    const text9 = "Kiểm Soát Thông Tin: Bạn có quyền truy cập, chỉnh sửa, và xóa thông tin cá nhân của mình bất cứ lúc nào.";
    const text10 = "Bảo Vệ Quyền Lợi: Nếu bạn gặp bất kỳ vấn đề gì với dịch vụ của chúng tôi, hãy liên hệ với đội ngũ hỗ trợ khách hàng để được giải quyết kịp thời.";
    const text11 = "Chất Lượng Dịch Vụ: Chúng tôi cam kết cung cấp dịch vụ giao hàng nhanh chóng, an toàn và đúng hẹn.";
    const text12 = "Bảo Mật Thông Tin: Chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt để bảo vệ thông tin cá nhân của bạn.";
    const text13 = "Giải Quyết Khiếu Nại: Mọi khiếu nại của khách hàng sẽ được giải quyết trong thời gian ngắn nhất có thể.";
    const text14 = "Cập Nhật Chính Sách: ShipMate có quyền cập nhật và thay đổi chính sách người dùng này bất cứ lúc nào. Mọi thay đổi sẽ được thông báo trên ứng dụng của chúng tôi.";
    const text15 = "Điều Khoản Chung: Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện của chính sách người dùng này.";
    const text16 = "Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách người dùng, vui lòng liên hệ với chúng tôi qua email: support@shipmate.com hoặc số điện thoại: 1800-1234.";
    const text17 = "ShipMate - Giao Hàng Nhanh, An Toàn và Tin Cậy.";


    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={IMAGES.back_icon} style={styles.back_button} />
                </TouchableOpacity>
                <Text style={styles.title_header}>Chính sách người dùng</Text>
            </View> */}

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>1. GIỚI THIỆU</Text>
                        <Text style={styles.text_content}>{text1}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>2. THU THẬP THÔNG TIN</Text>
                        <Text style={styles.text_content}>{text2}</Text>
                        <Text style={styles.text_content}>{text3}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>3. SỬ DỤNG THÔNG TIN</Text>
                        <Text style={styles.text_content}>{text4}</Text>
                        <Text style={styles.text_content}>{text5}</Text>
                        <Text style={styles.text_content}>{text6}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>4. TRÁCH NHIỆM CỦA NGƯỜI DÙNG</Text>
                        <Text style={styles.text_content}>{text7}</Text>
                        <Text style={styles.text_content}>{text8}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>5. QUYỀN LỢI CỦA NGƯỜI DÙNG</Text>
                        <Text style={styles.text_content}>{text9}</Text>
                        <Text style={styles.text_content}>{text10}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>6. TRÁCH NHIỆM CỦA SHIPMATE</Text>
                        <Text style={styles.text_content}>{text11}</Text>
                        <Text style={styles.text_content}>{text12}</Text>
                        <Text style={styles.text_content}>{text13}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>7. ĐIỀU KHOẢN SỬ DỤNG</Text>
                        <Text style={styles.text_content}>{text14}</Text>
                        <Text style={styles.text_content}>{text15}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: verticalScale(10) }}>
                        <Text>8. LIÊN HỆ</Text>
                        <Text style={styles.text_content}>{text16}</Text>
                    </View>

                    <Text style={{textAlign: 'center'}}>{text17}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PrivatePolicyScreen