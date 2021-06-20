import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import HomeScreen from './screens/home'
import PlaygroundScreen from './screens/playground'

const Stack = createStackNavigator<StackParamList>()
const stackOptions: StackNavigationOptions = {
  headerShown: false,
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={stackOptions}
        />
        <Stack.Screen
          name="Playground"
          component={PlaygroundScreen}
          options={stackOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
