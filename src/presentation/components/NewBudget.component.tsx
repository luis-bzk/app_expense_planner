import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {InputCustom} from './Input.component';

interface Props {
  handleNewBudget: (value: number) => void;
}

export function NewBudget({handleNewBudget}: Props): React.JSX.Element {
  const [tempBudget, setTempBudget] = useState<string>('');

  const validateNewBudget = () => {
    if (!tempBudget) {
      return Alert.alert('Error', 'El valor del presupuesto es requerido');
    }
    if (isNaN(parseFloat(tempBudget))) {
      return Alert.alert('Error', 'El valor del presupuesto no es valido');
    }

    if (parseFloat(tempBudget) < 0) {
      return Alert.alert(
        'Error',
        'El valor del presupuesto no puede ser menor a 0',
      );
    }

    if (tempBudget.indexOf('.') !== -1) {
      let decimalNum = tempBudget.split('.')[1];

      if (decimalNum.length > 2) {
        return Alert.alert(
          'Error',
          'El valor del presupuesto no puede tener mas de dos decimales',
        );
      }
    }

    handleNewBudget(parseFloat(tempBudget));
  };

  return (
    <View style={styles.container}>
      <InputCustom
        label={'Definir presupuesto'}
        inputPlaceholder={'Ej. 12.50'}
        keyboardType={'numeric'}
        value={tempBudget}
        setValue={setTempBudget}
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
