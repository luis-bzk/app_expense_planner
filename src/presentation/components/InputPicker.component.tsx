import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {Category} from '../../domain/entities';

interface Props {
  label: string;
  value: string | undefined;
  setValue: (val: string) => void;
  categories: Category[];
}

export function InputPickerCustom({
  label,
  value,
  setValue,
  categories,
}: Props): React.JSX.Element {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.input}>
        <Picker selectedValue={value} onValueChange={val => setValue(val)}>
          {categories.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.label}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    fontSize: 18,
  },
});
