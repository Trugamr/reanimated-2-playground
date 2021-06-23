import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import Palette from '../../../palette'
import Constants from 'expo-constants'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

interface Props {
  index: number
  text: string
  animatedIndex: Animated.SharedValue<number>
}

const Slide = ({ index, text, animatedIndex }: Props) => {
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1]
    const scale = interpolate(
      animatedIndex.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    )
    const opacity = interpolate(
      animatedIndex.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP,
    )

    return { opacity, transform: [{ scale }] }
  })

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyles]}>
        {text}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    backgroundColor: Palette.Blue,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: Palette.White,
    fontSize: 50,
    textTransform: 'lowercase',
  },
})

export default Slide
