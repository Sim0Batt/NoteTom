import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../Screens/CalendarScreen/CalendarScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Colors from '../Utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
      <Tab.Navigator screenOptions={
        {headerShown: false, tabBarActiveTintColor: Colors.DARKSLATEGRAY, tabBarInactiveBackgroundColor: Colors.LIGHTGRAY, tabBarActiveBackgroundColor: Colors.LIGHTGRAY}
       }>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel:()=>(
            <Text style={styles.menuText}>Home</Text>
          ),
          tabBarIcon:({color})=>(
            <FontAwesome5 name="home" size={24} color={color} />
          )
      }}
        
        />
        <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{
          tabBarLabel:({color})=>(
            <Text style={styles.menuText}>Calendar</Text>
          ),
          tabBarIcon:({color})=>(
            <Feather name="calendar" size={24} color={color} />          )
        }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menuText:{
    fontSize:12,
    marginTop: -7
  }
})