import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {InputCustom, InputPickerCustom} from '../components';
import {Expense} from '../../domain/entities';
import {CATEGORIES} from '../../data';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  handleNewExpense: (expense: Expense) => void;
  current_expense: Expense;
  handleDeleteExpense: (id: string) => void;
}

export function ExpenseForm({
  showModal,
  closeModal,
  handleNewExpense,
  current_expense,
  handleDeleteExpense,
}: Props): React.JSX.Element {
  const [expense, setExpense] = useState<Expense>(current_expense);

  const setValueExpense = (field: keyof Expense, value: string) => {
    setExpense(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const addNewExpense = () => {
    console.log({
      message: 'Tipo de dato de la cantidad',
      value: expense.quantity,
      type: typeof expense.quantity,
    });
    if (!expense.name) {
      return Alert.alert('Error', 'El nombre del gasto es requerido', [
        {text: 'OK'},
      ]);
    }
    if (!expense.category) {
      return Alert.alert('Error', 'La categoría es requerida', [{text: 'OK'}]);
    }

    if (!expense.quantity) {
      return Alert.alert('Error', 'La cantidad del gasto es requerido', [
        {text: 'OK'},
      ]);
    }

    if (isNaN(parseFloat(expense.quantity.toString()))) {
      return Alert.alert('Error', 'La cantidad del gasto no es valido', [
        {text: 'OK'},
      ]);
    }

    if (expense.quantity.toString().indexOf('.') !== -1) {
      let decimalNum = expense.quantity.toString().split('.')[1];

      if (decimalNum.length > 2) {
        return Alert.alert(
          'Error',
          'El valor del gasto no puede tener mas de dos decimales',
        );
      }
    }

    if (parseFloat(expense.quantity.toString()) <= 0) {
      return Alert.alert(
        'Error',
        'La cantidad del gasto no puede ser menor o igual a cero',
        [{text: 'OK'}],
      );
    }

    if (current_expense.id) {
      handleNewExpense({
        ...expense,
        quantity: parseFloat(expense.quantity.toString()),
      });
    } else {
      handleNewExpense({
        ...expense,
        id: Date.now().toString(),
        quantity: parseFloat(expense.quantity.toString()),
        date: new Date(),
      });
    }

    closeModal();
  };

  const deleteExpense = () => {
    Alert.alert(
      'Estas seguro que deseas eliminar este gasto?',
      'Una vez eliminado el gasto no se podra recuperar',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, eliminar', onPress: () => handleDeleteExpense(expense.id)},
      ],
    );
    closeModal();
  };

  return (
    <Modal animationType="slide" visible={showModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo gasto</Text>

          <View style={styles.button_close}>
            <Pressable onPress={closeModal}>
              <Text style={styles.button_close_text}>Cerrar</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.form}>
          <InputCustom
            label={'Nombre del gasto'}
            inputPlaceholder={'Mensualidad Netflix'}
            keyboardType={'default'}
            value={expense.name}
            setValue={(value: string) => setValueExpense('name', value)}
          />

          <InputCustom
            label={'Valor del gasto'}
            inputPlaceholder={'123.43'}
            keyboardType={'numeric'}
            value={expense.quantity.toString()}
            setValue={(value: string) => setValueExpense('quantity', value)}
          />

          <InputPickerCustom
            label={'Categoría del gasto'}
            value={expense.category}
            setValue={(value: string) => setValueExpense('category', value)}
            categories={CATEGORIES}
          />
        </View>
        <View style={styles.buttons}>
          <View style={[styles.button, styles.add_button]}>
            <Pressable onPress={addNewExpense}>
              <Text style={styles.button_text}>
                {expense.id ? 'Actualizar gasto' : 'Agregar nuevo gasto'}
              </Text>
            </Pressable>
          </View>

          {expense.id && (
            <View style={[styles.button, styles.delete_button]}>
              <Pressable onPress={deleteExpense}>
                <Text style={styles.button_text}>Eliminar gasto</Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  button_close: {
    paddingVertical: 5,
    borderRadius: 10,
    width: 80,
  },
  button_close_text: {textAlign: 'center', fontSize: 18},
  form: {marginBottom: 20, gap: 14},
  buttons: {gap: 10},
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
  add_button: {
    backgroundColor: '#6366f1',
  },
  delete_button: {
    backgroundColor: '#ef4444',
  },
});
