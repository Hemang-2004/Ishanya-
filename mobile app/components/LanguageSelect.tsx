import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'தமிழ்' }
];

interface Props {
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
}

export default function LanguageSelect({ selectedLanguage, onSelectLanguage }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.buttonText}>
          {languages.find(lang => lang.code === selectedLanguage)?.name}
        </Text>
        <MaterialIcons name={isOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="white" />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdown}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.languageOption}
              onPress={() => {
                onSelectLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <Text style={styles.languageText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginRight: 5,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageOption: {
    padding: 10,
    minWidth: 100,
  },
  languageText: {
    fontSize: 16,
  },
});