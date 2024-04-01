import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Expense} from '../../domain/entities';
import {getCategory} from '../../config/infraestructure/category';
import {formatBudgetCurrency} from '../../config/helpers/formatBudget';

interface Props {
  expense: Expense;
}

interface IconsDictionary {
  [key: string]: ImageSourcePropType;
}

const iconsDictionary: IconsDictionary = {
  '0002': require('../img/icono_ahorro.png'),
  '0003': require('../img/icono_comida.png'),
  '0004': require('../img/icono_casa.png'),
  '0005': require('../img/icono_suscripciones.png'),
  '0006': require('../img/icono_gastos.png'),
  '0007': require('../img/icono_gastos.png'),
  '0008': require('../img/icono_salud.png'),
  '0009': require('../img/icono_gastos.png'),
};

export function ExpenseCard({expense}: Props): React.JSX.Element {
  const category = getCategory(expense.category);

  return (
    <View style={styles.card}>
      <Image source={iconsDictionary[category.id]} style={styles.image} />
      <View style={styles.info}>
        <Text>{category.label}</Text>
        <Text>{expense.name}</Text>
        <Text>{formatBudgetCurrency(expense.quantity)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
  },
  image: {width: 60, height: 60},
  info: {
    flexDirection: 'column',
  },
});
