import React, { ReactNode, useEffect, useState } from 'react'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'

const calculateChildrenCopies = (
  containerWidth: number,
  childrenWidth: number,
) => {
  const copiesFloat = containerWidth / childrenWidth
  if (isNaN(copiesFloat) || copiesFloat === Infinity) {
    return 1
  }
  return Math.max(Math.ceil(copiesFloat), 1)
}

interface ScrollingTickerProps {
  children: ReactNode
  styles?: StyleProp<ViewStyle>
  duration?: number
  spacing?: number
}

const ScrollingTicker = ({
  children,
  duration = 4000,
  spacing = 12,
}: ScrollingTickerProps) => {
  const animatedProgress = useSharedValue(0)
  const [childrenWidth, setChildrenWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const childrenCopies = calculateChildrenCopies(containerWidth, childrenWidth)
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedProgress.value,
      [0, 1],
      [0, -childrenWidth],
    )
    return { transform: [{ translateX }] }
  }, [animatedProgress, childrenWidth])

  useEffect(() => {
    if (containerWidth && childrenWidth) {
      const calculatedDuration = interpolate(
        childrenWidth,
        [0, containerWidth],
        [0, duration],
      )
      animatedProgress.value = withRepeat(
        withTiming(1, {
          duration: calculatedDuration,
          easing: Easing.linear,
        }),
        Infinity,
      )
    }
  }, [containerWidth, childrenWidth])

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => {
        setContainerWidth(layout.width)
      }}
    >
      <Animated.View style={[styles.scrollingContainer, animatedStyle]}>
        <View
          style={[styles.childrenContainer, { paddingRight: spacing }]}
          onLayout={({ nativeEvent: { layout } }) =>
            setChildrenWidth(layout.width)
          }
        >
          {children}
        </View>
        {Array(childrenCopies)
          .fill(null)
          .map((_, index) => (
            <View
              key={index}
              style={[styles.childrenContainer, { paddingRight: spacing }]}
            >
              {children}
            </View>
          ))}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: '#eee',
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  scrollingContainer: {
    flexDirection: 'row',
  },
  childrenContainer: {
    height: '100%',
  },
})

export default ScrollingTicker
