"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Modal, PanResponder, Animated, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"

// Sample calendar data
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const CURRENT_DATE = new Date()
const MONTH = CURRENT_DATE.toLocaleString("default", { month: "long" })
const YEAR = CURRENT_DATE.getFullYear()

// Add this interface before the EVENTS constant
interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  color: string;
  instructor: string;
  courseCode: string;
  duration: string;
  description: string;
  prerequisites: string;
  materials: string;
}

// Generate dates for the current week and beyond
const generateWeekDates = () => {
  const dates = []
  const today = new Date()
  const day = today.getDay() // 0 = Sunday, 6 = Saturday

  // Get the date for Sunday (start of the week)
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - day)

  // Generate dates for the week and beyond (up to 60 days from today)
  for (let i = 0; i < 60; i++) {
    const date = new Date(sunday)
    date.setDate(sunday.getDate() + i)
    dates.push({
      id: i.toString(),
      day: DAYS[date.getDay()],
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    })
  }

  return dates
}

// Sample events data
const EVENTS: Event[] = [
  {
    id: "1",
    title: "Digital Literacy Class",
    time: "10:00 AM - 11:30 AM",
    location: "Room 101",
    color: "#4CAF50",
    instructor: "Dr. Sarah Johnson",
    courseCode: "DL101",
    duration: "1.5 hours",
    description: "Learn essential digital skills including computer basics, internet navigation, and digital communication tools.",
    prerequisites: "None",
    materials: "Laptop/Tablet, Notebook",
  },
  {
    id: "2",
    title: "Communication Skills Workshop",
    time: "1:00 PM - 2:30 PM",
    location: "Auditorium",
    color: "#2196F3",
    instructor: "Prof. Michael Chen",
    courseCode: "CSW202",
    duration: "1.5 hours",
    description: "Enhance your verbal and written communication skills through interactive exercises and real-world scenarios.",
    prerequisites: "Basic English proficiency",
    materials: "Course workbook, Pen",
  },
  {
    id: "3",
    title: "Project Submission Deadline",
    time: "4:00 PM",
    location: "Online",
    color: "#FF9800",
    instructor: "Dr. Emily Brown",
    courseCode: "PSD303",
    duration: "1 hour",
    description: "Final project submission and presentation for the Digital Skills Certification program.",
    prerequisites: "Completed all course modules",
    materials: "Project documentation, Presentation slides",
  },
  {
    id: "4",
    title: "Meeting with Counselor",
    time: "5:00 PM - 5:30 PM",
    location: "Room 205",
    color: "#9C27B0",
    instructor: "Ms. Lisa Anderson",
    courseCode: "COU404",
    duration: "30 minutes",
    description: "One-on-one counseling session to discuss academic progress and future course planning.",
    prerequisites: "None",
    materials: "Academic records, Course plan",
  },
]

