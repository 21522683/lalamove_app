import { View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import styles from './style'
import { IMAGES } from '../../../assets/images'
import ItemDriver from './ItemDriver'

const DriverManageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý tài xế</Text>
      </View>
      <View style={styles.search_bar}>
          <TextInput style={styles.search_input} placeholder='Nhập tên tài xế để tìm kiếm'/>
          <Image source={IMAGES.search_icon} style={styles.icon_search}/>
        </View>

        <Text style={styles.title_list}>DANH SÁCH TÀI XẾ</Text>

        <ScrollView style={styles.list_diver}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item, index) => {
              return (
                <ItemDriver key={index}/>
              )
            })
          }
        </ScrollView>
    </SafeAreaView>
  )
}

export default DriverManageScreen