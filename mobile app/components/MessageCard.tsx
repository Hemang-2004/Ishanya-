import { View, Text, StyleSheet, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

interface MessageCardProps {
  teacher: string
  time: string
  message: string
  onReply: () => void
  onPress: () => void
  isSelected: boolean
  onReport: () => void
}

export default function MessageCard({
  teacher,
  time,
  message,
  onReply,
  onPress,
  isSelected,
  onReport,
}: MessageCardProps) {
  return (
    <Pressable style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.teacher}>{teacher}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.replyButton} onPress={onReply}>
          <MaterialIcons name="reply" size={18} color="#408c4c" />
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={onReport}>
          <MaterialIcons name="description" size={18} color="#8B4513" />
          <Text style={styles.reportText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF8DC", // Light yellowish background
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D2B48C", // Tan border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#408c4c", // Green border when selected
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  teacher: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  time: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Regular",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  replyText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#408c4c",
    fontFamily: "JosefinSans-Regular",
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  reportText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#8B4513",
    fontFamily: "JosefinSans-Regular",
  },
})

