import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export function Header(): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>Planificador de gastos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b82f6',
    paddingTop: 20,
  },
  header_text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
});
