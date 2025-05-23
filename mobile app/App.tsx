"use client"

import { useState, useEffect } from "react"
import { Text, View, ActivityIndicator, StyleSheet, StatusBar } from "react-native"
import * as Font from "expo-font"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import HomeScreen from "./screens/HomeScreen"
import RegistrationForm from "./screens/RegistrationForm"
import LoginForm from "./screens/LoginForm"
import TabNavigator from "./navigation/TabNavigator"
import AIChat from "./components/AIChat"

// For development only - in production, use a secure method
const GEMINI_API_KEY = "AIzaSyBjZMXVy-9pCt2JZacTSxkbvCHcN8YDZ-M"
import { LanguageProvider } from "./components/LanguageContext"
import RegistrationSuccess from "./screens/RegistrationSuccess"
// import { useLanguage } from "./context/LanguageContext"
const Stack = createNativeStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} />
      <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <Stack.Screen name="Tabs" component={TabNavigator} /> */}
    </Stack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [showChat, setShowChat] = useState(true)

  const handleCloseChat = () => {
    setShowChat(false)
    // Additional logic when chat is closed
  }

  // Load fonts on app startup
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "JosefinSans-Regular": require("./assets/fonts/JosefinSans-Regular.ttf"),
        "JosefinSans-Bold": require("./assets/fonts/JosefinSans-Bold.ttf"),
        "JosefinSans-BoldItalic": require("./assets/fonts/JosefinSans-BoldItalic.ttf"),
        "JosefinSans-Medium": require("./assets/fonts/JosefinSans-Medium.ttf"),
      })
      setFontsLoaded(true)
    }
    loadFonts()
  }, [])

  // Show loading screen if fonts aren't ready
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontSize: 16, marginTop: 10 }}>Loading Ishanya Connect...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LanguageProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
          {/* {showChat && (
            <AIChat
              studentName="Student"
              onClose={handleCloseChat}
              apiKey={GEMINI_API_KEY} // Pass the API key as a prop
            />
          )} */}
          <Toast />
        </SafeAreaProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

