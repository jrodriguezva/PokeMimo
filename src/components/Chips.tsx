import React, {useContext} from 'react';
import {StyleProp, StyleSheet, Text, View} from 'react-native';
import {Type} from '../data/PokemonDetail';
import {getTypeColor} from '../utils/Utils';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  type: Type;
  style: StyleProp<any>;
}

const MaterialChipTypes = ({type, style}: Props) => {
  const {theme} = useContext(ThemeContext);
  const color = getTypeColor(type.type.name);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color,
        ...style,
      }}>
      <Text
        style={{
          ...styles.chipText,
          color: theme.textSecondaryColor,
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
