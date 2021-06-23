import React from 'react'
import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { STICK_WIDTH, STICK_MARGIN, STICK_FULL_WIDTH } from '../constants'
import Palette from '../../../palette'

interface Props extends ViewProps {
  waveforms: number[]
  inverse?: boolean
}

const Waveform = ({ waveforms, inverse = false, style, ...rest }: Props) => {
  return (
    <View
      style={[styles.container, inverse && styles.containerInverse, style]}
      {...rest}
    >
      {waveforms.map((value, index) => (
        <View
          key={index}
          style={[
            styles.stick,
            inverse && styles.stickInverse,
            { height: `${value}%` },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
  },
  containerInverse: {
    alignItems: 'flex-start',
    height: '100%',
  },
  stick: {
    backgroundColor: Palette.White,
    width: STICK_WIDTH,
    marginRight: STICK_MARGIN,
  },
  stickInverse: {
    opacity: 0.6,
  },
})

export default Waveform
