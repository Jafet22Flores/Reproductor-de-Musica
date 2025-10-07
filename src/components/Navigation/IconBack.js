import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function IconBack() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 0, marginLeft: -8 }}
    >
      <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
    </TouchableOpacity>
  );
}