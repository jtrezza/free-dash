import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import F12020Screen from './F12020Screen';

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
        name="F12020"
        component={F12020Screen}
        options={{ header: (props) => null}}
      />
    </Stack.Navigator>
  );
}

export default ScreensStack;