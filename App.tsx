import React, { type PropsWithChildren, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import dgram from 'react-native-udp';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import DefaultDashboard from './src/components/DefaultDashboard';
import HomeScreen from './src/components/screens/HomeScreen';
import ScreensStack from './src/components/screens/ScreensStack';
import 'intl-pluralrules';
import 'src/i18n/i18next';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return <View style={styles.sectionContainer}></View>;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const socket = dgram.createSocket('udp4');

  useEffect(() => {
    socket.bind(20777, function (err) {
      if (err) throw err;
      console.log('Socket bound to ' + JSON.stringify(socket.address()));
    });
    return () => socket.close();
  });

  return (
    <NavigationContainer>
      {/* <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
          hidden={true}
        /> */}
      <ScreensStack socket={socket} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
