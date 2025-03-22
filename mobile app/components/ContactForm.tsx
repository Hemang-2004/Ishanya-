import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';
import { useLanguage } from './LanguageContext';
import { translations } from '../constants/translations';
import Toast from 'react-native-toast-message';
import RadioForm from 'react-native-simple-radio-button';

export default function ContactForm() {
  const { language } = useLanguage();
  const t = translations[language];
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    gender: 'male',
    termsAccepted: false,
    subscribe: false,
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message || !form.termsAccepted) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields and accept the terms.',
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Message sent successfully!',
    });
    setForm({
      name: '',
      email: '',
      message: '',
      gender: 'male',
      termsAccepted: false,
      subscribe: false,
    });
  };

  const radioOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View style={styles.footerContainer}>
      <Text style={[styles.title, { fontFamily: 'JosefinSans-Bold', fontSize: 24 }]}>{t.contact_us}</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder={t.name}
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder={t.email}
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />

      {/* Gender Selection */}
      {/* <Text style={styles.label}>Gender</Text>
      <RadioForm
        radio_props={radioOptions}
        initial={0}
        formHorizontal
        labelStyle={styles.radioLabel}
        buttonSize={10} 
        onPress={(value) => setForm((prev) => ({ ...prev, gender: value }))}
      /> */}

      {/* Message Input */}
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder={t.message}
        value={form.message}
        onChangeText={(text) => setForm((prev) => ({ ...prev, message: text }))}
        multiline
      />

      {/* Checkboxes */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={form.termsAccepted}
          onValueChange={(value) => setForm((prev) => ({ ...prev, termsAccepted: value }))}
        />
        <Text style={styles.checkboxLabel}>Accept Terms & Conditions</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={form.subscribe}
          onValueChange={(value) => setForm((prev) => ({ ...prev, subscribe: value }))}
        />
        <Text style={styles.checkboxLabel}>Subscribe to Newsletter</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t.submit}</Text>
      </TouchableOpacity>

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} Ishanya Connect Pvt. Ltd.
      </Text>
      <Text style={styles.copyright}>Ishanya India Foundation (IIF) All rights reserved.</Text>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    padding: 20,
    backgroundColor: '#2c2c2c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Josefin Sans',
    fontWeight: '600',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: 'Josefin Sans',
    fontSize: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ff9c04',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Josefin Sans',
    fontWeight: '600',
  },
  radioLabel: {
    fontSize: 14,
    color: 'white',
    marginRight: 20,
  },
  label: {
    fontSize: 14,
    color: 'white',
    marginBottom: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '90%',
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  copyright: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Josefin Sans',
    marginTop: 10,
  },
});
