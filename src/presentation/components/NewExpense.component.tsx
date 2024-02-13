import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {InputCustom} from './Input.component';

interface Props {
  handleNewBudget: (val: number) => void;
}

export function NewExpense({handleNewBudget}: Props): React.JSX.Element {
  const [budget, setBudget] = useState<number>();

  const setExpenseValue = (val: string) => {
    setBudget(parseFloat(val));
  };

  const validateNewBudget = () => {
    if (!budget) {
      return Alert.alert('Error', 'El valor del presupuesto es requerido');
    }

    if (budget < 0) {
      return Alert.alert(
        'Error',
        'El valor del presupuesto no puede ser menor a 0',
      );
    }

    if (budget.toString().indexOf('.') !== -1) {
      let decimalNum = budget.toString().split('.')[1];

      if (decimalNum.length > 2) {
        return Alert.alert(
          'Error',
          'El valor del presupuesto no puede tener mas de dos decimales',
        );
      }
    }

    handleNewBudget(budget);
  };

  return (
    <View style={styles.container}>
      <InputCustom
        label={'Definir presupuesto'}
        inputPlaceholder={'Ej. 12.50'}
        keyboardType={'numeric'}
        value={budget?.toString()}
        setValue={setExpenseValue}
      />

      <Pressable style={styles.button} onPress={validateNewBudget}>
        <Text style={styles.button_text}>Agregar presupuesto</Text>
      </Pressable>
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
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#2563eb',
  },
  button_text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
  },
});

// 3b82f6
