import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export default function CustomInput({ label, required = true, ...props }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#FFF8DC', // Light yellowish background
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    fontSize: 16,
    color: '#000',
  },
});