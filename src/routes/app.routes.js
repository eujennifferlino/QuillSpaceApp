import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import NewPost from '../pages/NewPost';
import UserPosts from '../pages/UserPosts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='Home' 
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='NewPost' 
        component={NewPost}
        options={{
          title: 'Nova postagem',
          headerTintColor: '#F0F4FF',
          headerStyle:{
            backgroundColor:'#1a1e29'
          }
        }}
      />

      <Stack.Screen 
        name='UserPosts' 
        component={UserPosts}
        options={{
          headerTintColor: '#F0F4FF',
          headerStyle:{
            backgroundColor: '#1a1e29'
          }
        }}
      />
    </Stack.Navigator>
  )
}

function AppRoutes(){
  return(
    <Tab.Navigator screenOptions={{
      headerShown: false, 
      tabBarHideOnKeyboard: true, 
      tabBarShowLabel: false, 
      tabBarActiveTintColor: "#F0F4FF",
      tabBarStyle:{
        backgroundColor: "#2D3447",
        borderTopWidth: 0
      }
      }}>
      <Tab.Screen 
        name='HomeTab' 
        component={StackRoutes} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />
          }
        }}
      />
      <Tab.Screen
        name='Search' 
        component={Search} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />
          }
        }}
      />
      <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes;