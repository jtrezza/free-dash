import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Parser } from 'binary-parser';
import { Buffer } from "buffer";

import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'src/res/colors';

/* i18n */
import {useTranslation} from 'react-i18next';
import { RNLanguageDetector } from 'src/i18n/i18next';

import { Socket } from 'react-native-udp';

type Props = {
  navigation: {
    replace: Function,
    push: Function,
    pop: Function,
    popToTop: Function,
    goBack: Function,
    navigate: (route: string) => void
  }
  route: {key: string, name: string}
}

const HomeScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const language = RNLanguageDetector.detect();

  const handlePress = () => {
    props.navigation.navigate('F12020');
  }

  return (
    <View style={{...styles.container, paddingLeft: insets.left + 32}}>
      <View>
        <Text style={{color: 'white'}}>{t('home.title')} {i18n.language} and {language}</Text>
        <Pressable onPress={handlePress} style={styles.btn}><Text style={styles.btnText}>Ir a F1 2020</Text></Pressable>
      </View>
      <View style={styles.rightMenu}>
        <Text>Right Menu</Text>
      </View>
    </View>
  )
};

//const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.mediumGray,
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 24
  },
  rightMenu: {
    backgroundColor: Colors.darkGray,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 8,
    marginTop: 16
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  }
})


export default HomeScreen;
