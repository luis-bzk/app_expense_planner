import React, {useState} from 'react';
import {
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
}

export function ExpenseForm({showModal, closeModal}: Props): React.JSX.Element {
  const [expense, setExpense] = useState<Expense>({
    id: '',
    name: '',
    category: '0001',
    quantity: 0,
  });

  const setValueExpense = (field: keyof Expense, value: string | number) => {
    setExpense(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <Modal animationType="slide" visible={showModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo gasto</Text>

          <View style={styles.button_close}>
            <Pressable onPress={closeModal}>
              <Text style={styles.button_text}>Cerrar</Text>
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

        <View style={styles.add_button}>
          <Pressable onPress={() => {}}>
            <Text style={styles.add_button_text}>Agregar nuevo gasto</Text>
          </Pressable>
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
  button_text: {textAlign: 'center', fontSize: 18},
  form: {marginBottom: 20, gap: 14},
  add_button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  add_button_text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
});
