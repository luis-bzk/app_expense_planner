import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
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
  const [expense, setExpense] = useState<Expense>({
    id: '',
    name: '',
    category: '0001',
    quantity: 0,
    date: new Date(),
  });

  const handleNewBudget = (value: number) => {
    setBudget(value);
  };

  const handleNewExpense = (expense: Expense) => {
    const exists_expense = expenses.find(exp => exp.id === expense.id);
    if (exists_expense) {
      const updatedExpenses = expenses.map(exp => {
        return exp.id !== expense.id ? exp : expense;
      });
      return setExpenses(updatedExpenses);
    }

    setExpenses(state => [...state, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    if (!updatedExpenses) {
      setExpenses([]);
    }
    setExpenses(updatedExpenses);
  };

  const setExpenseToEdit = (id: string) => {
    const exists = expenses.find(exp => exp.id === id);

    if (!exists) {
      return Alert.alert('Error', 'El gasto seleccionado no existe');
    }
    setExpense(exists);
    setExpenseForm(true);
  };

  const closeFormModal = () => {
    setExpenseForm(state => !state);
    setExpense({
      id: '',
      name: '',
      category: '0001',
      quantity: 0,
      date: new Date(),
    });
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

        {budget && budget > 0 && (
          <ExpensesList
            expenses={expenses}
            setExpenseToEdit={setExpenseToEdit}
          />
        )}
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
          closeModal={closeFormModal}
          handleNewExpense={handleNewExpense}
          current_expense={expense}
          handleDeleteExpense={handleDeleteExpense}
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
