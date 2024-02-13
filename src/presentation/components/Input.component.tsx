import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Props {
  label: string;
  inputPlaceholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string | undefined;
  setValue: (val: string) => void;
  multiLine?: boolean;
  numLines?: number;
  alignVertical?: 'auto' | 'center' | 'top' | 'bottom' | undefined;
  alignHorizontal?: 'center' | 'left' | 'right' | undefined;
  maxLength?: number | undefined;
}

export function InputCustom({
  label,
  keyboardType,
  inputPlaceholder,
  value,
  setValue,
  multiLine = false,
  numLines = 1,
  alignVertical = 'center',
  alignHorizontal = 'left',
  maxLength = undefined,
}: Props): React.JSX.Element {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiLine && styles.textArea]}
        keyboardType={keyboardType}
        placeholder={inputPlaceholder}
        placeholderTextColor={'#747474'}
        value={value}
        onChangeText={setValue}
        multiline={multiLine}
        numberOfLines={numLines}
        textAlignVertical={alignVertical}
        textAlign={alignHorizontal}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#000000',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  textArea: {
    height: 100,
  },
});
