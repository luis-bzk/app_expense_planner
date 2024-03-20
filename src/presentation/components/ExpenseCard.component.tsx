import React from 'react';
import {Text, View} from 'react-native';
import {Expense} from '../../domain/entities';
import {getCategory} from '../../config/infraestructure/category';

interface Props {
  expense: Expense;
}

export function ExpenseCard({expense}: Props): React.JSX.Element {
  return (
    <View>
      <Text>{expense.id}</Text>
      <Text>{expense.name}</Text>
      <Text>{expense.quantity}</Text>
      <Text>{getCategory(expense.category).label}</Text>
    </View>
  );
}
