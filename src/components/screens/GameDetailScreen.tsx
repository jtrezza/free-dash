import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View, Pressable, StyleSheet } from 'react-native';
import { RemoteInfo, Socket } from 'react-native-udp';

type Props = {
  navigation: {
    replace: Function,
    push: Function,
    pop: Function,
    popToTop: Function,
    goBack: Function,
    navigate: (route: string) => void
  }
  route: {key: string, name: string, params: {game: string}}
}

const GameDetailScreen = (props: Props) => {

  const handlePress = () => {
    props.navigation.goBack();
  }

  return (
    <View style={{justifyContent: 'center', marginLeft: 20}}>
      <Text>{props.route.params.game}</Text>
      <Pressable onPress={handlePress} style={styles.btn}><Text style={styles.btnText}>&lt; Go Back</Text></Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 8,
    margin: 16
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  }
})

export default GameDetailScreen;
