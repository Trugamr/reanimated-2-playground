import React, { useRef, useState, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView, LayoutChangeEvent } from 'react-native'
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated'
import Palette from '../../palette'
import Ripple, { RippleProps } from './components/ripple'

interface Props extends NavigationProps<'SoundcloudWaveform'> {}

const COLORS = [Palette.Blue, Palette.Jade, Palette.Yellow]

const Ripples = ({}: Props) => {
  const containerLayout = useSharedValue({
    width: 0,
    height: 0,
  })
  const [ripples, setRipple] = useState<RippleProps[]>([])
  const rippleNumberRef = useRef(0)
  const removeLastRipple = useCallback(() => {
    setRipple(prev => prev.slice(1))
  }, [setRipple])
  const addRipple = (positionX: number, positionY: number) => {
    const { width: containerWidth, height: containerHeight } =
      containerLayout.value
    rippleNumberRef.current += 1

    setRipple(prev => [
      ...prev,
      {
        key: `${rippleNumberRef.current}`,
        color: COLORS[rippleNumberRef.current % COLORS.length],
        positionX,
        positionY,
        containerWidth,
        containerHeight,
        onAnimationEnd: removeLastRipple,
      },
    ])
  }

  const tapGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd: ({ absoluteX, absoluteY }) => {
        runOnJS(addRipple)(absoluteX, absoluteY)
      },
    })

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    containerLayout.value = {
      width: layout.width,
      height: layout.height,
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TapGestureHandler
        numberOfTaps={1}
        onHandlerStateChange={tapGestureHandler}
      >
        <Animated.View style={styles.container} onLayout={onLayout}>
          {ripples.map(props => (
            <Ripple {...props} />
          ))}
        </Animated.View>
      </TapGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.White,
  },
})

export default Ripples
