import type React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

interface MessageCardProps {
  teacher: string
  time: string
  message: string
  onReply: () => void
  onPress: () => void
  isSelected: boolean
}

const MessageCard: React.FC<MessageCardProps> = ({ teacher, time, message, onReply, onPress, isSelected }) => {
  return (
    <Pressable style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.teacherInfo}>
          <Text style={styles.teacher}>{teacher}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.replyButton} onPress={onReply}>
        <Text style={styles.replyText}>Reply</Text>
      </Pressable>
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
    padding: 15,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#408c4c",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  teacherInfo: {
    flex: 1,
  },
  teacher: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
    fontFamily: "JosefinSans-Bold",
  },
  time: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    fontFamily: "JosefinSans-Regular",
  },
  replyButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  replyText: {
    fontSize: 14,
    color: "#408c4c",
    fontFamily: "JosefinSans-Regular",
  },
})

export default MessageCard

