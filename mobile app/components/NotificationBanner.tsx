import React from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
  onPress?: () => void;
}

export default function NotificationBanner({ 
  message, 
  type = 'info',
  onPress 
}: NotificationBannerProps) {
  const backgroundColor = {
    info: '#2196F3',
    warning: '#FF9800',
    success: '#4CAF50',
  }[type];

  const icon = {
    info: 'info',
    warning: 'warning',
    success: 'check-circle',
  }[type];

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor, opacity: pressed ? 0.9 : 1 }
      ]}
    >
      <MaterialIcons name={icon} size={20} color="#fff" />
      <Text style={styles.text}>{message}</Text>
      <MaterialIcons name="chevron-right" size={20} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
});