import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './src/screens/HomeScreen'
import PostRequestScreen from './src/screens/PostRequestScreen'
import MapScreen from './src/screens/MapScreen'
import RequestDetailScreen from './src/screens/RequestDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PostRequest" component={PostRequestScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="RequestDetails" component={RequestDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