export default function SchedulerScreen() {
  const [selectedDate, setSelectedDate] = useState(CURRENT_DATE.getDate())
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_DATE.getMonth())
  const [selectedYear, setSelectedYear] = useState(CURRENT_DATE.getFullYear())
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(CURRENT_DATE.getMonth())
  const [currentYear, setCurrentYear] = useState(CURRENT_DATE.getFullYear())
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const weekDates = generateWeekDates()

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        if (gestureState.dx > 0) {
          // Swipe right - previous month
          if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
          } else {
            setCurrentMonth(currentMonth - 1)
          }
        } else {
          // Swipe left - next month
          if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
          } else {
            setCurrentMonth(currentMonth + 1)
          }
        }
      }
    },
  })

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handleTodayPress = () => {
    setShowDropdown(true)
    setCurrentMonth(CURRENT_DATE.getMonth())
    setCurrentYear(CURRENT_DATE.getFullYear())
  }

  const handleDateSelect = (date: number, month: number, year: number) => {
    setSelectedDate(date)
    setSelectedMonth(month)
    setSelectedYear(year)
    setShowDropdown(false)
  }

  const handleEventExpand = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dropdownDateItem} />)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === CURRENT_DATE.getDate() && 
                      currentMonth === CURRENT_DATE.getMonth() && 
                      currentYear === CURRENT_DATE.getFullYear()
      
      days.push(
        <TouchableOpacity
          key={i.toString()}
          style={[
            styles.dropdownDateItem,
            isToday && styles.dropdownTodayItem,
            i === selectedDate && styles.dropdownSelectedItem
          ]}
          onPress={() => handleDateSelect(i, currentMonth, currentYear)}
        >
          <Text style={[
            styles.dropdownDateText,
            isToday && styles.dropdownTodayText,
            i === selectedDate && styles.dropdownSelectedText
          ]}>
            {i}
          </Text>
        </TouchableOpacity>
      )
    }

    return days
  }

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dateItem, item.isToday && styles.todayItem, item.date === selectedDate && item.month === selectedMonth && styles.selectedDateItem]}
      onPress={() => handleDateSelect(item.date, item.month, item.year)}
    >
      <Text style={[styles.dayText, (item.isToday || (item.date === selectedDate && item.month === selectedMonth)) && styles.selectedDayText]}>
        {item.day}
      </Text>
      <Text style={[styles.dateText, (item.isToday || (item.date === selectedDate && item.month === selectedMonth)) && styles.selectedDayText]}>
        {item.date}
      </Text>
    </TouchableOpacity>
  )

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={[styles.eventItem, { borderLeftColor: item.color }]}
      onPress={() => handleEventExpand(item.id)}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <MaterialIcons 
          name={expandedEventId === item.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#666" 
        />
      </View>
      <View style={styles.eventDetails}>
        <View style={styles.eventDetail}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>
        <View style={styles.eventDetail}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.eventDetailText}>{item.location}</Text>
        </View>
      </View>
      
      {expandedEventId === item.id && (
        <View style={styles.expandedDetails}>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="person" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>Instructor: {item.instructor}</Text>
          </View>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="class" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>Course Code: {item.courseCode}</Text>
          </View>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="timer" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>Duration: {item.duration}</Text>
          </View>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="description" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>{item.description}</Text>
          </View>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="school" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>Prerequisites: {item.prerequisites}</Text>
          </View>
          <View style={styles.expandedDetailRow}>
            <MaterialIcons name="inventory" size={16} color="#666" />
            <Text style={styles.expandedDetailText}>Materials: {item.materials}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {CURRENT_DATE.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleTodayPress}>
              <MaterialIcons name="today" size={24} color="#408c4c" />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={showDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowDropdown(false)}
          >
            <View style={styles.dropdownCalendar} {...panResponder.panHandlers}>
              <View style={styles.dropdownHeader}>
                <TouchableOpacity onPress={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear(currentYear - 1)
                  } else {
                    setCurrentMonth(currentMonth - 1)
                  }
                }}>
                  <MaterialIcons name="chevron-left" size={24} color="#408c4c" />
                </TouchableOpacity>
                <Text style={styles.dropdownTitle}>
                  {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
                </Text>
                <TouchableOpacity onPress={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0)
                    setCurrentYear(currentYear + 1)
                  } else {
                    setCurrentMonth(currentMonth + 1)
                  }
                }}>
                  <MaterialIcons name="chevron-right" size={24} color="#408c4c" />
                </TouchableOpacity>
              </View>
              <View style={styles.dropdownDays}>
                {DAYS.map(day => (
                  <Text key={day} style={styles.dropdownDayHeader}>{day}</Text>
                ))}
              </View>
              <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.dropdownDates}>
                  {renderCalendarDays()}
                </View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.calendarContainer}>
          <FlatList
            data={weekDates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          />
        </View>

        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>
            Schedule for {new Date(selectedYear, selectedMonth).toLocaleString("default", { month: "long" })} {selectedDate}
          </Text>
          <FlatList
            data={EVENTS}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
          />
        </View>
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
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
  calendarContainer: {
    backgroundColor: "#FFF8DC",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
  },
  dateList: {
    paddingHorizontal: 10,
  },
  dateItem: {
    width: 60,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#FFFAF0",
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  todayItem: {
    backgroundColor: "#408c4c",
  },
  selectedDateItem: {
    backgroundColor: "#8B4513",
  },
  dayText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "JosefinSans-Regular",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  selectedDayText: {
    color: "#fff",
  },
  eventsContainer: {
    flex: 1,
    padding: 15,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Regular",
  },
  eventsList: {
    paddingBottom: 80,
  },
  eventItem: {
    backgroundColor: "#FFF8DC",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  eventDetails: {
    marginTop: 5,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
    fontFamily: "JosefinSans-Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownCalendar: {
    backgroundColor: "#FFF8DC",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "JosefinSans-Regular",
  },
  dropdownDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dropdownDayHeader: {
    width: "14.28%",
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
    textAlign: "center",
  },
  dropdownScrollView: {
    maxHeight: 400,
  },
  dropdownDates: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
  },
  dropdownDateItem: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#FFFAF0",
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  dropdownTodayItem: {
    backgroundColor: "#408c4c",
  },
  dropdownSelectedItem: {
    backgroundColor: "#8B4513",
  },
  dropdownDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  dropdownTodayText: {
    color: "#fff",
  },
  dropdownSelectedText: {
    color: "#fff",
  },
  expandedDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#D2B48C",
  },
  expandedDetailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  expandedDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
    fontFamily: "JosefinSans-Regular",
  },
})

