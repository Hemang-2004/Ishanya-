import React from "react"
import { View, Text, StyleSheet, Pressable, Animated } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface StatsCardProps {
  title: string
  value: string | number | Animated.Value
  icon: keyof typeof MaterialIcons.glyphMap
  color: string
  onPress: () => void
  isSelected: boolean
  showNotification?: boolean
  animated?: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  onPress,
  isSelected,
  showNotification = false,
  animated = false,
}) => {
  const displayValue = React.useMemo(() => {
    if (animated && value instanceof Animated.Value) {
      return value.interpolate({
        inputRange: [0, 100],
        outputRange: ["0", "100"],
      })
    }
    return value.toString()
  }, [animated, value])

  return (
    <Pressable style={[styles.card, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        {showNotification && <View style={styles.notificationDot} />}
      </View>
      {animated && value instanceof Animated.Value ? (
        <Animated.Text style={styles.value}>
          {value.interpolate({
            inputRange: [0, 100],
            outputRange: ["0", "100"],
          })}
        </Animated.Text>
      ) : (
        <Text style={styles.value}>{value.toString()}</Text>
      )}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
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

