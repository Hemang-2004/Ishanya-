import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, SafeAreaView } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function RegistrationSuccess() {
  const navigation = useNavigation()

  const handleReturnHome = () => {
    // Navigate to the home screen
    navigation.navigate("Home")
  }

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.card}>
            {/* Header with icon */}
            <View style={styles.header}>
              <MaterialIcons name="check-circle" size={80} color="#D2B48C" style={styles.icon} />
              <Text style={styles.title}>Registration Successful!</Text>
              <Text style={styles.subtitle}>Thank you for registering with us</Text>
            </View>

            {/* Main message */}
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                Your registration has been successfully submitted and is now pending approval from our administrators.
              </Text>
            </View>

            {/* What happens next section */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>What happens next?</Text>

              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Our team will review your application within 2-3 business days</Text>
              </View>

              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  You will receive an email notification once your registration is approved
                </Text>
              </View>

              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>After approval, you can log in using the credentials you provided</Text>
              </View>

              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>If we need additional information, we'll contact you via email</Text>
              </View>
            </View>

            {/* Return to Home button */}
            <TouchableOpacity style={styles.homeButton} onPress={handleReturnHome}>
              <Text style={styles.homeButtonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF8DC", // Light yellowish background matching the form
    borderRadius: 15,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color matching the form
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: "JosefinSans-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "JosefinSans-Regular",
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "JosefinSans-Regular",
  },
  infoBox: {
    backgroundColor: "#E0EEE0", // Light green background
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#90EE90", // Light green border
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    fontFamily: "JosefinSans-Bold",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#408c4c", // Dark green color matching the submit button
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    fontFamily: "JosefinSans-Regular",
  },
  homeButton: {
    backgroundColor: "#408c4c", // Dark green color matching the submit button
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
  },
})

