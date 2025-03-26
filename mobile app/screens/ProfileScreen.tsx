import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Share, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

export default function ProfileScreen() {
    const [studentName, setStudentName] = useState("gdfgd")
    const [StudentEmail, setStudentEmail] = useState("gdfgd")

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: 'Check out my profile on Ishanya Learning Platform!',
        title: 'My Profile'
      });
    } catch (error) {
      console.error(error);
    }
  };
  let data;
  let parsedData;
  const fetchStudentId = async () => {
    try {
       data = await AsyncStorage.getItem("studentData")
       
  
      if (data) {
         parsedData = JSON.parse(data)
        const studentId = parsedData?.id 
        setStudentName(parsedData?.name);
        setStudentEmail(parsedData?.email);
  
        if (studentId) {
          console.log("Student ID:", studentId)
          console.log("Student dgyj")


          return studentId
        } else {
          console.log("Student ID not found in the stored data.")
          return null
        }
      } else {
        console.log("No student data found.")
        return null
      }
    } catch (error) {
      console.error("Error fetching student data:", error)
      return null
    }
  }
  useEffect(() => {
      const getStudentDetails = async () => {
        const studentId = await fetchStudentId()
        if (studentId) {
          console.log("Fetching reports for student ID:", studentId)
          // Fetch additional data or perform actions
        }
      }
      getStudentDetails()
    }, [])

  // Calculate profile completion percentage
  const profileFields = {
    profilePicture: false, // Currently using initials
    phone: true,
    dateOfBirth: true,
    address: true,
    education: false,
    skills: false,
    socialMedia: false
  };

  const completedFields = Object.values(profileFields).filter(Boolean).length;
  const totalFields = Object.keys(profileFields).length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <LinearGradient
        colors={['rgba(255, 216, 112, 0.3)', 'rgba(255, 216, 112, 0.1)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton} onPress={handleShareProfile}>
                <MaterialIcons name="share" size={24} color="#408c4c" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <MaterialIcons name="settings" size={24} color="#408c4c" />
              </TouchableOpacity>
            </View>
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
              <Text style={styles.profileName}>

              {studentName}
</Text>
              <Text style={styles.profileEmail}>{StudentEmail}</Text>
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

              <View style={styles.completionSection}>
                <View style={styles.completionHeader}>
                  <Text style={styles.completionTitle}>Profile Completion</Text>
                  <Text style={styles.completionPercentage}>{completionPercentage}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
                </View>
                <View style={styles.missingFieldsContainer}>
                  {!profileFields.profilePicture && (
                    <TouchableOpacity style={styles.missingField}>
                      <MaterialIcons name="add-a-photo" size={16} color="#408c4c" />
                      <Text style={styles.missingFieldText}>Add a profile picture</Text>
                      <MaterialIcons name="arrow-forward-ios" size={12} color="#666" />
                    </TouchableOpacity>
                  )}
                  {!profileFields.education && (
                    <TouchableOpacity style={styles.missingField}>
                      <MaterialIcons name="school" size={16} color="#408c4c" />
                      <Text style={styles.missingFieldText}>Add your education details</Text>
                      <MaterialIcons name="arrow-forward-ios" size={12} color="#666" />
                    </TouchableOpacity>
                  )}
                  {!profileFields.skills && (
                    <TouchableOpacity style={styles.missingField}>
                      <MaterialIcons name="psychology" size={16} color="#408c4c" />
                      <Text style={styles.missingFieldText}>Add your skills</Text>
                      <MaterialIcons name="arrow-forward-ios" size={12} color="#666" />
                    </TouchableOpacity>
                  )}
                  {!profileFields.socialMedia && (
                    <TouchableOpacity style={styles.missingField}>
                      <MaterialIcons name="people" size={16} color="#408c4c" />
                      <Text style={styles.missingFieldText}>Connect social media</Text>
                      <MaterialIcons name="arrow-forward-ios" size={12} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="phone" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>+91 9876543210</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <MaterialIcons name="edit" size={20} color="#408c4c" />
                </TouchableOpacity>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="cake" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>15 August 2000</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <MaterialIcons name="edit" size={20} color="#408c4c" />
                </TouchableOpacity>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="location-on" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>123 Main Street, Mumbai, Maharashtra</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <MaterialIcons name="edit" size={20} color="#408c4c" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Academic Information</Text>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="school" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Current Level</Text>
                  <Text style={styles.infoValue}>Intermediate</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="person" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Primary Teacher</Text>
                  <Text style={styles.infoValue}>Priya Sharma</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="event" size={20} color="#fff" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Enrollment Date</Text>
                  <Text style={styles.infoValue}>1 January 2023</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Badges & Achievements</Text>
              <View style={styles.badgesContainer}>
                <View style={styles.badgeItem}>
                  <View style={styles.badgeIcon}>
                    <MaterialIcons name="star" size={24} color="#FFD700" />
                  </View>
                  <View style={styles.badgeInfo}>
                    <Text style={styles.badgeTitle}>Perfect Attendance</Text>
                    <Text style={styles.badgeDescription}>Attended 30 classes in a row</Text>
                  </View>
                </View>
                <View style={styles.badgeItem}>
                  <View style={styles.badgeIcon}>
                    <MaterialIcons name="emoji-events" size={24} color="#C0C0C0" />
                  </View>
                  <View style={styles.badgeInfo}>
                    <Text style={styles.badgeTitle}>Quick Learner</Text>
                    <Text style={styles.badgeDescription}>Completed 5 courses</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <View style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <MaterialIcons name="book" size={20} color="#fff" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Completed Lesson 5</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <MaterialIcons name="assignment" size={20} color="#fff" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Submitted Assignment</Text>
                  <Text style={styles.activityTime}>Yesterday</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIconContainer}>
                  <MaterialIcons name="lock" size={20} color="#fff" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Change Password</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#408c4c" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton}>
              <MaterialIcons name="logout" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Add padding at the bottom for tab bar */}
            <View style={{ height: 80 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
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
    marginTop: -29,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
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
    backgroundColor: "rgba(255,255,255,0.95)",
    margin: 15,
    marginTop: 0,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
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
  editButton: {
    padding: 8,
  },
  badgesContainer: {
    marginTop: 10,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  badgeIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'JosefinSans-Regular',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'JosefinSans-Regular',
    marginTop: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#408c4c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'JosefinSans-Regular',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'JosefinSans-Regular',
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#408c4c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'JosefinSans-Regular',
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#408c4c",
    padding: 15,
    borderRadius: 12,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "JosefinSans-Regular",
  },
  completionSection: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "JosefinSans-Regular",
  },
  completionPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#408c4c',
    fontFamily: "JosefinSans-Regular",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#408c4c',
    borderRadius: 3,
  },
  missingFieldsContainer: {
    marginTop: 10,
  },
  missingField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  missingFieldText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    fontFamily: "JosefinSans-Regular",
  },
})

