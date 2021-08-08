import React, { memo } from 'react'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import Palette from '../../../palette'

export interface RippleProps {
  key: string
  color?: string
  containerWidth: number
  containerHeight: number
  positionX: number
  positionY: number
  onAnimationEnd: () => void
}

const RADIUS = 10
const SPRING_CONFIG: Animated.WithSpringConfig = {
  damping: 200,
  stiffness: 40,
}

const Ripple = ({
  containerWidth,
  containerHeight,
  color = Palette.Blue,
  positionX,
  positionY,
  onAnimationEnd,
}: RippleProps) => {
  const progress = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 40])
    const opacity = interpolate(
      progress.value,
      [0.75, 1],
      [1, 0],
      Extrapolate.CLAMP,
    )

    return {
      transform: [{ scale }],
      top: positionY - RADIUS / 2,
      left: positionX - RADIUS / 2,
      opacity,
      backgroundColor: color,
    }
  })

  useEffect(() => {
    progress.value = withSpring(1, SPRING_CONFIG, () => {
      runOnJS(onAnimationEnd)()
    })
  }, [])

  return <Animated.View style={[styles.ripple, animatedStyle]} />
}

const styles = StyleSheet.create({
  ripple: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: 'red',
    position: 'absolute',
  },
})

export default memo(Ripple)
