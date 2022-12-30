import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GameDetailScreen from './GameDetailScreen';

const Stack = createStackNavigator();

const ScreensStack = (props: any) => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: (props) => null}}
      />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{ header: (props) => null}}
      />
    </Stack.Navigator>
  );
}

export default ScreensStack;