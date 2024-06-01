import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { IMAGES } from '../../../assets/images'
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import CUSTOM_COLOR from '../../../constants/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


const DetailReviewDriverScreen = () => {

  const navigation = useNavigation();
  const [showDialog, setShowDialog] = useState(false);
  const [valueReject, setValueReject] = useState("");

  const handleSend = () => {

  }

  const handleClose = () => {
    setShowDialog(false)
  }

  const [selectedOption, setSelectedOption] = useState('Hồ sơ');

  const options = [
    { label: 'Hồ sơ', value: 'Hồ sơ' },
    { label: 'Giấy tờ xe', value: 'Giấy tờ xe' },
    { label: 'Phương tiện', value: 'Phương tiện' }
  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={IMAGES.arrow_back} style={styles.back_button} onPress={() => {
          navigation.goBack()
        }} />
        <Text style={styles.title_header}>Thông tin chi tiết tài xế</Text>
      </View>
      <View style={styles.tab_nav_container}>
        {
          options.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleSelect(item.value)} style={styles.btn_tab} activeOpacity={0.7}>
                <View style={selectedOption === item.value ? styles.item_tab_active : styles.item_tab}>
                  <Text style={selectedOption === item.value ? styles.text_tab_active : styles.text_tab}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

      {
        selectedOption === 'Hồ sơ' && (
          <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
            <View style={styles.container_avatar}>
              <Text style={styles.title_text}>Hình đại diện</Text>
              <Image source={IMAGES.avatar} style={styles.avatar} />
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Họ tên</Text>
              <Text style={styles.content_text}>Phan Trọng Tính</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>CMND / CCCD</Text>
              <Text style={styles.content_text}>096203012684</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Ngày sinh</Text>
              <Text style={styles.content_text}>15/08/2003</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Địa chỉ</Text>
              <Text style={styles.content_text}>Tp.Hồ Chí Minh</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Số điện thoại</Text>
              <Text style={styles.content_text}>0379361210</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Email</Text>
              <Text style={styles.content_text}>phantrongtinh1508@gmail.com</Text>
            </View>

            <View style={styles.container_text}>
              <Text style={styles.title_text}>Trạng thái</Text>
              <Text style={styles.status_text}>Chưa xét duyệt</Text>
            </View>

            <View style={styles.container_img}>
              <Text style={styles.title_text}>Hình ảnh căn cước công dân</Text>
              <Image source={IMAGES.cccd} style={styles.img} />
            </View>

            <View style={styles.container_button}>
              <TouchableOpacity style={styles.btn_accept}>
                <Text style={styles.text_btn}>Duyệt</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
                <Text style={styles.text_btn}>Từ chối</Text>
              </TouchableOpacity>
            </View>

            {
              showDialog && (
                <Dialog.Container visible={true}>
                  <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
                  <Dialog.Description>
                    Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
                  </Dialog.Description>
                  <Dialog.Input />
                  <Dialog.Button label="Đóng" onPress={handleClose} />
                  <Dialog.Button label="Gửi đi" onPress={handleSend} />
                </Dialog.Container>
              )
            }

          </ScrollView>
        )
      }

      {
        selectedOption === 'Giấy tờ xe' && (
          <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
            {
              [1, 2, 3, 4, 5].map(() => {
                return (
                  <View style={{ borderWidth: 2, borderColor: CUSTOM_COLOR.Primary, borderRadius: 4, padding: 20, marginVertical: 10 }}>
                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Trạng thái</Text>
                      <Text style={styles.status_text_2}>Chưa xét duyệt</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Mã số</Text>
                      <Text style={styles.content_text_2}>42534523434</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Loại</Text>
                      <Text style={styles.content_text_2}>A1</Text>
                    </View>

                    <View style={styles.container_img_2}>
                      <Text style={styles.title_text_2}>Hình ảnh GPLX</Text>
                      <Image source={IMAGES.gplx} style={styles.img} />
                    </View>

                    <View style={styles.container_button}>
                      <TouchableOpacity style={styles.btn_accept}>
                        <Text style={styles.text_btn}>Duyệt</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
                        <Text style={styles.text_btn}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                    {
                      showDialog && (
                        <Dialog.Container visible={true}>
                          <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
                          <Dialog.Description>
                            Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
                          </Dialog.Description>
                          <Dialog.Input />
                          <Dialog.Button label="Đóng" onPress={handleClose} />
                          <Dialog.Button label="Gửi đi" onPress={handleSend} />
                        </Dialog.Container>
                      )
                    }
                  </View>
                )
              })
            }

          </ScrollView>
        )
      }

      {
        selectedOption === 'Phương tiện' && (
          <ScrollView style={styles.scroll_body} showsVerticalScrollIndicator={false}>
            {
              [1, 2, 3, 4, 5].map(() => {
                return (
                  <View style={{ borderWidth: 2, borderColor: CUSTOM_COLOR.Primary, borderRadius: 4, padding: 20, marginVertical: 10 }}>
                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Trạng thái</Text>
                      <Text style={styles.status_text_2}>Chưa xét duyệt</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Tên xe</Text>
                      <Text style={styles.content_text_2}>Honda Future 125Fi</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Loại xe</Text>
                      <Text style={styles.content_text_2}>Xe máy</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Biển số xe</Text>
                      <Text style={styles.content_text_2}>2k2345234</Text>
                    </View>

                    <View style={styles.container_img_2}>
                      <Text style={styles.title_text_2}>Hình ảnh xe</Text>
                      <Image source={IMAGES.xemayprevorder} style={styles.img} />
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Tải trọng tối đa</Text>
                      <Text style={styles.content_text_2}>30kg</Text>
                    </View>

                    <View style={styles.container_text_2}>
                      <Text style={styles.title_text_2}>Kích thước</Text>
                      <Text style={styles.content_text_2}>50cm x 40cm x 50cm</Text>
                    </View>

                    <View style={{flexDirection: 'column', marginVertical: verticalScale(8)}}>
                      <Text style={styles.title_text_2}>Phù hợp cho:</Text>
                      <View style={{padding: moderateScale(10), borderColor: '#d7d7d7', borderWidth: 1, borderRadius: 6, marginTop: verticalScale(8)}}>
                        <Text style={{color: '#5A5A5A'}}>Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ kiện.</Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'column', marginVertical: verticalScale(8)}}>
                      <Text style={styles.title_text_2}>Ghi chú:</Text>
                      <View style={{padding: moderateScale(10), borderColor: '#d7d7d7', borderWidth: 1, borderRadius: 6, marginTop: verticalScale(8)}}>
                        <Text style={{color: '#5A5A5A'}}>Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích thước hàng hóa, khả năng nhận đơn của đối tác tài xế, phí cầu đường, các phụ phí,... Vì vậy tổng giá dịch vụ có thể thay đổi. Giá hiển thị tại thời điểm đặt đơn có thể không giữ nguyên nếu có thay đổi về chi tiết đơn hàng.</Text>
                      </View>
                    </View>

                    <View style={styles.container_button}>
                      <TouchableOpacity style={styles.btn_accept}>
                        <Text style={styles.text_btn}>Duyệt</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.btn_reject} onPress={() => setShowDialog(true)}>
                        <Text style={styles.text_btn}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                    {
                      showDialog && (
                        <Dialog.Container visible={true}>
                          <Dialog.Title>Thông báo đến người dùng</Dialog.Title>
                          <Dialog.Description>
                            Vui lòng nhập lý do từ chối đơn xét duyệt này, hệ thống sẽ gửi đến người dùng.
                          </Dialog.Description>
                          <Dialog.Input />
                          <Dialog.Button label="Đóng" onPress={handleClose} />
                          <Dialog.Button label="Gửi đi" onPress={handleSend} />
                        </Dialog.Container>
                      )
                    }
                  </View>
                )
              })
            }
          </ScrollView>
        )
      }

    </SafeAreaView>
  )
}

export default DetailReviewDriverScreen