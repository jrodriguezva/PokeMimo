import { PokemonDetail } from '../../data/PokemonDetail';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { capitalize } from '../../utils/Utils';

interface Props {
  pokemon: PokemonDetail;
}

const InfoPokemonHeader = ({ pokemon }: Props) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ ...styles.name, color: colors.text }}>
        {'#' + pokemon.id} - {pokemon.name && capitalize(pokemon.name)}
      </Text>
    </View>
  );
};
export default InfoPokemonHeader;

const styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
