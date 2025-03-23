"use client"

import { useRef, useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ImageBackground,
  Modal,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"
import StatsCard from "../components/StatsCard"
import CourseCard from "../components/CourseCard"
import MessageCard from "../components/MessageCard"
import RadialProgress from "../components/RadialProgress"
import AttendanceGraph from "../components/AttendanceGraph"
import AIChat from "../components/AIChat"

export default function Dashboard() {
  const scrollY = useRef(new Animated.Value(0)).current
  const [showMinHeader, setShowMinHeader] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showAIChatModal, setShowAIChatModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState("")
  const [message, setMessage] = useState("")
  const [showCoursesModal, setShowCoursesModal] = useState(false)
  const [showAssignmentsModal, setShowAssignmentsModal] = useState(false)
  const [showSessionsModal, setShowSessionsModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [studentName, setStudentName] = useState("Arjun")

  // Sample data
  const courses = [
    { id: "1", title: "Digital Literacy", progress: 85, teacher: "Priya Sharma", time: "Tomorrow, 10:00 AM" },
    { id: "2", title: "Communication Skills", progress: 65, teacher: "Rahul Verma", time: "Wednesday, 2:00 PM" },
    { id: "3", title: "Life Skills", progress: 40, teacher: "Anita Desai", time: "Friday, 11:00 AM" },
  ]

  const assignments = [
    { id: "1", title: "Digital Literacy Quiz", dueDate: "Tomorrow, 11:59 PM" },
    { id: "2", title: "Communication Skills Essay", dueDate: "Friday, 11:59 PM" },
  ]

  const sessions = [
    { id: "1", title: "Digital Literacy Live Session", time: "Tomorrow, 10:00 AM", teacher: "Priya Sharma" },
  ]

  const messages = [
    { id: "1", teacher: "Priya Sharma", time: "2 hours ago", message: "Great job on your last assignment!" },
    { id: "2", teacher: "Rahul Verma", time: "Yesterday", message: "Prepare for our group discussion." },
  ]

  // Attendance data for the graph
  const attendanceData = [
    { month: "May", percentage: 65 },
    { month: "Jun", percentage: 40 },
    { month: "Jul", percentage: 62 },
    { month: "Aug", percentage: 75 },
    { month: "Sep", percentage: 78 },
  ]

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      setShowMinHeader(value > 100)
    })
    return () => scrollY.removeAllListeners()
  }, [])

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [120, 60],
    extrapolate: "clamp",
  })

  const handleCardPress = (cardType: string) => {
    setSelectedCard(selectedCard === cardType ? null : cardType)

    if (cardType === "activeCourses") {
      setShowCoursesModal(true)
    } else if (cardType === "pendingAssignments") {
      setShowAssignmentsModal(true)
    } else if (cardType === "upcomingSessions") {
      setShowSessionsModal(true)
    }
  }

  const handleReply = (teacher: string) => {
    setCurrentTeacher(teacher)
    setShowChatModal(true)
  }

  const sendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log(`Message to ${currentTeacher}: ${message}`)
      setMessage("")
      setShowChatModal(false)
    }
  }

  const handleBellPress = () => {
    setShowAssignmentsModal(true)
  }

  const handleProfilePress = () => {
    setShowProfileModal(true)
  }

  const handleAIChatPress = () => {
    setShowAIChatModal(true)
  }

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          {showMinHeader ? (
            <View style={styles.minHeaderContent}>
              <Pressable onPress={handleProfilePress}>
                <View style={styles.logo} />
              </Pressable>
              <Text style={styles.welcomeText}>{studentName}</Text>
            </View>
          ) : (
            <View style={styles.headerContent}>
              <Pressable onPress={handleProfilePress}>
                <View style={styles.logoContainer}>
                  <View style={styles.logo} />
                </View>
              </Pressable>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome Back, {studentName}!</Text>
                <Text style={styles.subText}>Track your progress and stay connected.</Text>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Notification Bell */}
        <Pressable style={styles.notificationBell} onPress={handleBellPress}>
          <MaterialIcons name="notifications" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </Pressable>

        {/* Floating Chat Button */}
        <Pressable style={styles.floatingButton} onPress={handleAIChatPress}>
          <MaterialIcons name="chat" size={24} color="#fff" />
        </Pressable>

        <Animated.ScrollView
          style={styles.content}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
        >
          <View style={styles.statsContainer}>
            <Pressable
              style={styles.radialProgressCard}
              onPress={() => setSelectedCard(selectedCard === "overallProgress" ? null : "overallProgress")}
            >
              <Text style={[{ fontFamily: "JosefinSans-Regular", fontSize: 14 }]}>Overall Progress</Text>
              <RadialProgress percentage={78} size={120} strokeWidth={12} color="#408c4c" />
            </Pressable>

            <StatsCard
              title="Active Courses"
              value="3"
              icon="book"
              color="#8B4513"
              onPress={() => handleCardPress("activeCourses")}
              isSelected={selectedCard === "activeCourses"}
            />

            <StatsCard
              title="Pending Assignments"
              value="2"
              icon="assignment"
              color="#FF9800"
              onPress={() => handleCardPress("pendingAssignments")}
              isSelected={selectedCard === "pendingAssignments"}
              showNotification={true}
            />

            <StatsCard
              title="Upcoming Sessions"
              value="1"
              icon="event"
              color="#9C27B0"
              onPress={() => handleCardPress("upcomingSessions")}
              isSelected={selectedCard === "upcomingSessions"}
            />
          </View>

          {/* Attendance Graph */}
          <AttendanceGraph data={attendanceData} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                progress={course.progress}
                teacher={course.teacher}
                time={course.time}
                onPress={() => setSelectedCard(selectedCard === `course-${course.id}` ? null : `course-${course.id}`)}
                isSelected={selectedCard === `course-${course.id}`}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Messages From Teachers</Text>
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                teacher={msg.teacher}
                time={msg.time}
                message={msg.message}
                onReply={() => handleReply(msg.teacher)}
                onPress={() => setSelectedCard(selectedCard === `message-${msg.id}` ? null : `message-${msg.id}`)}
                isSelected={selectedCard === `message-${msg.id}`}
              />
            ))}
          </View>

          {/* Add padding at the bottom for tab bar */}
          <View style={{ height: 80 }} />
        </Animated.ScrollView>

        {/* Chat Modal */}
        <Modal
          visible={showChatModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowChatModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.chatContainer}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderText}>{currentTeacher}</Text>
                <Pressable onPress={() => setShowChatModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </Pressable>
              </View>
              <ScrollView style={styles.chatMessages}>{/* Chat history would go here */}</ScrollView>
              <View style={styles.chatInputContainer}>
                <TextInput
                  style={styles.chatInput}
                  placeholder="Send a message..."
                  value={message}
                  onChangeText={setMessage}
                  autoFocus={true}
                />
                <Pressable style={styles.sendButton} onPress={sendMessage}>
                  <MaterialIcons name="send" size={24} color="#408c4c" />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* AI Chat Modal */}
        <Modal
          visible={showAIChatModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAIChatModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.aiChatContainer}>
              <AIChat studentName={studentName} onClose={() => setShowAIChatModal(false)} />
            </View>
          </View>
        </Modal>

        {/* Active Courses Modal */}
        <Modal
          visible={showCoursesModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCoursesModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Active Courses</Text>
                <Pressable onPress={() => setShowCoursesModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </Pressable>
              </View>
              <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <MaterialIcons name="school" size={24} color="#8B4513" />
                    <View style={styles.modalItemContent}>
                      <Text style={styles.modalItemTitle}>{item.title}</Text>
                      <Text style={styles.modalItemSubtitle}>{item.teacher}</Text>
                    </View>
                    <Text style={styles.modalItemProgress}>{item.progress}%</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Pending Assignments Modal */}
        <Modal
          visible={showAssignmentsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAssignmentsModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Pending Assignments</Text>
                <Pressable onPress={() => setShowAssignmentsModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </Pressable>
              </View>
              <FlatList
                data={assignments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <MaterialIcons name="assignment" size={24} color="#FF9800" />
                    <View style={styles.modalItemContent}>
                      <Text style={styles.modalItemTitle}>{item.title}</Text>
                      <Text style={styles.modalItemSubtitle}>{item.dueDate}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#666" />
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Upcoming Sessions Modal */}
        <Modal
          visible={showSessionsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSessionsModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Upcoming Sessions</Text>
                <Pressable onPress={() => setShowSessionsModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </Pressable>
              </View>
              <FlatList
                data={sessions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <MaterialIcons name="event" size={24} color="#9C27B0" />
                    <View style={styles.modalItemContent}>
                      <Text style={styles.modalItemTitle}>{item.title}</Text>
                      <Text style={styles.modalItemSubtitle}>
                        {item.time} • {item.teacher}
                      </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#666" />
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Profile Modal */}
        <Modal
          visible={showProfileModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowProfileModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Profile</Text>
                <Pressable onPress={() => setShowProfileModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </Pressable>
              </View>
              <View style={styles.profileContent}>
                <View style={styles.profileAvatar} />
                <Text style={styles.profileName}>{studentName} Singh</Text>
                <Text style={styles.profileInfo}>Student ID: 2023001</Text>
                <Text style={styles.profileInfo}>Email: {studentName.toLowerCase()}.s@example.com</Text>
                <Text style={styles.profileInfo}>Phone: +91 98765 43210</Text>

                <View style={styles.profileSection}>
                  <Text style={styles.profileSectionTitle}>Academic Details</Text>
                  <Text style={styles.profileInfo}>Program: Bachelor of Computer Applications</Text>
                  <Text style={styles.profileInfo}>Year: 2nd Year</Text>
                  <Text style={styles.profileInfo}>Semester: 3rd Semester</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
    backgroundColor: "rgba(255, 216, 112, 0.9)", // Semi-transparent gold color
    paddingHorizontal: 20,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C", // Tan border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  minHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
  },
  notificationBell: {
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 10,
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#408c4c", // Green color from registration form
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  radialProgressCard: {
    width: "48%",
    backgroundColor: "#FFF8DC", // Light yellowish background
    borderRadius: 12,
    padding: 15,
    margin: "1%",
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 180, // Fixed height to match other cards
  },
  radialProgressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C", // Tan border color
    paddingBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  chatContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "70%",
    padding: 20,
  },
  aiChatContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  chatMessages: {
    flex: 1,
    marginVertical: 10,
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontFamily: "JosefinSans-Regular",
  },
  sendButton: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  modalItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  modalItemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    fontFamily: "JosefinSans-Regular",
  },
  modalItemProgress: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#408c4c",
    fontFamily: "JosefinSans-Regular",
  },
  profileContent: {
    alignItems: "center",
    padding: 20,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#D2B48C",
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "JosefinSans-Bold",
  },
  profileInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    fontFamily: "JosefinSans-Regular",
  },
  profileSection: {
    width: "100%",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  profileSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "JosefinSans-Bold",
  },
})

