import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Palette from '../../palette'
import { Text } from 'react-native'
import Constants from 'expo-constants'
import Button from '../../components/button'

interface Props extends NavigationProps<'Home'> {}

const screens: [
  keyof StackParamList,
  StackParamList[keyof StackParamList],
  string,
][] = [
  ['Playground', undefined, 'Playground'],
  ['SlidesOne', undefined, 'Slides One'],
  ['SoundcloudWaveform', undefined, 'Soundcloud Waveform'],
  ['Ripples', undefined, 'Ripples'],
  ['SpinWheel', undefined, 'Spin Wheel'],
  ['ScrollingTicker', undefined, 'Scrolling Ticker'],
]

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Palette.Blue} />
      <Text style={styles.text}>Home</Text>
      <View style={styles.subcontainer}>
        {screens.map(([screen, params, label]) => (
          <Button
            key={screen}
            onPress={() => navigation.navigate(screen, params)}
            style={styles.button}
          >
            {label}
          </Button>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Constants.statusBarHeight + 8,
    backgroundColor: Palette.White,
  },
  subcontainer: {
    paddingVertical: 16,
    flex: 1,
  },
  text: {
    color: Palette.Blue,
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    margin: 4,
  },
})

export default HomeScreen
