import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Header,
  NewBudget,
  BudgetControl,
  ExpenseForm,
} from './src/presentation/components';
import {Expense} from './src/domain/entities';
import {ExpensesList} from './src/presentation/components/ExpensesList.component';

function App(): React.JSX.Element {
  const [budget, setBudget] = useState<number>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseForm, setExpenseForm] = useState<boolean>(false);

  const handleNewBudget = (value: number) => {
    setBudget(value);
  };

  const handleNewExpense = (expense: Expense) => {
    setExpenses(state => [...state, expense]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {budget && budget > 0 ? (
            <BudgetControl budget={budget} expenses={expenses} />
          ) : (
            <NewBudget handleNewBudget={handleNewBudget} />
          )}
        </View>

        {budget && budget > 0 && <ExpensesList expenses={expenses} />}
      </ScrollView>

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
          handleNewExpense={handleNewExpense}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#eef2ff', flex: 1},
  header: {
    backgroundColor: '#818cf8',
    paddingHorizontal: 14,
    gap: 10,
    paddingVertical: 10,
    marginBottom: 40,
  },
  new_budget_button: {
    zIndex: 10,
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
});

export default App;
