import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ padding: 20 }}>
      <Text>🏠 Welcome to Your Friendly Neighborhood!</Text>
      <Button title="Post Help Request" onPress={() => navigation.navigate('PostRequest')} />
      <Button title="View Map" onPress={() => navigation.navigate('Map')} />
      <Button title="Request Details" onPress={() => navigation.navigate('RequestDetails')} />
    </View>
  );
}
