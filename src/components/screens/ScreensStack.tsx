import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GameDetailScreen from './GameDetailScreen';
import GameLauncherScreen from './GameLauncherScreen';
import HeaderRight from 'src/components/HeaderRight';
import HeaderTitle from 'src/components/HeaderTitle';

import Colors from 'src/res/colors';

const Stack = createStackNavigator();

const ScreensStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: props => null }} />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => <HeaderTitle name="gt7" />,
          headerRight: () => <HeaderRight name="Algoooo" navigation={navigation} route={route} />,
          headerStyle: {
            height: 50,
            backgroundColor: Colors.darkGray,
            shadowColor: '#000',
            elevation: 25,
          },
        })}
      />
      <Stack.Screen name="GameLauncher" component={GameLauncherScreen} options={{ header: props => null }} />
    </Stack.Navigator>
  );
};

export default ScreensStack;
