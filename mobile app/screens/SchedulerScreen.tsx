"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"

// Sample calendar data
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const CURRENT_DATE = new Date()
const MONTH = CURRENT_DATE.toLocaleString("default", { month: "long" })
const YEAR = CURRENT_DATE.getFullYear()

// Generate dates for the current week
const generateWeekDates = () => {
  const dates = []
  const today = new Date()
  const day = today.getDay() // 0 = Sunday, 6 = Saturday

  // Get the date for Sunday (start of the week)
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - day)

  // Generate dates for the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday)
    date.setDate(sunday.getDate() + i)
    dates.push({
      id: i.toString(),
      day: DAYS[i],
      date: date.getDate(),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    })
  }

  return dates
}

// Sample events data
const EVENTS = [
  {
    id: "1",
    title: "Digital Literacy Class",
    time: "10:00 AM - 11:30 AM",
    location: "Room 101",
    color: "#4CAF50",
  },
  {
    id: "2",
    title: "Communication Skills Workshop",
    time: "1:00 PM - 2:30 PM",
    location: "Auditorium",
    color: "#2196F3",
  },
  {
    id: "3",
    title: "Project Submission Deadline",
    time: "4:00 PM",
    location: "Online",
    color: "#FF9800",
  },
  {
    id: "4",
    title: "Meeting with Counselor",
    time: "5:00 PM - 5:30 PM",
    location: "Room 205",
    color: "#9C27B0",
  },
]

export default function SchedulerScreen() {
  const [selectedDate, setSelectedDate] = useState(CURRENT_DATE.getDate())
  const weekDates = generateWeekDates()

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dateItem, item.isToday && styles.todayItem, item.date === selectedDate && styles.selectedDateItem]}
      onPress={() => setSelectedDate(item.date)}
    >
      <Text style={[styles.dayText, (item.isToday || item.date === selectedDate) && styles.selectedDayText]}>
        {item.day}
      </Text>
      <Text style={[styles.dateText, (item.isToday || item.date === selectedDate) && styles.selectedDayText]}>
        {item.date}
      </Text>
    </TouchableOpacity>
  )

  const renderEventItem = ({ item }) => (
    <View style={[styles.eventItem, { borderLeftColor: item.color }]}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <MaterialIcons name="more-vert" size={20} color="#666" />
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
    </View>
  )

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {MONTH} {YEAR}
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="today" size={24} color="#408c4c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="add" size={24} color="#408c4c" />
            </TouchableOpacity>
          </View>
        </View>

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
            Schedule for {MONTH} {selectedDate}
          </Text>
          <FlatList
            data={EVENTS}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
          />
        </View>

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

