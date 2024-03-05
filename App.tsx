import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Header,
  NewBudget,
  BudgetControl,
  ExpenseForm,
} from './src/presentation/components';
import {Expense} from './src/domain/entities';

function App(): React.JSX.Element {
  const [budget, setBudget] = useState<number>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseForm, setExpenseForm] = useState<boolean>(false);

  const handleNewBudget = (value: number) => {
    setBudget(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        {budget && budget > 0 ? (
          <BudgetControl budget={budget} expenses={expenses} />
        ) : (
          <NewBudget handleNewBudget={handleNewBudget} />
        )}
      </View>

      {budget && budget > 0 && (
        <Pressable
          style={styles.new_budget_button}
          onPress={() => setExpenseForm(state => !state)}>
          <Image
            style={styles.image}
            source={require('./src/presentation/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}

      {expenseForm && (
        <ExpenseForm
          showModal={expenseForm}
          closeModal={() => setExpenseForm(state => !state)}
        />
      )}

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
  new_budget_button: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  body: {paddingHorizontal: 14, paddingTop: 30, paddingBottom: 10},
});

export default App;
