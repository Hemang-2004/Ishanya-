import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from "react-native"

// Import screens
import Dashboard from "../screens/Dashboard"
import GroupChatScreen from "../screens/GroupChatScreen"
import SchedulerScreen from "../screens/SchedulerScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

// Custom tab bar icon with label underneath
const TabBarIcon = ({ name, color, label }) => (
  <View style={styles.tabIconContainer}>
    <MaterialIcons name={name} size={24} color={color} />
    <Text style={[styles.tabLabel, { color }]}>{label}</Text>
  </View>
)

// Top tab navigator for swipe functionality
const TopTabNavigator = ({ initialRoute }) => {
  return (
    <TopTab.Navigator
      initialRouteName={initialRoute}
      tabBarPosition="none" // Hide the top tab bar
      swipeEnabled={true}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <TopTab.Screen name="DashboardSwipe" component={Dashboard} />
      <TopTab.Screen name="GroupChatSwipe" component={GroupChatScreen} />
      <TopTab.Screen name="SchedulerSwipe" component={SchedulerScreen} />
      <TopTab.Screen name="ProfileSwipe" component={ProfileScreen} />
    </TopTab.Navigator>
  )
}

// Main tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#408c4c", // Green color from registration form
        tabBarInactiveTintColor: "#8B4513", // Dark brown color
      })}
    >
      <Tab.Screen
        name="Dashboard"
        children={() => <TopTabNavigator initialRoute="DashboardSwipe" />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} label="Home" />,
        }}
      />
      <Tab.Screen
        name="GroupChat"
        children={() => <TopTabNavigator initialRoute="GroupChatSwipe" />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="chat" color={color} label="Chat" />,
        }}
      />
      <Tab.Screen
        name="Scheduler"
        children={() => <TopTabNavigator initialRoute="SchedulerSwipe" />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="event" color={color} label="Calendar" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <TopTabNavigator initialRoute="ProfileSwipe" />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} label="Profile" />,
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF8DC", // Light yellowish background from registration form
    borderTopWidth: 1,
    borderTopColor: "#D2B48C", // Tan border color
    height: 70,
    paddingBottom: 10,
    paddingTop: 5,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: -14, // Prevents ellipsis
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
})

export default TabNavigator



