import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { RemoteInfo, Socket } from 'react-native-udp';

type Game = 'gt7' | 'f12020' | 'fm7';

type Props = {
  navigation: {
    replace: Function,
    push: Function,
    pop: Function,
    popToTop: Function,
    goBack: Function,
    navigate: (route: string) => void
  }
  route: {key: string, name: string, params: {game: Game}}
}

const { height, width } = Dimensions.get('window');

const FormulaDashboard = (props: Props) => {

  return (
    <View style={styles.container}>
      <Text>I am the Formula one</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0000ff',
    width: width,
    flex: 1
  }
})

export default FormulaDashboard;
