"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native"

interface AttendanceData {
  month: string
  percentage: number
}

interface AttendanceGraphProps {
  data: AttendanceData[]
}

const AttendanceGraph: React.FC<AttendanceGraphProps> = ({ data }) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current
  const maxValue = 78 // Maximum value for the graph
  const screenWidth = Dimensions.get("window").width
  const barWidth = (screenWidth - 60) / data.length - 10

  useEffect(() => {
    const animations = animatedValues.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: data[index].percentage / maxValue,
        duration: 1000 + index * 100, // Staggered animation
        useNativeDriver: false,
      })
    })

    Animated.stagger(100, animations).start()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Attendance</Text>
      <View style={styles.graphContainer}>
        {data.map((item, index) => {
          const barHeight = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150],
          })

          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabelContainer}>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      width: barWidth,
                      backgroundColor: item.percentage > 60 ? "#408c4c" : item.percentage > 40 ? "#FF9800" : "#FF5252",
                    },
                  ]}
                />
                <Text style={styles.percentageText}>{item.percentage}%</Text>
              </View>
              <Text style={styles.monthLabel}>{item.month}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Bold",
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 180,
  },
  barContainer: {
    alignItems: "center",
  },
  barLabelContainer: {
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  monthLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  percentageText: {
    fontSize: 10,
    color: "#333",
    marginTop: 4,
    fontFamily: "JosefinSans-Regular",
  },
})

export default AttendanceGraph

