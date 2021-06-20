type StackNavigationProp<P, S> =
  import('@react-navigation/stack').StackNavigationProp<P, S>
type RouteProp<P, S> = import('@react-navigation/native').RouteProp<P, S>

type StackParamList = {
  Home: {
    header?: string
  }
  Playground: undefined
}

type NavigationProps<T extends keyof StackParamList> = {
  route: RouteProp<StackParamList, T>
  navigation: StackNavigationProp<StackParamList, T>
}
