import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import Palette from '../../palette'
import { Text } from 'react-native'
import Constants from 'expo-constants'

interface Props extends NavigationProps<'Playground'> {}

const PlaygroundScreen = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Playground</Text>
      <View style={styles.subcontainer}></View>
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
    flex: 1,
  },
  text: {
    color: Palette.Blue,
    fontWeight: 'bold',
    fontSize: 30,
  },
})

export default PlaygroundScreen
