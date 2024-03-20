import React, {useEffect, useState} from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {formatBudgetCurrency} from '../../config/helpers';
import {Expense} from '../../domain/entities';

interface Props {
  budget: number;
  expenses: Expense[];
}

export function BudgetControl({budget, expenses}: Props): React.JSX.Element {
  const [available, setAvailable] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    console.log({totalSpent});
    const totalAvailable = budget - totalSpent;
    console.log({totalAvailable});

    setSpent(totalSpent);
    setAvailable(totalAvailable);
  }, [budget, expenses]);

  return (
    <View style={styles.container}>
      <View style={styles.graphic}>
        <Image style={styles.img} source={require('../img/grafico.jpg')} />
      </View>

      <View style={styles.details_container}>
        <Text style={styles.detail}>
          Presupuesto:{' '}
          <Text style={styles.detail_value}>
            {formatBudgetCurrency(budget)}
          </Text>
        </Text>

        <Text style={styles.detail}>
          Disponible:{' '}
          <Text style={styles.detail_value}>
            {formatBudgetCurrency(available)}
          </Text>
        </Text>

        <Text style={styles.detail}>
          Gastado:{' '}
          <Text style={styles.detail_value}>{formatBudgetCurrency(spent)}</Text>
        </Text>
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
  details_container: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    gap: 5,
  },
  detail: {
    fontSize: 18,
  },
  detail_value: {
    color: '#2563eb',
  },
});
