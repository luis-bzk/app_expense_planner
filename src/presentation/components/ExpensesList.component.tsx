import React from 'react';
import {Expense} from '../../domain/entities';
import {StyleSheet, Text, View} from 'react-native';
import {ExpenseCard} from './ExpenseCard.component';

interface Props {
  expenses: Expense[];
  setExpenseToEdit: (id: string) => void;
}

export function ExpensesList({
  expenses,
  setExpenseToEdit,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos</Text>

      {expenses.length > 0 ? (
        <View style={styles.list}>
          {expenses.map(expense => (
            <ExpenseCard
              expense={expense}
              key={expense.id}
              setExpenseToEdit={setExpenseToEdit}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.alert_message}>Todavía no hay gastos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    // marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    color: '#475569',
    textTransform: 'uppercase',
  },
  list: {
    gap: 10,
  },
  alert_message: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#fef3c7',
    color: '#d97706',
    fontWeight: '500',
  },
});
