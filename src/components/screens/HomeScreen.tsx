import React from 'react';

import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'src/res/colors';

/* i18n */
import { useTranslation } from 'react-i18next';
//import RNLanguageDetector from 'src/i18n/languageDetector';

import GameCard from 'src/components/GameCard';

type Props = {
  navigation: {
    replace: Function;
    push: Function;
    pop: Function;
    popToTop: Function;
    goBack: Function;
    navigate: (route: string) => void;
  };
  route: { key: string; name: string };
};

const { width } = Dimensions.get('window');

const HomeScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  // Device language
  //const language = RNLanguageDetector.detect();

  return (
    <View
      style={{
        ...styles.container,
        paddingLeft: insets.left * 0.7 + 32,
      }}>
      <View style={styles.cardsContainer}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <ScrollView
          horizontal
          style={{
            maxWidth: width - insets.left * 0.7 - insets.right - 132,
          }}>
          <GameCard title="F1® 2020" game="f12020" navigation={props.navigation} />
          <GameCard title="Gran Turismo 7" game="gt7" navigation={props.navigation} />
          <GameCard title="Forza Motorsport 7" game="fm7" navigation={props.navigation} />
        </ScrollView>
      </View>
      <View
        style={{
          ...styles.rightMenu,
          width: 100 + insets.right,
        }}>
        <Text style={styles.rightMenu__Content}>Right Menu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: 'Prompt-Medium',
    fontSize: 20,
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.mediumGray,
    justifyContent: 'space-between',
  },
  cardsContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  rightMenu: {
    backgroundColor: Colors.darkGray,
    flexDirection: 'row',
  },
  rightMenu__Corners: {
    backgroundColor: Colors.mediumGray,
    width: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightMenu__Content: {
    backgroundColor: '#dfdfdf',
  },
});

export default HomeScreen;
