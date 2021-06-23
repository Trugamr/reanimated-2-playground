import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import Palette from '../../palette'
import Indicator from './components/indicator'
import Slide from './components/slide'

interface Props extends NavigationProps<'Playground'> {}

const { width: WINDOW_WIDTH } = Dimensions.get('window')
const COUNT = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco']

const SlidesOneScreen = ({}: Props) => {
  const animatedIndex = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      animatedIndex.value = interpolate(
        contentOffset.x,
        [0, WINDOW_WIDTH],
        [0, 1],
      )
    },
  })

  useDerivedValue(() => {})

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        pagingEnabled
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        {COUNT.map((text, index) => (
          <Slide
            key={text}
            index={index}
            text={text}
            animatedIndex={animatedIndex}
          />
        ))}
      </Animated.ScrollView>
      <Indicator
        style={styles.indicator}
        length={COUNT.length}
        animatedIndex={animatedIndex}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Palette.White,
    position: 'relative',
    width: WINDOW_WIDTH,
  },
  indicatorContainer: {
    left: 20,
    right: 1400,
    bottom: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 36,
    margin: 'auto',
    justifyContent: 'center',
  },
})

export default SlidesOneScreen
