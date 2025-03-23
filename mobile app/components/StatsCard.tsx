import type React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface StatsCardProps {
  title: string
  value: string
  icon: string
  color: string
  onPress: () => void
  isSelected: boolean
  showNotification?: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  onPress,
  isSelected,
  showNotification = false,
}) => {
  return (
    <Pressable style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        {showNotification && <View style={styles.notificationDot} />}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    margin: "1%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 180,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#408c4c",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
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
  value: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "JosefinSans-Regular",
  },
  title: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "JosefinSans-Regular",
  },
})

export default StatsCard

