import {Alert} from 'react-native';
import {CATEGORIES} from '../../../data';
import {Category} from '../../../domain/entities';

export function getCategory(id: string): Category {
  const category = CATEGORIES.find(item => item.id === id);
  if (!category) {
    return Alert.alert('Error', 'No se ha encontrado la categoría deseada')!;
  }

  return category;
}
