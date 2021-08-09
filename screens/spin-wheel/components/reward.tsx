import React, { ReactNode, useState } from 'react'
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

export interface RewardProps {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  size?: number
}

const Reward = ({ children, style, size = 60 }: RewardProps) => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const flatStyle = StyleSheet.flatten(style)
  const transform = flatStyle.transform?.map(item => {
    if ('translateX' in item) {
      return { translateX: item.translateX - layout.width / 2 }
    }
    if ('translateY' in item) {
      return { translateY: item.translateY - layout.height / 2 }
    }
    return item
  })

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
      style={[style, { transform }]}
    >
      {children}
    </View>
  )
}

export default Reward
