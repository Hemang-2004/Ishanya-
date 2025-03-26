"use client"

import { useState } from "react"
// import { Alert } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import * as DocumentPicker from "expo-document-picker"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { RadioButton } from "react-native-paper"
import { translations } from "../constants/translations"

export default function RegistrationForm() {
  const [language, setLanguage] = useState("en")
  const t = translations[language]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: new Date(),
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    udidDocument: null,
    aadharCard: null,
    photo: null,
    medicalCertificate: null,
    currentLevel: "",
    status: "active",
    primaryDiagnosis: "",
    comorbidity: "",
    bloodGroup: "",
    allergies: "",
    transportNeeded: "",
    learningStyle: "",
    communicationStyle: "",
    parentIncome: "",
    appointmentDate: new Date(),
    appointmentTime: new Date(),
    specialRequest: "",
  })

  const [errors, setErrors] = useState({})
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showAppointmentDatePicker, setShowAppointmentDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [parsedDocumentData, setParsedDocumentData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [field, setField] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  // Document parser function
  const parseDocument = async (uri, type) => {
    try {
      setIsLoading(true)
      console.log(`Parsing document: ${uri}, type: ${type}`)

      // For Aadhar card parsing, use the API
      if (type === "aadhar") {
        // Create a FormData object to send the file
        const formData = new FormData()

        // Get the file name from URI
        const fileName = uri.split("/").pop() || "aadhar.jpg"

        // Determine file type (mime type)
        const fileType = fileName.endsWith(".pdf")
          ? "application/pdf"
          : fileName.endsWith(".png")
            ? "image/png"
            : fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")
              ? "image/jpeg"
              : "application/octet-stream"

        // Append the file to FormData
        formData.append("file", {
          uri: uri,
          name: fileName,
          type: fileType,
        })

        // Send the request to the API
        const response = await fetch("http://192.168.109.54:5000/auth/parse_aadhar", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Error parsing Aadhar: ${response.statusText}`)
        }

        // Parse the response
        const extractedData = await response.json()
        console.log("Parsed Aadhar data:", extractedData)

        // Update the form with extracted data
        setFormData((prev) => ({
          ...prev,
          firstName: extractedData.first_name || prev.firstName,
          lastName: extractedData.last_name || prev.lastName,
          address: extractedData.address || prev.address,
          // Convert string date to Date object if available
          dob: extractedData.date_of_birth ? new Date(extractedData.date_of_birth) : prev.dob,
          gender:
            extractedData.gender === "Male"
              ? "M"
              : extractedData.gender === "Female"
                ? "F"
                : extractedData.gender === "Other"
                  ? "O"
                  : prev.gender,
        }))

        setParsedDocumentData(extractedData)
        Alert.alert("Aadhar Parsed", "Information has been extracted and filled in the form.")

        return extractedData
      }
      // Placeholder for UDID document parsing (to be implemented)
      else if (type === "udid") {
        // This is just a placeholder for future implementation
        console.log("UDID document parsing will be implemented in the future")

        // Simulate parsing with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        Alert.alert("UDID Document", "UDID document uploaded successfully. Parsing will be implemented soon.")

        return null
      }
      // Placeholder for medical certificate parsing (to be implemented)
      else if (type === "medical") {
        // This is just a placeholder for future implementation
        console.log("Medical certificate parsing will be implemented in the future")

        // Simulate parsing with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        Alert.alert(
          "Medical Certificate",
          "Medical certificate uploaded successfully. Parsing will be implemented soon.",
        )

        return null
      }

      return null
    } catch (error) {
      console.error("Error parsing document:", error)
      Alert.alert("Error", "Failed to parse document. Please try again or fill the form manually.")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const pickDocument = async (field) => {
    try {
      let documentType = ""
      let fileTypes = []

      // Set document type and allowed file types based on field
      switch (field) {
        case "aadharCard":
          documentType = "Aadhar Card"
          fileTypes = ["image/*"] // Only images for Aadhar
          break
        case "udidDocument":
          documentType = "UDID Document"
          fileTypes = ["application/pdf"] // Only PDF for UDID
          break
        case "medicalCertificate":
          documentType = "Medical Certificate"
          fileTypes = ["application/pdf"] // Only PDF for Medical Certificate
          break
        case "photo":
          documentType = "Photo"
          fileTypes = ["image/*"] // Only images for Photo
          break
        default:
          fileTypes = ["image/*", "application/pdf"]
      }

      // Allow only specified file types
      const result = await DocumentPicker.getDocumentAsync({
        type: fileTypes,
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        const uri = result.assets[0].uri
        const fileType = result.assets[0].mimeType

        setFormData((prev) => ({ ...prev, [field]: uri }))

        // Check if the file type is correct
        const isCorrectType = fileTypes.some((type) => {
          if (type === "image/*") return fileType.startsWith("image/")
          return type === fileType
        })

        if (!isCorrectType) {
          Alert.alert(
            "Invalid File Type",
            `Please upload a ${field === "photo" || field === "aadharCard" ? "valid image file" : "PDF file"} for ${documentType}`,
          )
          return
        }

        // Determine document type based on field for parsing
        const docType =
          field === "aadharCard"
            ? "aadhar"
            : field === "udidDocument"
              ? "udid"
              : field === "medicalCertificate"
                ? "medical"
                : "other"

        // Parse the document
        setField(field)
        await parseDocument(uri, docType)
      }
    } catch (error) {
      console.error("Error picking document:", error)
      Alert.alert("Error", "Failed to select document. Please try again.")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // All fields are required
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field] &&
        field !== "comorbidity" &&
        field !== "allergies" &&
        field !== "bloodGroup" &&
        field !== "specialRequest"
      ) {
        newErrors[field] = t.required
      }
    })

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const navigation = useNavigation()

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Create FormData object for form-data submission (not multipart/form-data)
        const formDataToSend = new FormData()

        // Add required fields with EXACT field names expected by the backend
        formDataToSend.append("FirstName", formData.firstName)
        formDataToSend.append("LastName", formData.lastName)
        formDataToSend.append("Gender", formData.gender)
        formDataToSend.append("EmailID", formData.email)
        formDataToSend.append("Password", formData.password)

        // Add optional fields if they exist
        if (formData.dob) formDataToSend.append("DateOfBirth", formatDate(formData.dob))
        if (formData.contact) formDataToSend.append("ContactNumber", formData.contact)
        if (formData.address) formDataToSend.append("Address", formData.address)
        if (formData.transportNeeded) formDataToSend.append("Transport", formData.transportNeeded)
        if (formData.currentLevel) formDataToSend.append("CurrentLevel", formData.currentLevel)
        if (formData.status) formDataToSend.append("Status", formData.status)
        if (formData.primaryDiagnosis) formDataToSend.append("PrimaryDiagnosis", formData.primaryDiagnosis)
        if (formData.comorbidity) formDataToSend.append("Comorbidity", formData.comorbidity)
        if (formData.bloodGroup) formDataToSend.append("BloodGroup", formData.bloodGroup)
        if (formData.allergies) formDataToSend.append("Allergies", formData.allergies)
        if (formData.learningStyle) formDataToSend.append("LearningStyle", formData.learningStyle)
        if (formData.communicationStyle)
          formDataToSend.append("PreferredCommunicationStyle", formData.communicationStyle)
        if (formData.parentIncome) formDataToSend.append("ParentAnnualIncome", formData.parentIncome)

        // Add appointment details
        if (formData.appointmentDate) formDataToSend.append("AppointmentDate", formatDate(formData.appointmentDate))
        if (formData.appointmentTime)
          formDataToSend.append("AppointmentTime", formatTime(formData.appointmentTime, true))

        // Add file uploads if they exist
        if (formData.udidDocument) {
          const fileName = formData.udidDocument.split("/").pop() || "udid_document"
          formDataToSend.append("UDID", {
            uri: formData.udidDocument,
            type: "application/pdf",
            name: fileName,
          })
        }

        if (formData.aadharCard) {
          const fileName = formData.aadharCard.split("/").pop() || "aadhar_card"
          formDataToSend.append("idProof", {
            uri: formData.aadharCard,
            type: "image/jpeg",
            name: fileName,
          })
        }

        if (formData.medicalCertificate) {
          const fileName = formData.medicalCertificate.split("/").pop() || "medical_certificate"
          formDataToSend.append("MedicalCertificate", {
            uri: formData.medicalCertificate,
            type: "application/pdf",
            name: fileName,
          })
        }

        if (formData.photo) {
          const fileName = formData.photo.split("/").pop() || "photo.jpg"
          formDataToSend.append("Photo", {
            uri: formData.photo,
            type: "image/jpeg",
            name: fileName,
          })
        }

        // Log the form data for debugging
        console.log("Sending form data to backend:", JSON.stringify(formDataToSend))

        // Make the API request to your Flask backend
        const response = await fetch("http://192.168.109.54:5000/auth/register/student", {
          method: "POST",
          body: formDataToSend,
        })

        // Parse the response
        const responseData = await response.json()

        if (response.ok) {
          Alert.alert("Success", "Registration successful!")
          console.log("API Response:", responseData)

          // ✅ Navigate to Home after successful registration
          navigation.navigate("RegistrationSuccess")
        } else {
          Alert.alert("Error", responseData.error || "Failed to register. Please try again.")
          console.error("API Error Response:", responseData)
        }
      } catch (error) {
        console.error("API Request Error:", error)
        Alert.alert("Error", "An error occurred while submitting the form. Please check your connection and try again.")
      }
    } else {
      Alert.alert("Form Error", "Please fill all required fields correctly.")
    }
  }

  // Helper function to format DateOfBirth as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const formatTime = (date, use24Hour = false) => {
    if (use24Hour) {
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${hours}:${minutes}`
    } else {
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"

      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'

      return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`
    }
  }

  // const formatDate = (date) => {
  //   return date.toLocaleDateString('en-US', {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric'
  //   });
  // };

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

        {/* Document Upload Section at the top */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Bold", fontSize: 20 }]}>
            {t.uploadDocuments}
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument("udidDocument")}
            disabled={isLoading}
          >
            <FontAwesome5 name="id-card" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.uploadUDID} (PDF only){" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            {formData.udidDocument && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument("aadharCard")} disabled={isLoading}>
            <FontAwesome5 name="id-card" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.uploadAadhar} (Image only - JPG, PNG){" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            {formData.aadharCard && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
            {isLoading && field === "aadharCard" && (
              <ActivityIndicator size="small" color="#0000ff" style={styles.loadingIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument("medicalCertificate")}
            disabled={isLoading}
          >
            <FontAwesome5 name="file-medical" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              Upload Medical Certificate (PDF only){" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            {formData.medicalCertificate && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument("photo")} disabled={isLoading}>
            <FontAwesome5 name="camera" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.uploadPhoto} (Image only - JPG, PNG){" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            {formData.photo && <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />}
          </TouchableOpacity>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Regular", fontSize: 20 }]}>{t.basicInfo}</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.firstName}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.firstName ? styles.inputError : null]}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              placeholder={t.firstName}
            />
            {errors.firstName && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.firstName}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.lastName} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.lastName ? styles.inputError : null]}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              placeholder={t.lastName}
            />
            {errors.lastName && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.lastName}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.address} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.address ? styles.inputError : null]}
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              placeholder={t.address}
              multiline
              numberOfLines={3}
            />
            {errors.address && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.address}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.dob} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={{ fontFamily: "JosefinSans-Regular", fontSize: 15 }}>
                {formData.dob.toLocaleDateString()}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.contact} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.contact ? styles.inputError : null]}
              value={formData.contact}
              onChangeText={(text) => handleInputChange("contact", text)}
              placeholder={t.contact}
              keyboardType="phone-pad"
            />
            {errors.contact && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.contact}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.email} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder={t.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.password} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              placeholder={t.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.password}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.confirmPassword}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange("confirmPassword", text)}
              placeholder={t.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.gender} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="M"
                  status={formData.gender === "M" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("gender", "M")}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.male}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="F"
                  status={formData.gender === "F" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("gender", "F")}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.female}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="other"
                  status={formData.gender === "O" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("gender", "O")}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.other}</Text>
              </View>
            </View>
            {errors.gender && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.gender}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.transportNeeded}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="yes"
                  status={formData.transportNeeded === "yes" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("transportNeeded", "yes")}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.yes}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="no"
                  status={formData.transportNeeded === "no" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("transportNeeded", "no")}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.no}</Text>
              </View>
            </View>
            {errors.transportNeeded && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.transportNeeded}
              </Text>
            )}
          </View>
        </View>

        {/* Educational Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Bold", fontSize: 20 }]}>{t.educationInfo}</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.currentLevel}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.currentLevel ? styles.inputError : null]}
              value={formData.currentLevel}
              onChangeText={(text) => handleInputChange("currentLevel", text)}
              placeholder={t.currentLevel}
            />
            {errors.currentLevel && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.currentLevel}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.status} <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                style={styles.picker}
              >
                <Picker.Item label={t.active} value="active" />
                <Picker.Item label={t.discontinued} value="discontinued" />
                <Picker.Item label={t.temporaryBreak} value="temporaryBreak" />
              </Picker>
            </View>
            {errors.status && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.status}
              </Text>
            )}
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Regular", fontSize: 20 }]}>
            {t.medicalInfo}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.primaryDiagnosis}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.primaryDiagnosis ? styles.inputError : null]}
              value={formData.primaryDiagnosis}
              onChangeText={(text) => handleInputChange("primaryDiagnosis", text)}
              placeholder={t.primaryDiagnosis}
            />
            {errors.primaryDiagnosis && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.primaryDiagnosis}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.comorbidity}</Text>
            <TextInput
              style={styles.input}
              value={formData.comorbidity}
              onChangeText={(text) => handleInputChange("comorbidity", text)}
              placeholder={t.comorbidity}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.bloodGroup}</Text>
            <TextInput
              style={styles.input}
              value={formData.bloodGroup}
              onChangeText={(text) => handleInputChange("bloodGroup", text)}
              placeholder={t.bloodGroup}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.allergies}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.allergies}
              onChangeText={(text) => handleInputChange("allergies", text)}
              placeholder={t.allergies}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Learning Profile */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: "JosefinSans-Regular", fontSize: 20 }]}>
            {t.learningProfile}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.learningStyle}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.learningStyle}
                onValueChange={(value) => handleInputChange("learningStyle", value)}
                style={styles.picker}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label={t.visual} value="visual" />
                <Picker.Item label={t.auditory} value="auditory" />
                <Picker.Item label={t.other} value="other" />
              </Picker>
            </View>
            {errors.learningStyle && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.learningStyle}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.communicationStyle}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.communicationStyle}
                onValueChange={(value) => handleInputChange("communicationStyle", value)}
                style={styles.picker}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label={t.verbal} value="verbal" />
                <Picker.Item label={t.nonVerbal} value="nonVerbal" />
                <Picker.Item label={t.sign} value="sign" />
                <Picker.Item label={t.pictureBased} value="pictureBased" />
                <Picker.Item label={t.written} value="written" />
                <Picker.Item label={t.other} value="other" />
              </Picker>
            </View>
            {errors.communicationStyle && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.communicationStyle}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
              {t.parentIncome}{" "}
              <Text style={[styles.required, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>*</Text>
            </Text>
            <View style={styles.currencyInput}>
              <Text style={[styles.currencySymbol, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>₹</Text>
              <TextInput
                style={[styles.incomeInput, errors.parentIncome ? styles.inputError : null]}
                value={formData.parentIncome} // ✅ Correct value binding
                onChangeText={(text) => handleInputChange("parentIncome", text)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            {errors.parentIncome && (
              <Text style={[styles.errorText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
                {errors.parentIncome}
              </Text>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={[styles.submitButtonText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>{t.submit}</Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false)
              if (selectedDate) {
                setFormData((prev) => ({ ...prev, dob: selectedDate }))
              }
            }}
          />
        )}

        {/* Appointment Date Picker Modal */}
        {showAppointmentDatePicker && (
          <DateTimePicker
            value={formData.appointmentDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowAppointmentDatePicker(false)
              if (selectedDate) {
                setFormData((prev) => ({ ...prev, appointmentDate: selectedDate }))
              }
            }}
          />
        )}

        {/* Time Picker Modal */}
        {showTimePicker && (
          <DateTimePicker
            value={formData.appointmentTime}
            mode="time"
            display="spinner"
            minuteInterval={30}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false)
              if (selectedTime) {
                setFormData((prev) => ({ ...prev, appointmentTime: selectedTime }))
              }
            }}
          />
        )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000", // Black text
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C", // Tan border color
    paddingBottom: 8,
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
  textArea: {
    height: 100, // Taller for multiline text
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    borderRadius: 6,
    backgroundColor: "#FFFAF0", // Floral white background
    height: 48, // Fixed height for uniformity
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
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: "#000", // Black text
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFAF0", // Floral white background
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    borderStyle: "dashed",
  },
  uploadButtonText: {
    marginLeft: 12,
    color: "#000", // Black text
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: "auto",
  },
  loadingIcon: {
    marginLeft: "auto",
  },
  currencyInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFAF0", // Floral white background
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    borderRadius: 6,
    overflow: "hidden",
    height: 48, // Fixed height for uniformity
  },
  currencySymbol: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000", // Black text
  },
  incomeInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#000", // Black text
    height: 48, // Fixed height for uniformity
  },
  submitButton: {
    backgroundColor: "#408c4c", // Dark brown color
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
})

