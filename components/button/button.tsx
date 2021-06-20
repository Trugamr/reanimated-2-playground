import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import Palette from '../../palette'

interface ButtonProps {
  children: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const SPRING_CONFIG: Animated.WithSpringConfig = {
  stiffness: 560,
  damping: 18,
}

const Button = ({ children, onPress, style }: ButtonProps) => {
  // END, FAILED - 0
  // BEGAN, ACTIVE - 1
  const animatedState = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedState.value,
      [0, 1],
      [Palette.NavyBlue, Palette.DarkerBlue],
    )
    const scale = interpolate(animatedState.value, [0, 1], [1, 0.95])
    return { backgroundColor, transform: [{ scale }] }
  })

  const tapGestureHandler = ({
    nativeEvent: { state },
  }: TapGestureHandlerStateChangeEvent) => {
    switch (state) {
      case State.BEGAN:
        animatedState.value = withSpring(1, SPRING_CONFIG)
        break
      case State.END:
        animatedState.value = withSpring(0, SPRING_CONFIG)
        onPress && onPress()
        break
      case State.CANCELLED:
      case State.FAILED:
        animatedState.value = withSpring(0, SPRING_CONFIG)
    }
  }

  return (
    <TapGestureHandler onHandlerStateChange={tapGestureHandler}>
      <Animated.View style={[styles.container, style, animatedStyle]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.NavyBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Palette.White,
    fontSize: 16,
  },
})

export default Button
