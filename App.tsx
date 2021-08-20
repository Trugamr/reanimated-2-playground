import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import HomeScreen from './screens/home'
import PlaygroundScreen from './screens/playground'
import SlidesOneScreen from './screens/slides-one'
import SoundcloudWaveformScreen from './screens/soundcloud-waveform'
import Ripples from './screens/ripples'
import SpinWheel from './screens/spin-wheel'
import ScrollingTickerScreen from './screens/scrolling-ticker'

const Stack = createStackNavigator<StackParamList>()
const stackOptions: StackNavigationOptions = {
  headerShown: false,
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={stackOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Playground" component={PlaygroundScreen} />
        <Stack.Screen name="SlidesOne" component={SlidesOneScreen} />
        <Stack.Screen
          name="SoundcloudWaveform"
          component={SoundcloudWaveformScreen}
        />
        <Stack.Screen name="Ripples" component={Ripples} />
        <Stack.Screen name="SpinWheel" component={SpinWheel} />
        <Stack.Screen
          name="ScrollingTicker"
          component={ScrollingTickerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
