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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"
import FeedbackReport from "./feedback-report"

// FAQ data
/*
const faqData = [
  {
    id: "1",
    question: "How do I join a live session?",
    answer: "You can join a live session by clicking on the session in the 'Upcoming Sessions' section. The app will automatically connect you to the virtual classroom at the scheduled time."
  },
  {
    id: "2",
    question: "How do I submit assignments?",
    answer: "To submit assignments, go to the 'Pending Assignments' section, select the assignment you want to submit, and follow the upload instructions. You can attach files, images, or type your response directly."
  },
  {
    id: "3",
    question: "How can I contact my teachers?",
    answer: "You can contact your teachers through the chat feature. Click on the floating chat button or use the 'Messages From Teachers' section to start a conversation."
  },
  {
    id: "4",
    question: "How is my attendance calculated?",
    answer: "Your attendance is automatically tracked based on your participation in live sessions and completion of assignments. The attendance graph shows your monthly attendance percentage."
  },
  {
    id: "5",
    question: "What is the AI Chat feature?",
    answer: "The AI Chat feature provides instant help with your studies. You can ask questions about your courses, get help with assignments, or seek clarification on any topic."
  }
]
*/

export default function Dashboard() {
  const scrollY = useRef(new Animated.Value(0)).current
  const overallProgress = useRef(new Animated.Value(0)).current
  const [showMinHeader, setShowMinHeader] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showAIChatModal, setShowAIChatModal] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState("")
  const [message, setMessage] = useState("")
  const [feedback, setFeedback] = useState<any>(null)
  const [showCoursesModal, setShowCoursesModal] = useState(false)
  const [showAssignmentsModal, setShowAssignmentsModal] = useState(false)
  const [showSessionsModal, setShowSessionsModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [studentName, setStudentName] = useState("Arjun")
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [hasUnreadAssignments, setHasUnreadAssignments] = useState(true)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [showFeedbackReport, setShowFeedbackReport] = useState(false)
  // const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

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
  let data

  const fetchStudentId = async () => {
    try {
      data = await AsyncStorage.getItem("studentData")

      if (data) {
        const parsedData = JSON.parse(data)
        const studentId = parsedData?.id
        setStudentName(parsedData?.name)

        if (studentId) {
          console.log("Student ID:", studentId)
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
  const fetchFeedbackReport = async (term) => {
    try {
      const studentId = await fetchStudentId()

      if (!studentId) {
        console.log("No valid student ID found.")
        return
      }

      const response = await fetch(`http://172.16.156.52:5000/admins/get-feedback-report/${studentId}/${term}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch feedback report.")
      }

      const data = await response.json()
      console.log("Feedback Report:", data)

      // Store the data properly
      setFeedback(data)
      return data
    } catch (error) {
      console.error("Error fetching feedback report:", error)
      return null
    }
  }
  useEffect(() => {
    const getFeedbackReport = async () => {
      const term = 1 // Replace with actual term or dynamic value
      const report = await fetchFeedbackReport(term)

      if (report) {
        console.log("Feedback report fetched successfully:", report)
        // Handle or display the report data here
      }
    }

    getFeedbackReport()
  }, [])

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

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      setShowMinHeader(value > 100)
    })
    return () => scrollY.removeAllListeners()
  }, [])

  useEffect(() => {
    // Animate the overall progress from 0 to 78
    Animated.timing(overallProgress, {
      toValue: 78,
      duration: 1500,
      useNativeDriver: false,
    }).start()
  }, [])

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [120, 60],
    extrapolate: "clamp",
  })

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  const minHeaderContentOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const handleCardPress = (cardType: string) => {
    setSelectedCard(selectedCard === cardType ? null : cardType)

    if (cardType === "activeCourses") {
      setShowCoursesModal(true)
    } else if (cardType === "pendingAssignments") {
      setShowAssignmentsModal(true)
      setHasUnreadAssignments(false)
    } else if (cardType === "upcomingSessions") {
      setShowSessionsModal(true)
    }
  }

  const handleReply = (teacher: string) => {
    setCurrentTeacher(teacher)
    setShowChatModal(true)
  }

  const handleReportGeneration = async (teacher: string, message: string, time: string) => {
    setIsGeneratingReport(true)
    try {
      // Call the Flask API endpoint
      const studentId = 1 // Replace with actual student ID from your app state
      const term = 1 // Replace with actual term from your app state

      const response = await fetch(`http://192.168.109.54:5000/get-feedback-report/${studentId}/${term}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch report")
      }

      const data = await response.json()
      console.log("Report generated successfully:", data)

      // Here you can handle the report data, e.g., display it in a modal
      // or navigate to a report view screen
    } catch (error) {
      console.error("Error generating report:", error)
      // You might want to show an error message to the user
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log(`Message to ${currentTeacher}: ${message}`)
      setMessage("")
      setShowChatModal(false)
    }
  }
  const generatePDF = async () => {
    const showData = (data: any) => {
      Alert.alert("JSON Data", JSON.stringify(data, null, 2))
    }

    showData(feedback)

    // try {
    //   // Convert JSON to HTML format for PDF
    //   const jsonContent = `
    //     <h2>Feedback Report</h2>
    //     <pre>${JSON.stringify(feedback, null, 2)}</pre>
    //   `

    //   // Define PDF options
    //   const options = {
    //     html: jsonContent,
    //     fileName: `Feedback_Report`,
    //     directory: "Documents",
    //   }

    //   // Create the PDF
    //   const file = await RNHTMLtoPDF.convert(options)

    //   if (file.filePath) {
    //     Alert.alert("Success", `PDF saved to ${file.filePath}`)
    //     console.log("PDF Path:", file.filePath)
    //   } else {
    //     throw new Error("PDF creation failed.")
    //   }
    // } catch (error) {
    //   Alert.alert("Error", "Failed to generate PDF.")
    //   console.error("Error generating PDF:", error)
    // } finally {
    //   setLoading(false)
    // }
  }

  const handleBellPress = () => {
    setShowAssignmentsModal(true)
    setHasUnreadNotifications(false)
  }

  const handleProfilePress = () => {
    setShowProfileModal(true)
  }

  const handleAIChatPress = () => {
    setShowAIChatModal(true)
  }

  const handleOpenFeedbackReport = () => {
    setShowFeedbackReport(true)
  }

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View style={[styles.headerContent, { opacity: headerContentOpacity }]}>
            <Pressable onPress={handleProfilePress}>
              <View style={styles.logoContainer}>
                <View style={styles.logo} />
              </View>
            </Pressable>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back, {studentName}!</Text>
              <Text style={styles.subText}>Track your progress and stay connected.</Text>
            </View>
            <Pressable style={styles.notificationBell} onPress={handleBellPress}>
              <MaterialIcons name="notifications" size={24} color="#333" />
              {hasUnreadNotifications && <View style={styles.notificationDot} />}
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.minHeaderContent, { opacity: minHeaderContentOpacity }]}>
            <Pressable onPress={handleProfilePress}>
              <View style={styles.logo} />
            </Pressable>
            <Text style={styles.minHeaderText}>{studentName}</Text>
            <Pressable style={styles.notificationBell} onPress={handleBellPress}>
              <MaterialIcons name="notifications" size={24} color="#333" />
              {hasUnreadNotifications && <View style={styles.notificationDot} />}
            </Pressable>
          </Animated.View>
        </Animated.View>

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
              <RadialProgress percentage={overallProgress} size={120} strokeWidth={12} color="#408c4c" animated={true} />
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
              showNotification={hasUnreadAssignments}
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
                onReport={handleOpenFeedbackReport}
              />
            ))}
          </View>

          {/* FAQ Section */}
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {faqData.map((faq) => (
              <Pressable
                key={faq.id}
                style={styles.faqItem}
                onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <MaterialIcons
                    name={expandedFaq === faq.id ? "expand-less" : "expand-more"}
                    size={24}
                    color="#8B4513"
                  />
                </View>
                {expandedFaq === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </Pressable>
            ))}
          </View> */}

          {/* Add padding at the bottom for tab bar */}
          <View style={{ height: 80 }} />
        </Animated.ScrollView>
        <FeedbackReport
          feedbackData={feedback}
          visible={showFeedbackReport}
          onClose={() => setShowFeedbackReport(false)}
        />

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
    paddingTop: -28,
  },
  header: {
    backgroundColor: "rgba(255, 216, 112, 0.9)",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
  },
  minHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  minHeaderText: {
    fontSize: 18,
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
    borderColor: "#D2B48C",
  },
  notificationBell: {
    marginLeft: 15,
    position: 'relative',
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
    backgroundColor: "#408c4c",
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
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    margin: "1%",
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#D2B48C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 180,
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
    borderBottomColor: "#D2B48C",
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

