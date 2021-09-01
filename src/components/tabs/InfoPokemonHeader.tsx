import {PokemonDetail} from '../../data/PokemonDetail';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {capitalize} from '../../utils/Utils';

interface Props {
  pokemon: PokemonDetail;
}

const InfoPokemonHeader = ({pokemon}: Props) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View>
      <Text style={{...styles.name, color: theme.colors.text}}>
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
