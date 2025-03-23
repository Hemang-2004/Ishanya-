"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useLanguage, type Language } from "../context/LanguageContext"

export default function LanguageSelector() {
  const [modalVisible, setModalVisible] = useState(false)
  const { language, setLanguage } = useLanguage()

  const languages = [
    { id: "english", name: "English" },
    { id: "hindi", name: "हिन्दी" },
    { id: "malayalam", name: "മലയാളം" },
    { id: "tamil", name: "தமிழ்" },
    { id: "kannada", name: "ಕನ್ನಡ" },
  ]

  const getLanguageShortName = () => {
    switch (language) {
      case "english":
        return "EN"
      case "hindi":
        return "HI"
      case "malayalam":
        return "ML"
      case "tamil":
        return "TA"
      case "kannada":
        return "KA"
      default:
        return "EN"
    }
  }

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setModalVisible(false)
  }

  return (
    <>
      <Pressable style={styles.languageButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.languageText}>{getLanguageShortName()}</Text>
        <MaterialIcons name="arrow-drop-down" size={16} color="#333" />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.languageItem, language === item.id && styles.selectedLanguage]}
                  onPress={() => handleLanguageSelect(item.id as Language)}
                >
                  <Text style={[styles.languageItemText, language === item.id && styles.selectedLanguageText]}>
                    {item.name}
                  </Text>
                  {language === item.id && <MaterialIcons name="check" size={20} color="#408c4c" />}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedLanguage: {
    backgroundColor: "rgba(64, 140, 76, 0.1)",
  },
  languageItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  selectedLanguageText: {
    fontWeight: "bold",
    color: "#408c4c",
  },
})

