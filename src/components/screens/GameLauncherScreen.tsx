import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View, Pressable, StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { RemoteInfo, Socket } from 'react-native-udp';

// Dashboards
import DefaultDashboard from 'src/components/dashboards/Default';
import FormulaDashboard from 'src/components/dashboards/Formula';

type Game = 'gt7' | 'f12020' | 'fm7';

type Props = {
  navigation: {
    replace: Function,
    push: Function,
    pop: Function,
    popToTop: Function,
    goBack: Function,
    navigate: (route: string, params?: any) => void
  }
  route: {key: string, name: string, params: {game: Game}}
}

export type Dashboard = {
  name: string,
  gamesAllowed: Game[],
  component: React.FC
};

const { height, width } = Dimensions.get('window');

const GameLauncherScreen = (props: Props) => {

  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleGoBack = () => {
    props.navigation.goBack();
  }
  const toggleBackButton = () => {
    if (backButtonVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
    setBackButtonVisible(!backButtonVisible);
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        data={[
          {id: '1', component: DefaultDashboard, name: 'Default'},
          {id: '2', component: FormulaDashboard, name: 'Formula'}
        ]}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Pressable style={styles.pressableContainer} onPress={toggleBackButton}>
              {item.component(props)}
            </Pressable>
          );
        }}
      />
      <Animated.View style={{opacity: fadeAnim}}>
        <Pressable pointerEvents={backButtonVisible ? 'auto':'none'} onPress={handleGoBack} style={styles.btn}><Text style={styles.btnText}>Go Back</Text></Pressable>
      </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  pressableContainer: {
    flex: 1,
    backgroundColor: 'green'
  },
  btn: {
    padding: 8,
    backgroundColor: 'violet',
    color: 'white',
    borderRadius: 8,
    margin: 16,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  },
  flatlist: {
    width: width,
    height: height
  },
  item: {
    width: height
  }
})

export default GameLauncherScreen;
