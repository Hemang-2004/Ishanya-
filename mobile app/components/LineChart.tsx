// components/LineChart.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';

type LineChartProps = {
  data: number[];
  height: number;
  width: any; // Can be a string like "100%" or a number
};

const LineChart = ({ data, height, width }: LineChartProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const svgHeight = height * 0.9; // Leave space for labels
  const svgWidth = typeof width === 'string' ? 300 : width; // Default width if percentage
  
  const maxValue = 100; // Using percentage scale for attendance
  const yRatio = svgHeight / maxValue;
  const xRatio = svgWidth / (data.length - 1);
  
  // Generate path for the line
  const linePath = data.map((value, index) => {
    const x = index * xRatio;
    const y = svgHeight - (value * yRatio);
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');
  
  // Generate area fill path
  const areaPath = `${linePath} L ${(data.length - 1) * xRatio} ${svgHeight} L 0 ${svgHeight} Z`;
  
  // Animation calculations
  const strokeDasharray = useRef(0);
  const pathRef = useRef<any>(null);
  
  const onPathLayout = () => {
    if (pathRef.current) {
      strokeDasharray.current = pathRef.current.getTotalLength();
      pathRef.current.setNativeProps({
        strokeDasharray: [strokeDasharray.current],
        strokeDashoffset: strokeDasharray.current,
      });
    }
  };
  
  useEffect(() => {
    if (strokeDasharray.current) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  }, [strokeDasharray.current]);
  
  const animatedProps = {
    strokeDashoffset: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [strokeDasharray.current, 0],
    }),
  };
  
  // X-axis labels (weeks)
  const weeks = Array.from({ length: data.length }, (_, i) => `Week ${i + 1}`);
  
  return (
    <View style={[styles.container, { height, width }]}>
      <Svg width={svgWidth} height={svgHeight}>
        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100].map((value, index) => {
          const y = svgHeight - (value * yRatio);
          return (
            <React.Fragment key={`grid-${index}`}>
              <Line
                x1={0}
                y1={y}
                x2={svgWidth}
                y2={y}
                stroke="#ddd"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <SvgText
                x={-20}
                y={y + 4}
                fontSize="8"
                fill="#999"
                textAnchor="start"
              >
                {value}%
              </SvgText>
            </React.Fragment>
          );
        })}
        
        {/* X-axis grid lines */}
        {data.map((_, index) => {
          const x = index * xRatio;
          return (
            <Line
              key={`x-grid-${index}`}
              x1={x}
              y1={0}
              x2={x}
              y2={svgHeight}
              stroke={index > 0 ? "#ddd" : "#999"}
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}
        
        {/* Area fill */}
        <Path
          d={areaPath}
          fill="rgba(64, 140, 76, 0.2)"
          stroke="none"
        />
        
        {/* Line */}
        <AnimatedPath
          ref={pathRef}
          onLayout={onPathLayout}
          d={linePath}
          fill="none"
          stroke="#408c4c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = index * xRatio;
          const y = svgHeight - (value * yRatio);
          return (
            <Circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#fff"
              stroke="#408c4c"
              strokeWidth="2"
            />
          );
        })}
      </Svg>
      
      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {weeks.map((week, index) => (
          <Text
            key={`label-${index}`}
            style={[
              styles.xLabel,
              { width: xRatio, left: index * xRatio - (xRatio / 2) }
            ]}
          >
            {week}
          </Text>
        ))}
      </View>
    </View>
  );
};

// Create an animated Path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30, // Space for y-axis labels
  },
  xAxisLabels: {
    flexDirection: 'row',
    position: 'relative',
    height: 20,
    width: '100%',
  },
  xLabel: {
    position: 'absolute',
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'JosefinSans-Regular',
  },
});

export default LineChart;