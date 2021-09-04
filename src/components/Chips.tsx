import React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Type } from '../data/PokemonDetail';
import { getTypeColor } from '../utils/Utils';
import { Text } from 'react-native-paper';

interface Props {
  type: Type;
  style: StyleProp<any>;
}

const MaterialChipTypes = ({ type, style }: Props) => {
  const { backgroundColor, textColor } = getTypeColor(type.type.name);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
        ...style,
      }}>
      <Text
        style={{
          ...styles.chipText,
          color: textColor,
        }}>
        {type.type.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingLeft: 12,
    paddingRight: 12,
  },
  chipText: {
    fontSize: 13,
    color: 'white',
  },
});

export default MaterialChipTypes;
