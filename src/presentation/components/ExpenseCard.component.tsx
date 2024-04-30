import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Expense} from '../../domain/entities';
import {getCategory} from '../../config/infraestructure/category';
import {formatBudgetCurrency} from '../../config/helpers/formatBudget';
import {formatDate} from '../../config/helpers';

interface Props {
  expense: Expense;
  setExpenseToEdit: (id: string) => void;
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

export function ExpenseCard({
  expense,
  setExpenseToEdit,
}: Props): React.JSX.Element {
  const [isLongPressing, setIsLongPressing] = useState(false);

  const category = getCategory(expense.category);

  return (
    <Pressable
      onLongPress={() => {
        setIsLongPressing(true);
        setExpenseToEdit(expense.id);
      }}
      onPressOut={() => setIsLongPressing(false)}>
      <View style={[styles.card, isLongPressing && styles.longPressCard]}>
        <View style={styles.left_data}>
          <Image source={iconsDictionary[category.id]} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{expense.name}</Text>
            <Text style={styles.date}>{formatDate(expense.date)}</Text>
            <Text style={styles.category}>{category.label}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.price_quantity}>
            {formatBudgetCurrency(expense.quantity)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  longPressCard: {
    backgroundColor: '#e0e0e0', // Cambia el color de fondo en el long press
  },
  left_data: {flexDirection: 'row', alignItems: 'center', gap: 20},
  image: {width: 60, height: 60},
  info: {
    flexDirection: 'column',
    gap: 3,
  },
  name: {
    fontSize: 17,
    color: '#334155',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  date: {color: '#475569', fontSize: 13, fontWeight: '500'},
  category: {color: '#64748b', textTransform: 'uppercase', fontSize: 13},
  price_quantity: {fontWeight: '700', fontSize: 18, color: '#16a34a'},
});
