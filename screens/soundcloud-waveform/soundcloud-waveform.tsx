import React from 'react'
import { View, StyleSheet, SafeAreaView, LayoutChangeEvent } from 'react-native'
import Palette from '../../palette'
import Constants from 'expo-constants'
import Waveform from './components/waveform'
import MaskedView from '@react-native-community/masked-view'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { getWaveForms } from './utils'
import { NUMBER_OF_STICKS, STICK_FULL_WIDTH, WAVEFORM_WIDTH } from './constants'
import { useEffect } from 'react'

interface Props extends NavigationProps<'Playground'> {}

const WAVEFORMS = getWaveForms(NUMBER_OF_STICKS)

type PanGestureHandlerContext = {
  startX: number
}

const findNearestMutlitple = (n: number, multiple: number) => {
  'worklet'
  return Math.floor(n / multiple) * multiple
}

const SoundcloudWaveformScreen = ({}: Props) => {
  const panX = useSharedValue(1)
  const maxPanX = -WAVEFORM_WIDTH
  const playing = useSharedValue(true)
  const panning = useSharedValue(false)
  const animatedWaveformContainerStyles = useAnimatedStyle(() => {
    const translateX = interpolate(panX.value, [0, 1], [0, 1])
    return { translateX }
  })

  const animatedTopWaveformWrapperStyles = useAnimatedStyle(() => {
    const height = withTiming(playing.value ? 60 : 1)
    return { height }
  })

  const animatedBottomWaveformWrapperStyles = useAnimatedStyle(() => {
    const height = withTiming(playing.value ? 40 : 1)
    return { height }
  })

  const updateProgress = () => {
    'worklet'

    if (
      panning.value === false &&
      panX.value > maxPanX &&
      playing.value === true
    ) {
      panX.value = withTiming(panX.value - STICK_FULL_WIDTH)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(updateProgress, 150)
    return () => clearInterval(intervalId)
  }, [])

  const tapGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd: () => {
        playing.value = !playing.value
        if (playing.value) {
          panning.value = false
        }
      },
    })

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureHandlerContext
  >({
    onStart: (_, context) => {
      context.startX = panX.value
      panning.value = true
    },
    onActive: (event, context) => {
      const nextPanX = context.startX + event.translationX
      if (nextPanX > 0) {
        panX.value = 0
      } else if (nextPanX < maxPanX) {
        panX.value = maxPanX
      } else {
        panX.value = nextPanX
      }
    },
    onEnd: () => {
      panX.value = withTiming(
        findNearestMutlitple(panX.value, STICK_FULL_WIDTH),
        { duration: 100 },
      )
      panning.value = false
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <TapGestureHandler
        numberOfTaps={1}
        onHandlerStateChange={tapGestureHandler}
      >
        <Animated.View style={styles.panWrapper}>
          <PanGestureHandler onHandlerStateChange={panGestureHandler}>
            <Animated.View style={styles.maskWrapper}>
              <MaskedView
                style={styles.maskContainer}
                maskElement={
                  <Animated.View
                    style={[
                      styles.waveformsContainer,
                      animatedWaveformContainerStyles,
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.topWaveformWrapper,
                        animatedTopWaveformWrapperStyles,
                      ]}
                    >
                      <Waveform waveforms={WAVEFORMS} />
                    </Animated.View>
                    <Animated.View
                      style={[
                        styles.bottomWaveformWrapper,
                        animatedBottomWaveformWrapperStyles,
                      ]}
                    >
                      <Waveform waveforms={WAVEFORMS} inverse />
                    </Animated.View>
                  </Animated.View>
                }
              >
                <View style={styles.backdrop} />
                <View style={styles.backdropOverlay} />
              </MaskedView>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Palette.Blue,
  },
  panWrapper: {
    flex: 1,
  },
  maskWrapper: {
    flex: 1,
  },
  maskContainer: {
    height: '100%',
    width: '100%',
  },
  waveformsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: '50%',
  },
  topWaveformWrapper: {
    height: 60,
  },
  bottomWaveformWrapper: {
    height: 40,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Palette.White,
  },
  backdropOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: Palette.Yellow,
  },
})

export default SoundcloudWaveformScreen
