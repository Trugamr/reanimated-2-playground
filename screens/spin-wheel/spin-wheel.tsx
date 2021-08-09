import React from 'react'
import { Text, StyleSheet, SafeAreaView, View } from 'react-native'
import Palette from '../../palette'
import Button from '../../components/button'
import SpinToWin, { SpinToWinRef } from './components/spin-to-win'
import { useRef } from 'react'

interface Props extends NavigationProps<'SpinWheel'> {}

const rewards = Array(6)
  .fill(null)
  .map((_, index) => index)

const SpinWheel = ({}: Props) => {
  const spinToWinRef = useRef<SpinToWinRef>(null)

  const handleOnSpin = async () => {
    if (spinToWinRef.current) {
      spinToWinRef.current.startSpinning()
      await new Promise(resolve => setTimeout(resolve, 1000))
      const index = Math.round(Math.random() * (rewards.length - 1))
      spinToWinRef.current.landOn(index)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <SpinToWin ref={spinToWinRef}>
        {rewards.map(reward => (
          <SpinToWin.Reward key={reward} style={styles.reward}>
            <Text style={styles.rewardText}>{reward}</Text>
          </SpinToWin.Reward>
        ))}
      </SpinToWin>

      <Button onPress={handleOnSpin} style={styles.spinButton}>
        SPIN
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reward: {
    width: 60,
    height: 60,
    position: 'absolute',
    backgroundColor: Palette.DarkBlue,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Palette.Yellow,
  },
  rewardText: {
    color: Palette.Yellow,
    fontWeight: 'bold',
    fontSize: 24,
  },
  spinButton: {
    paddingHorizontal: 36,
    marginTop: 64,
  },
})

export default SpinWheel
