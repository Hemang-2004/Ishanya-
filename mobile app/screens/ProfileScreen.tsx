import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"

export default function ProfileScreen() {
  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialIcons name="settings" size={24} color="#408c4c" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileInitials}>AP</Text>
              </View>
              <TouchableOpacity style={styles.editImageButton}>
                <MaterialIcons name="edit" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Arjun Patel</Text>
            <Text style={styles.profileEmail}>arjun.patel@example.com</Text>
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Attendance</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>78%</Text>
                <Text style={styles.statLabel}>Progress</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoItem}>
              <MaterialIcons name="phone" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>+91 9876543210</Text>
              </View>
              <MaterialIcons name="edit" size={20} color="#666" />
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="cake" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>15 August 2000</Text>
              </View>
              <MaterialIcons name="edit" size={20} color="#666" />
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="location-on" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>123 Main Street, Mumbai, Maharashtra</Text>
              </View>
              <MaterialIcons name="edit" size={20} color="#666" />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.infoItem}>
              <MaterialIcons name="school" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Current Level</Text>
                <Text style={styles.infoValue}>Intermediate</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="person" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Primary Teacher</Text>
                <Text style={styles.infoValue}>Priya Sharma</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="event" size={20} color="#8B4513" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Enrollment Date</Text>
                <Text style={styles.infoValue}>1 January 2023</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* Add padding at the bottom for tab bar */}
          <View style={{ height: 80 }} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 216, 112, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF8DC",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "JosefinSans-Regular",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8B4513",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "JosefinSans-Regular",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontFamily: "JosefinSans-Regular",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#408c4c",
    fontFamily: "JosefinSans-Regular",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#D2B48C",
  },
  section: {
    padding: 20,
    backgroundColor: "#FFF8DC",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
    paddingBottom: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B4513",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "JosefinSans-Regular",
  },
})

