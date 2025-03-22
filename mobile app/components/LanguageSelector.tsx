import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = {
  en: 'English',
  hi: 'हिंदी',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം'
};

export default function LanguageSelector({ selectedLanguage, onLanguageChange }: Props) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={onLanguageChange}
        style={styles.picker}
      >
        {Object.entries(languages).map(([code, name]) => (
          <Picker.Item key={code} label={name} value={code} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8DC',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DAA520',
  },
  picker: {
    height: 50,
    color: '#000',
  },
});