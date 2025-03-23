// components/BarChart.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type BarChartProps = {
  data: Array<{ subject: string; marks: number }>;
  height: number;
  width: any; // Can be a string like "100%" or a number
};

const BarChart = ({ data, height, width }: BarChartProps) => {
  const animations = useRef(data.map(() => new Animated.Value(0))).current;
  
  useEffect(() => {
    const animations_array = animations.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: data[index].marks / 100, // Normalize to 0-1 scale
        duration: 1000,
        useNativeDriver: false,
        delay: index * 150, // Stagger the animations
      });
    });
    
    Animated.parallel(animations_array).start();
  }, [data]);
  
  const maxValue = Math.max(...data.map(item => item.marks));
  const barWidth = 100 / (data.length * 2); // Each bar takes up this percentage of width
  
  return (
    <View style={[styles.container, { height, width }]}>
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
              {item.subject}
            </Text>
            <View style={styles.barBackground}>
              <Animated.View 
                style={[
                  styles.bar, 
                  { 
                    height: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }),
                    backgroundColor: getBarColor(item.marks)
                  }
                ]} 
              />
            </View>
            <Text style={styles.value}>{item.marks}%</Text>
          </View>
        ))}
      </View>
      
      {/* Y-axis labels */}
      <View style={styles.yAxis}>
        <Text style={styles.axisLabel}>100%</Text>
        <Text style={styles.axisLabel}>75%</Text>
        <Text style={styles.axisLabel}>50%</Text>
        <Text style={styles.axisLabel}>25%</Text>
        <Text style={styles.axisLabel}>0%</Text>
      </View>
    </View>
  );
};

const getBarColor = (value: number) => {
  if (value >= 90) return '#408c4c'; // Green for excellent
  if (value >= 75) return '#8bc34a'; // Light green for good
  if (value >= 60) return '#FFC107'; // Yellow for average
  if (value >= 40) return '#FF9800'; // Orange for below average
  return '#F44336'; // Red for poor
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingLeft: 30, // Space for y-axis
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '85%', // Leave space for labels
    width: '20%',
  },
  barBackground: {
    height: '100%',
    width: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  label: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
    width: '100%',
    fontFamily: 'JosefinSans-Regular',
  },
  value: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontFamily: 'JosefinSans-Bold',
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 5,
    paddingBottom: '15%', // Match the chart's internal spacing
  },
  axisLabel: {
    fontSize: 8,
    color: '#999',
    fontFamily: 'JosefinSans-Regular',
  },
});

export default BarChart;