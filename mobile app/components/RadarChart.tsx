// components/RadarChart.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';

type RadarChartProps = {
  data: {
    categories: string[];
    values: number[];
  };
  size: number;
};

const RadarChart = ({ data, size }: RadarChartProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const center = size / 2;
  const radius = (size / 2) * 0.8; // 80% of half the size
  const angles = data.categories.map((_, i) => 
    ((2 * Math.PI * i) / data.categories.length) - Math.PI / 2
  );

  // Calculate points for each radar level (25%, 50%, 75%, 100%)
  const getPolygonPoints = (percentage: number) => {
    return angles.map(angle => {
      const x = center + radius * percentage * Math.cos(angle);
      const y = center + radius * percentage * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate data points
  const normalizedValues = data.values.map(val => val / 100); // Normalize to 0-1
  const getDataPoints = (scale: number) => {
    return angles.map((angle, i) => {
      const value = normalizedValues[i] * scale;
      const x = center + radius * value * Math.cos(angle);
      const y = center + radius * value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Animation interpolation for data polygon
  const animatedPoints = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getPolygonPoints(0), getDataPoints(1)],
  });

  // Calculate positions for labels
  const getLabelPosition = (angle: number, index: number) => {
    const labelRadius = radius * 1.1; // Place labels slightly outside the chart
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    return { x, y, textAnchor: getTextAnchor(angle), dy: getDy(angle) };
  };

  const getTextAnchor = (angle: number) => {
    // Determine text alignment based on angle
    const normalized = ((angle + Math.PI / 2) % (2 * Math.PI)) / (2 * Math.PI);
    if (normalized > 0.4 && normalized < 0.6) return 'middle';
    return normalized < 0.25 || normalized > 0.75 ? 'end' : 'start';
  };

  const getDy = (angle: number) => {
    // Adjust vertical position
    const normalized = ((angle + Math.PI / 2) % (2 * Math.PI)) / (2 * Math.PI);
    if (normalized > 0.4 && normalized < 0.6) return '1em';
    if (normalized > 0.9 || normalized < 0.1) return '-0.5em';
    return '0.4em';
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circles */}
        <Circle cx={center} cy={center} r={radius * 0.25} stroke="#ddd" strokeWidth="1" fill="none" />
        <Circle cx={center} cy={center} r={radius * 0.5} stroke="#ddd" strokeWidth="1" fill="none" />
        <Circle cx={center} cy={center} r={radius * 0.75} stroke="#ddd" strokeWidth="1" fill="none" />
        <Circle cx={center} cy={center} r={radius} stroke="#ddd" strokeWidth="1" fill="none" />
        
        {/* Spokes */}
        {angles.map((angle, i) => (
          <Line
            key={`line-${i}`}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="#ddd"
            strokeWidth="1"
          />
        ))}
        
        {/* Data polygon */}
        <AnimatedPolygon
          points={animatedPoints}
          fill="rgba(64, 140, 76, 0.5)"
          stroke="#408c4c"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {angles.map((angle, i) => {
          const value = normalizedValues[i];
          const cx = center + radius * value * Math.cos(angle);
          const cy = center + radius * value * Math.sin(angle);
          
          return (
            <Circle
              key={`point-${i}`}
              cx={cx}
              cy={cy}
              r="4"
              fill="#408c4c"
            />
          );
        })}
        
        {/* Category labels */}
        {angles.map((angle, i) => {
          const { x, y, textAnchor, dy } = getLabelPosition(angle, i);
          return (
            <SvgText
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dy={dy}
              fontSize="10"
              fill="#666"
            >
              {data.categories[i]}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

// Create an animated Polygon component
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadarChart;