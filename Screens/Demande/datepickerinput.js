import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DatePickerInput = ({ value, onChange, style }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate !== undefined) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePicker} style={styles.input}>
        <Text style={styles.text}>{value ? value.toDateString() : 'Select Date'}</Text>
        <MaterialIcons name="date-range" size={24} color="black" />
      </TouchableOpacity>
      {showPicker && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="date"
          onChange={handleDateChange}
          style={style}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '88%',
    height: 50,
    
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default DatePickerInput;
