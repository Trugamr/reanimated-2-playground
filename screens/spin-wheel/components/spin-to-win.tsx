import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { ReactElement } from 'react'
import { useState } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { Children } from 'react'
import {
  View,
  StyleSheet,
  LayoutRectangle,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Palette from '../../../palette'
import Reward, { RewardProps } from './reward'

const PI = Math.PI
const ROTATION_DURATION = 500 // in ms for 1 rotation

interface SpinToWinProps {
  children: ReactElement<RewardProps>[]
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  renderSpinner?: () => ReactNode
}

export interface SpinToWinRef {
  startSpinning: () => void
  landOn: (index: number) => void
  stopSpinning: () => void
}

const SpinToWinComponent = forwardRef<SpinToWinRef, SpinToWinProps>(
  ({ children, style, containerStyle, renderSpinner }, ref) => {
    const rewards = Children.toArray(children)
    const animatedTheta = useSharedValue(0)
    const animatedSpinnerStyle = useAnimatedStyle(() => {
      const theta = interpolate(animatedTheta.value, [0, 1], [0, 1])
      return { transform: [{ rotate: `${theta}rad` }] }
    })
    const [wheelLayout, setWheelLayout] = useState<LayoutRectangle>({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    })
    const [spinnerLayout, setSpinnerLayout] = useState<LayoutRectangle>({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    })

    const startSpinning = () => {
      animatedTheta.value = 0
      animatedTheta.value = withRepeat(
        withTiming(2 * PI, {
          duration: ROTATION_DURATION,
          easing: Easing.linear,
        }),
        Infinity,
      )
    }

    const landOn = async (index: number) => {
      const theta = interpolate(index, [0, rewards.length], [0, 2 * PI])
      const nextTheta =
        Math.ceil(animatedTheta.value / (2 * PI)) * 2 * PI + theta
      const duration = interpolate(
        nextTheta - animatedTheta.value,
        [0, 2 * PI],
        [0, ROTATION_DURATION],
      )
      animatedTheta.value = withTiming(nextTheta, {
        duration,
        easing: Easing.linear,
      })
    }

    const stopSpinning = () => {
      animatedTheta.value = animatedTheta.value
    }

    useImperativeHandle(ref, () => ({
      startSpinning,
      landOn,
      stopSpinning,
    }))

    return (
      <View style={[styles.container, containerStyle]}>
        <View
          onLayout={({ nativeEvent: { layout } }) => setWheelLayout(layout)}
          style={[styles.wheel, style]}
        />
        <Animated.View
          onLayout={({ nativeEvent: { layout } }) => setSpinnerLayout(layout)}
          style={[
            {
              position: 'absolute',
              top: (wheelLayout.height - spinnerLayout.height) / 2,
              left: (wheelLayout.width - spinnerLayout.width) / 2,
              transform: [{ rotate: `${Math.PI / 2}rad` }],
            },
            animatedSpinnerStyle,
          ]}
        >
          {renderSpinner ? (
            renderSpinner()
          ) : (
            <View
              style={{
                height: 100,
                borderRadius: 20,
                borderWidth: 10,
                borderTopWidth: 20,
                borderColor: Palette.DarkBlue,
                borderTopColor: Palette.Yellow,
              }}
            />
          )}
        </Animated.View>
        {rewards.map((reward, index) => {
          const theta = ((2 * PI) / rewards.length) * index - PI / 2
          const x = (wheelLayout.width / 2) * Math.cos(theta)
          const y = (wheelLayout.height / 2) * Math.sin(theta)
          const translateX = wheelLayout.width / 2
          const translateY = wheelLayout.height / 2

          if (isValidElement(reward)) {
            return cloneElement(reward, {
              style: [
                reward.props.style,
                {
                  position: 'absolute',
                  top: y,
                  left: x,
                  transform: [{ translateX }, { translateY }],
                },
              ],
            })
          }
          return reward
        })}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  wheel: {
    borderWidth: 12,
    borderColor: Palette.DarkBlue,
    height: 300,
    width: 300,
    borderRadius: 150,
  },
})

const SpinToWin = Object.assign(SpinToWinComponent, { Reward })
export default SpinToWin
