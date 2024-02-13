import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Header, NewExpense, BudgetControl} from './src/presentation/components';

function App(): React.JSX.Element {
  const [validBudget, setValidBudget] = useState<boolean>(false);

  const handleNewBudget = (val: number) => {
    setValidBudget(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        {validBudget ? (
          <BudgetControl />
        ) : (
          <NewExpense handleNewBudget={handleNewBudget} />
        )}
      </View>

      <View style={styles.body}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#e8e8e8', flex: 1},
  header: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 14,
    // paddingVertical: 10,
  },
  body: {paddingHorizontal: 14, paddingTop: 30, paddingBottom: 10},
});

export default App;
