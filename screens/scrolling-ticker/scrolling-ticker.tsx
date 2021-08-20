import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import Palette from '../../palette'
import Constants from 'expo-constants'
import ScrollingTicker from './components/scrolling-ticker'

interface Props extends NavigationProps<'ScrollingTicker'> {}

const ScrollingTickerScreen = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollingTicker>
        <Text>LEMUA NICE YAAR</Text>
      </ScrollingTicker>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Constants.statusBarHeight + 8,
    backgroundColor: Palette.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ScrollingTickerScreen
