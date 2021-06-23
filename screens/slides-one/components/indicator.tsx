import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import Palette from '../../../palette'

interface DotProps {
  index: number
  animatedIndex: Animated.SharedValue<number>
  onTap?: (index: number) => void
}
const Dot = ({ index, animatedIndex, onTap }: DotProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [index - 1, index, index + 1],
      [0.65, 1, 0.65],
      Extrapolate.CLAMP,
    )
    const scale = interpolate(
      animatedIndex.value,
      [index - 1, index, index + 1],
      [0.65, 1, 0.65],
      Extrapolate.CLAMP,
    )

    return { opacity, transform: [{ scale }] }
  })

  return (
    <TapGestureHandler onEnded={() => onTap && onTap(index)}>
      <Animated.View style={[styles.dot, animatedStyles]} />
    </TapGestureHandler>
  )
}

interface IndicatorProps {
  length: number
  animatedIndex: Animated.SharedValue<number>
  style?: StyleProp<ViewStyle>
  onDotTap?: (index: number) => void
}
const Indicator = ({ length, animatedIndex, style, onDotTap }: IndicatorProps) => {
  return (
    <View style={[styles.indicator, style]}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <Dot index={index} key={index} animatedIndex={animatedIndex} onTap={onDotTap} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
    flexDirection: 'row',
  },
  dot: {
    height: 14,
    width: 14,
    backgroundColor: Palette.White,
    borderRadius: 999,
    margin: 2,
  },
})

export default Indicator
