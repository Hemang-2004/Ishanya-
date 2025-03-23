"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, ScrollView } from "react-native"
// import { supabase } from "../lib/supabase"
import { FontAwesome5 } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { translations } from "../constants/translations"
import { useNavigation } from "@react-navigation/native"

export default function LoginForm() {
  const navigation = useNavigation()
  const [language, setLanguage] = useState("en")
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    // Make name and email lowercase for case insensitivity
    if (field === "name" || field === "email") {
      value = value.toLowerCase()
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name) {
      newErrors.name = t.required
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t.required
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format"
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t.required
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function signInWithEmail() {
    if (!validateForm()) {
      Alert.alert("Form Error", "Please fill all required fields correctly.")
      return
    }

    setLoading(true)
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: formData.email,
    //   password: formData.password,
    // })

    // if (error) {
    //   Alert.alert("Error", error.message)
    // } else {
    //   Alert.alert("Success", "Logged in successfully!")
    //   // Navigate to home screen or dashboard
    // }
    // setLoading(false)
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic
    Alert.alert("Forgot Password", "Please enter your email to reset your password")
  }

  const handleRegister = () => {
    // Navigate to registration screen
    navigation.navigate('RegistrationForm')
  }

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Language Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Language:</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={language} onValueChange={(value) => setLanguage(value)} style={styles.picker}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="हिंदी" value="hi" />
              <Picker.Item label="ಕನ್ನಡ" value="kn" />
              <Picker.Item label="മലയാളം" value="ml" />
              <Picker.Item label="தமிழ்" value="ta" />
            </Picker>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="user-circle" size={60} color="#8B4513" />
            <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Bold", fontSize: 24, marginTop: 16 }]}>
              {t.login || "Login"}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.name || "Name"}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder={t.name || "Name"}
              autoCapitalize="none"
            />
            {errors.name && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{errors.name}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.email || "Email"}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder={t.email || "Email"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.password || "Password"}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              placeholder={t.password || "Password"}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.forgotPasswordLink} onPress={handleForgotPassword}>
            <Text style={[styles.forgotPasswordText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.forgot_password || "Forgot Password?"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={signInWithEmail} disabled={loading}>
            <Text style={[styles.submitButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {loading ? t.loggingIn || "Logging in..." : t.login || "Login"}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.dont_have_account || "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={[styles.registerLink, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {t.register || "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollViewContent: {
    marginTop: 35,
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: "#FFF8DC", // Light yellowish background
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Black text
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#000", // Black text
    marginBottom: 8,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#FFFAF0", // Floral white background
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    fontSize: 16,
    color: "#000", // Black text
    height: 48, // Fixed height for uniformity
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    borderRadius: 6,
    backgroundColor: "#FFFAF0", // Floral white background
    height: 48, // Fixed height for uniformity
    justifyContent: "center",
    overflow: "hidden",
  },
  picker: {
    height: 58,
    color: "#000", // Black text
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#8B4513", // Dark brown color
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#408c4c", // Green color (same as registration form)
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: 320, // Set the width here
    alignSelf: "center", // Center the button horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#000",
    marginRight: 5,
  },
  registerLink: {
    color: "#8B4513", // Dark brown color
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
})

