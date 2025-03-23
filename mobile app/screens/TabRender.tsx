// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from '../navigation/TabNavigator';

export default function TabRender() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabNavigator />
    </GestureHandlerRootView>
  );
}


