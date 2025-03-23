import type React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface CourseCardProps {
  title: string
  progress: number
  teacher: string
  time: string
  onPress: () => void
  isSelected: boolean
}

const CourseCard: React.FC<CourseCardProps> = ({ title, progress, teacher, time, onPress, isSelected }) => {
  return (
    <Pressable style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="school" size={24} color="#8B4513" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.teacher}>{teacher}</Text>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#408c4c",
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    fontFamily: "JosefinSans-Regular",
  },
  teacher: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "JosefinSans-Regular",
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    fontFamily: "JosefinSans-Regular",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E6E6E6",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#408c4c",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#408c4c",
    fontFamily: "JosefinSans-Regular",
  },
})

export default CourseCard

