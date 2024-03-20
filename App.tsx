import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Header,
  NewBudget,
  BudgetControl,
  ExpenseForm,
  ExpenseCard,
} from './src/presentation/components';
import {Expense} from './src/domain/entities';

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
          handleNewExpense={handleNewExpense}
        />
      )}

      <View style={styles.body}>
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <ExpenseCard expense={expense} key={expense.id} />
          ))
        ) : (
          <View>
            <Text>Todavía no tienes gastos</Text>
          </View>
        )}
      </View>
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
