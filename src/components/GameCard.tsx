import React, { useState, useEffect } from 'react';

import { Text, View, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const f12020Image =  require("src/assets/images/f12020.png");
const fm7Image =  require("src/assets/images/fm7.png");
const gt7Image =  require("src/assets/images/gt7.png");

import Colors from 'src/res/colors';

/* i18n */
import {useTranslation} from 'react-i18next';
import RNLanguageDetector from 'src/i18n/languageDetector';

type Props = {
  title: string,
  game: string,
  navigation: {
    replace: Function,
    push: Function,
    pop: Function,
    popToTop: Function,
    goBack: Function,
    navigate: (route: string, params?: any) => void
  }
}

const { height } = Dimensions.get('window');

const imagesDict = {
  'f12020': f12020Image,
  'fm7': fm7Image,
  'gt7': gt7Image,
}

const GameCard = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  // Device language
  const language = RNLanguageDetector.detect();

  const handleGoToDetail = (game: string) => {
    props.navigation.navigate('GameDetail', { game });
  }
  const handlePress = (game: string) => {
    props.navigation.navigate('GameDetail');
  }

  return (
    <Pressable onPress={() => handleGoToDetail(props.game)} style={styles.card}>
      <Image source={imagesDict[props.game as keyof typeof imagesDict]} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.btnContainer}>
          <Pressable onPress={() => handlePress(props.game)} style={styles.btn}>
            <Image source={require('../assets/images/cog.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.btnText}>Config</Text>
        </View>        
        <View style={styles.btnContainer}>
          <Pressable onPress={() => handleGoToDetail(props.game)} style={styles.btn}>
            <Image source={require('../assets/images/edit.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.btnText}>Edit</Text>
        </View>        
        <View style={styles.btnContainer}>
          <Pressable onPress={() => handlePress(props.game)} style={styles.btn}>
            <Image source={require('../assets/images/play.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.btnText}>Play</Text>
        </View>        
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    backgroundColor: Colors.darkestGray,
    borderRadius: 20,
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: height - 100,
    height: height / 2 - 40
  },
  title: {
    color: 'white',
    fontFamily: 'Prompt-Medium',
    fontSize: 14,
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 12
  },
  btnContainer: {
    alignItems: 'center'
  },
  btn: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: Colors.brightBlue
  },
  btnText: {
    color: 'white',
    fontFamily: 'Prompt-Light',
    fontSize: 12,
    paddingLeft: 12
  }
})


export default GameCard;
