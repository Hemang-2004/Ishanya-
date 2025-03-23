// components/RadialProgress.tsx
import React, { useEffect } from "react"
import { View, Text, Animated, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

type RadialProgressProps = {
  percentage: any, // Can be a number or an Animated.Value
  size: number,
  strokeWidth: number,
  color: string,
  animated?: boolean,
}

const RadialProgress = ({ percentage, size, strokeWidth, color, animated = false }: RadialProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  // Calculate the stroke-dashoffset based on the percentage
  const getStrokeDashoffset = (percent: number) => {
    const calculatedPercentage = Math.min(100, Math.max(0, percent))
    return circumference - (circumference * calculatedPercentage) / 100
  }
  
  // For non-animated usage
  const fixedStrokeDashoffset = getStrokeDashoffset(animated ? 0 : (percentage as number))
  
  // For animated usage
  const animatedStrokeDashoffset = React.useMemo(() => {
    if (!animated || typeof percentage !== 'object') return undefined
    
    return percentage.interpolate({
      inputRange: [0, 100],
      outputRange: [circumference, 0],
      extrapolate: 'clamp',
    })
  }, [animated, percentage, circumference])
  
  // Display percentage
  const displayPercentage = React.useMemo(() => {
    if (animated && typeof percentage === 'object') {
      return percentage.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      })
    }
    return `${Math.round(percentage as number)}%`
  }, [animated, percentage])

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={{ transform: [{ rotateZ: '-90deg' }] }}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F5F5F5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        {animated && typeof percentage === 'object' ? (
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={animatedStrokeDashoffset}
            strokeLinecap="round"
          />
        ) : (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={fixedStrokeDashoffset}
            strokeLinecap="round"
          />
        )}
      </Svg>
      
      <View style={[styles.percentageContainer, { width: size, height: size }]}>
        {animated && typeof percentage === 'object' ? (
          <AnimatedText style={styles.percentageText}>{displayPercentage}</AnimatedText>
        ) : (
          <Text style={styles.percentageText}>{displayPercentage as string}</Text>
        )}
      </View>
    </View>
  )
}

// Create animated components
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedText = Animated.createAnimatedComponent(Text)

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
})

export default RadialProgress