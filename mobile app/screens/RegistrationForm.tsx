import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Platform, 
  ScrollView, 
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { translations } from '../constants/translations';
import CustomInput from '../components/CustomInput';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';

export default function RegistrationForm() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: new Date(),
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: '',
    udidDocument: null,
    aadharCard: null,
    photo: null,
    medicalCertificate: null,
    currentLevel: '',
    status: 'active',
    primaryDiagnosis: '',
    comorbidity: '',
    bloodGroup: '',
    allergies: '',
    transportNeeded: '',
    learningStyle: '',
    communicationStyle: '',
    parentIncome: '',
    appointmentDate: new Date(),
    appointmentTime: new Date(),
    specialRequest: '',
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAppointmentDatePicker, setShowAppointmentDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [parsedDocumentData, setParsedDocumentData] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Document parser function
  const parseDocument = async (uri, type) => {
    try {
      // This is a placeholder for actual document parsing logic
      // In a real app, you would use OCR libraries or API services
      console.log(`Parsing document: ${uri}, type: ${type}`);
      
      // Simulate parsing with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example of extracted data (in a real app, this would come from OCR)
      let extractedData = {};
      
      if (type === 'aadhar') {
        extractedData = {
          name: 'John Doe',
          aadharNumber: '1234 5678 9012',
          dob: '01/01/1990',
          address: '123 Main St, City, State, PIN'
        };
        
        // Auto-fill form fields with extracted data
        setFormData(prev => ({
          ...prev,
          firstName: extractedData.name.split(' ')[0],
          lastName: extractedData.name.split(' ')[1] || '',
          address: extractedData.address,
          // Convert string date to Date object
          dob: new Date(extractedData.dob)
        }));
      } else if (type === 'udid') {
        extractedData = {
          disabilityType: 'Visual Impairment',
          percentage: '40%',
          udidNumber: 'UD12345678'
        };
        
        // Auto-fill form fields with extracted data
        setFormData(prev => ({
          ...prev,
          primaryDiagnosis: extractedData.disabilityType
        }));
      } else if (type === 'medical') {
        extractedData = {
          diagnosis: 'Autism Spectrum Disorder',
          doctorName: 'Dr. Jane Smith',
          hospitalName: 'City Medical Center',
          date: '15/03/2023'
        };
        
        // Auto-fill form fields with extracted data
        setFormData(prev => ({
          ...prev,
          primaryDiagnosis: extractedData.diagnosis
        }));
      }
      
      setParsedDocumentData(extractedData);
      Alert.alert('Document Parsed', 'Information has been extracted and filled in the form.');
      
      return extractedData;
    } catch (error) {
      console.error('Error parsing document:', error);
      Alert.alert('Error', 'Failed to parse document. Please try again or fill the form manually.');
      return null;
    }
  };

  const pickDocument = async (field) => {
    try {
      // Allow both images and PDFs
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const fileType = result.assets[0].mimeType;
        
        setFormData(prev => ({ ...prev, [field]: uri }));
        
        // If it's an image or PDF, try to parse it
        if (fileType.startsWith('image/') || fileType === 'application/pdf') {
          // Determine document type based on field
          const docType = field === 'aadharCard' ? 'aadhar' : 
                          field === 'udidDocument' ? 'udid' : 
                          field === 'medicalCertificate' ? 'medical' : 'other';
          
          // Parse the document
          await parseDocument(uri, docType);
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert('Error', 'Failed to select document. Please try again.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // All fields are required
    Object.keys(formData).forEach(field => {
      if (!formData[field] && field !== 'comorbidity' && field !== 'allergies' && field !== 'bloodGroup' && field !== 'specialRequest') {
        newErrors[field] = t.required;
      }
    });
    
    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      Alert.alert('Success', 'Registration form submitted successfully!');
      // Submit logic here
    } else {
      Alert.alert('Form Error', 'Please fill all required fields correctly.');
      console.log('Form has errors');
    }
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Language Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Language:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={language}
              onValueChange={(value) => setLanguage(value)}
              style={styles.picker}
            >
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
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Bold', fontSize: 20 }]}>{t.uploadDocuments}</Text>
          
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickDocument('udidDocument')}
          >
            <FontAwesome5 name="id-card" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.uploadUDID} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            {formData.udidDocument && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickDocument('aadharCard')}
          >
            <FontAwesome5 name="id-card" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.uploadAadhar} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            {formData.aadharCard && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickDocument('medicalCertificate')}
          >
            <FontAwesome5 name="file-medical" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>Upload Medical Certificate <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            {formData.medicalCertificate && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => pickDocument('photo')}
          >
            <FontAwesome5 name="camera" size={24} color="#333" />
            <Text style={[styles.uploadButtonText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.uploadPhoto} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            {formData.photo && (
              <MaterialIcons name="check-circle" size={20} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Regular', fontSize: 20 }]}>{t.basicInfo}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.firstName} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.firstName ? styles.inputError : null]}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              placeholder={t.firstName}
            />
            {errors.firstName && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.firstName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.lastName} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.lastName ? styles.inputError : null]}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              placeholder={t.lastName}
            />
            {errors.lastName && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.lastName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.address} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.address ? styles.inputError : null]}
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder={t.address}
              multiline
              numberOfLines={3}
            />
            {errors.address && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.address}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.dob} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ fontFamily: 'JosefinSans-Regular', fontSize: 15 }}>{formData.dob.toLocaleDateString()}</Text>
              <MaterialIcons name="calendar-today" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.contact} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.contact ? styles.inputError : null]}
              value={formData.contact}
              onChangeText={(text) => handleInputChange('contact', text)}
              placeholder={t.contact}
              keyboardType="phone-pad"
            />
            {errors.contact && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.contact}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.email} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder={t.email}
              keyboardType="email-address"
            />
            {errors.email && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.password} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              placeholder={t.password}
              secureTextEntry
            />
            {errors.password && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.password}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.confirmPassword} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              placeholder={t.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.confirmPassword}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.gender} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="male"
                  status={formData.gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => handleInputChange('gender', 'male')}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.male}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="female"
                  status={formData.gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => handleInputChange('gender', 'female')}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.female}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="other"
                  status={formData.gender === 'other' ? 'checked' : 'unchecked'}
                  onPress={() => handleInputChange('gender', 'other')}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.other}</Text>
              </View>
            </View>
            {errors.gender && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.gender}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.transportNeeded} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="yes"
                  status={formData.transportNeeded === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => handleInputChange('transportNeeded', 'yes')}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.yes}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="no"
                  status={formData.transportNeeded === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => handleInputChange('transportNeeded', 'no')}
                  color="#8B4513" // Dark brown color
                />
                <Text style={[styles.radioLabel, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.no}</Text>
              </View>
            </View>
            {errors.transportNeeded && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.transportNeeded}</Text>}
          </View>
        </View>

        {/* Educational Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Bold', fontSize: 20 }]}>{t.educationInfo}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.currentLevel} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.currentLevel ? styles.inputError : null]}
              value={formData.currentLevel}
              onChangeText={(text) => handleInputChange('currentLevel', text)}
              placeholder={t.currentLevel}
            />
            {errors.currentLevel && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.currentLevel}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.status} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
                style={styles.picker}
              >
                <Picker.Item label={t.active} value="active" />
                <Picker.Item label={t.discontinued} value="discontinued" />
                <Picker.Item label={t.temporaryBreak} value="temporaryBreak" />
              </Picker>
            </View>
            {errors.status && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.status}</Text>}
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Regular', fontSize: 20 }]}>{t.medicalInfo}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.primaryDiagnosis} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.primaryDiagnosis ? styles.inputError : null]}
              value={formData.primaryDiagnosis}
              onChangeText={(text) => handleInputChange('primaryDiagnosis', text)}
              placeholder={t.primaryDiagnosis}
            />
            {errors.primaryDiagnosis && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.primaryDiagnosis}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.comorbidity}</Text>
            <TextInput
              style={styles.input}
              value={formData.comorbidity}
              onChangeText={(text) => handleInputChange('comorbidity', text)}
              placeholder={t.comorbidity}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.bloodGroup}</Text>
            <TextInput
              style={styles.input}
              value={formData.bloodGroup}
              onChangeText={(text) => handleInputChange('bloodGroup', text)}
              placeholder={t.bloodGroup}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.allergies}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.allergies}
              onChangeText={(text) => handleInputChange('allergies', text)}
              placeholder={t.allergies}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Learning Profile */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Regular', fontSize: 20 }]}>{t.learningProfile}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.learningStyle} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.learningStyle}
                onValueChange={(value) => handleInputChange('learningStyle', value)}
                style={styles.picker}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label={t.visual} value="visual" />
                <Picker.Item label={t.auditory} value="auditory" />
                <Picker.Item label={t.other} value="other" />
              </Picker>
            </View>
            {errors.learningStyle && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.learningStyle}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.communicationStyle} <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.communicationStyle}
                onValueChange={(value) => handleInputChange('communicationStyle', value)}
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
            {errors.communicationStyle && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.communicationStyle}</Text>}
          </View>

          <View style={styles.inputContainer}>
  <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>
    {t.parentIncome}{' '}
    <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text>
  </Text>
  <View style={styles.currencyInput}>
    <Text style={[styles.currencySymbol, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>₹</Text>
    <TextInput
      style={[styles.incomeInput, errors.parentIncome ? styles.inputError : null]}
      value={formData.parentIncome} // ✅ Correct value binding
      onChangeText={(text) => handleInputChange('parentIncome', text)}
      placeholder="0"
      keyboardType="numeric"
    />
  </View>
  {errors.parentIncome && (
    <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>
      {errors.parentIncome}
    </Text>
  )}
</View>

        </View>

        {/* Appointment Time */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'JosefinSans-Regular', fontSize: 20 }]}>{t.details}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>Select Date <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowAppointmentDatePicker(true)}
            >
              <Text style={{ fontFamily: 'JosefinSans-Regular', fontSize: 15 }}>{formatDate(formData.appointmentDate)}</Text>
              <MaterialIcons name="calendar-today" size={20} color="#333" />
            </TouchableOpacity>
            {errors.appointmentDate && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.appointmentDate}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>Select Time <Text style={[styles.required, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>*</Text></Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ fontFamily: 'JosefinSans-Regular', fontSize: 15 }}>{formatTime(formData.appointmentTime)}</Text>
              <MaterialIcons name="access-time" size={20} color="#333" />
            </TouchableOpacity>
            {errors.appointmentTime && <Text style={[styles.errorText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{errors.appointmentTime}</Text>}
          </View>
          {/* <View style={styles.loginContainer}>
      <Text style={[styles.loginText, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
        {t.alreadyHaveAccount || "Already have an account?"}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.loginLink, { fontFamily: "JosefinSans-Regular", fontSize: 15 }]}>
          {t.goToLogin || "Go to Login"}
        </Text>
      </TouchableOpacity>
    </View> */}
        </View>
        

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={[styles.submitButtonText, { fontFamily: 'JosefinSans-Regular', fontSize: 15 }]}>{t.submit}</Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData(prev => ({ ...prev, dob: selectedDate }));
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
              setShowAppointmentDatePicker(false);
              if (selectedDate) {
                setFormData(prev => ({ ...prev, appointmentDate: selectedDate }));
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
              setShowTimePicker(false);
              if (selectedTime) {
                setFormData(prev => ({ ...prev, appointmentTime: selectedTime }));
              }
            }}
          />
        )}
        
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    marginTop:35,
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: '#FFF8DC', // Light yellowish background
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000', // Black text
    borderBottomWidth: 1,
    borderBottomColor: '#D2B48C', // Tan border color
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#000', // Black text
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#FFFAF0', // Floral white background
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    fontSize: 16,
    color: '#000', // Black text
    height: 48, // Fixed height for uniformity
  },
  textArea: {
    height: 100, // Taller for multiline text
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    borderRadius: 6,
    backgroundColor: '#FFFAF0', // Floral white background
    height: 48, // Fixed height for uniformity
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    borderRadius: 6,
    backgroundColor: '#FFFAF0', // Floral white background
    height: 48, // Fixed height for uniformity
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 58,
    color: '#000', // Black text
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000', // Black text
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAF0', // Floral white background
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    marginLeft: 12,
    color: '#000', // Black text
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  currencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAF0', // Floral white background
    borderWidth: 1,
    borderColor: '#D2B48C', // Tan border color
    borderRadius: 6,
    overflow: 'hidden',
    height: 48, // Fixed height for uniformity
  },
  currencySymbol: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000', // Black text
  },
  incomeInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#000', // Black text
    height: 48, // Fixed height for uniformity
  },
  submitButton: {
    backgroundColor: '#408c4c', // Dark brown color
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: 320, // Set the width here
    alignSelf: 'center', // Center the button horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});