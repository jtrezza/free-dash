import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
type Game = 'gt7' | 'f12020' | 'fm7';

import Colors from 'src/res/colors';

type Props = {
  name: string;
  navigation: {
    replace: Function;
    push: Function;
    pop: Function;
    popToTop: Function;
    goBack: Function;
    navigate: (route: string, params?: any) => void;
  };
  route: { key: string; name: string; params: { game: Game } };
};

const HeaderRight = (props: Props) => {
  const handleLaunchPress = () => {
    props.navigation.navigate('GameLauncher', { game: props.route.params.game });
  };
  return (
    <Pressable onPress={() => handleLaunchPress()} style={styles.btn}>
      <Text>Launch</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.blue,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default HeaderRight;
