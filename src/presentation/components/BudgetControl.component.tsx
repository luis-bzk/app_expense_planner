import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export function BudgetControl(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.graphic}>
        <Image style={styles.img} source={require('../img/grafico.jpg')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 20,
    transform: [{translateY: 20}],

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  graphic: {alignItems: 'center'},
  img: {
    width: 200,
    height: 200,
  },
});
