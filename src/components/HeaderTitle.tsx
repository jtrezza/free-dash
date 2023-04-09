import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  name: string;
};

const HeaderTitle = (props: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 15,
  },
  headerText: {
    fontWeight: '500',
    color: '#FFF',
    fontSize: 20,
  },
});

export default HeaderTitle;
