import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style.js'

const Dropdown = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('Theo ngày');

  const options = [
    { label: 'Theo ngày', value: 'Theo ngày' },
    { label: 'Theo tháng', value: 'Theo tháng' },
    { label: 'Theo năm', value: 'Theo năm' }
  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option.value && styles.selectedOption
          ]}
          onPress={() => handleSelect(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Dropdown;
