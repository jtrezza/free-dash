import React, { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View, Pressable, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

import Colors from 'src/res/colors';

// Dashboards
import DefaultDashboard from 'src/components/dashboards/Default';
import FormulaDashboard from 'src/components/dashboards/Formula';

const { height, width } = Dimensions.get('window');

const dashboards = {
  default: {
    image: require('../../assets/images/dashboards/default.png'),
    component: DefaultDashboard,
  },
  formula: {
    image: require('../../assets/images/dashboards/f1_tyres.png'),
    component: FormulaDashboard,
  },
  lap: {
    image: require('../../assets/images/dashboards/lap.jpg'),
    component: FormulaDashboard,
  },
  plus: {
    image: require('../../assets/images/plus-button.png'),
    component: FormulaDashboard,
  },
};

type Game = 'gt7' | 'f12020' | 'fm7';
type DashboardKey = 'default' | 'formula' | 'lap' | 'plus';

type Item = {
  key: string;
  label: string;
  image: object;
};

type Props = {
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

export type Dashboard = {
  name: string;
  gamesAllowed: Game[];
  component: React.FC;
};

function DashboardCard({
  cardProps,
  keyShowDelete,
  toggleKeyShowDelete,
}: {
  cardProps: RenderItemParams<Item>;
  keyShowDelete: string;
  toggleKeyShowDelete: (k: string) => void;
}) {
  const { item, drag } = cardProps;
  const handleGoBack = () => {
    console.log('deleting', item.key);
  };
  const toggleBackButton = () => {
    toggleKeyShowDelete(item.key);
  };
  const backButtonVisible = keyShowDelete === item.key;

  return (
    <TouchableOpacity style={styles.imageContainer} onLongPress={drag} onPress={toggleBackButton}>
      <Image source={item.image} style={styles.dashboardImage} />
      <View style={{ opacity: backButtonVisible ? 1 : 0 }}>
        <Pressable pointerEvents={backButtonVisible ? 'auto' : 'none'} onPress={handleGoBack} style={styles.btn}>
          <Text style={styles.btnText}>Go Back</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

const GameDetailScreen = (props: Props) => {
  const setUpKey = `game_setup_${props.route.params.game}`;
  const [config, setConfig] = useState([]);
  const insets = useSafeAreaInsets();
  const [keyShowDelete, setKeyShowDelete] = useState('');

  const toggleKeyShowDelete = (key: string) => {
    if (key === keyShowDelete) {
      setKeyShowDelete('');
    } else {
      setKeyShowDelete(key);
    }
  };

  const renderItem = (cardProps: RenderItemParams<Item>) => {
    const { item } = cardProps;
    if (item.key === 'plus') {
      return (
        <TouchableOpacity style={styles.plusContainer} onPress={() => console.log('hey!')}>
          <Image source={item.image} style={styles.plusImage} />
        </TouchableOpacity>
      );
    }
    return (
      <DashboardCard cardProps={cardProps} keyShowDelete={keyShowDelete} toggleKeyShowDelete={toggleKeyShowDelete} />
    );
  };

  const parseConfig = array => {
    return array.map((item: DashboardKey) => {
      return {
        key: item,
        label: item,
        image: dashboards[item].image,
      };
    });
  };

  const getConfig = async () => {
    try {
      const value = await AsyncStorage.getItem(setUpKey);
      let loadedData = ['default', 'plus'];
      if (value !== null) {
        loadedData = JSON.parse(value);
      }
      console.log('hey I loaded this', loadedData);
      setConfig(parseConfig(loadedData));
    } catch (e) {
      console.log('Something failed :|');
    }
  };

  const saveConfig = async value => {
    const plusAtTheEnd = value.filter(v => v !== 'plus').concat('plus');
    setConfig(parseConfig(plusAtTheEnd));
    await AsyncStorage.setItem(setUpKey, JSON.stringify(plusAtTheEnd));
  };

  useEffect(() => {
    //saveConfig(['default', 'formula', 'lap', 'plus']);
    getConfig();
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        paddingLeft: insets.left * 0.7 + 32,
      }}>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <DraggableFlatList
            style={{
              maxWidth: width - insets.left * 0.6 - insets.right - 60,
            }}
            contentContainerStyle={styles.cardsContainer}
            data={config}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => saveConfig(data.map(item => item.key))}
          />
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.mediumGray,
    alignItems: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
  },
  dashboardImage: {
    width: height - 80,
    height: height * 0.55 - 45,
  },
  imageContainer: {
    marginRight: 20,
  },
  plusImage: {
    width: height * 0.32,
    height: height * 0.32,
    opacity: 0.6,
  },
  plusContainer: {
    marginRight: 20,
    marginLeft: 40,
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
    textAlign: 'center',
  },
});

export default GameDetailScreen;
