import React from 'react';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';

import {PokemonDetail} from '../../data/PokemonDetail';
import MaterialChipTypes from '../Chips';
import {PokemonSpecies} from '../../data/PokemonSpecies';
import InfoPokemonFooter from './InfoPokemonFooter';
import InfoPokemonHeader from './InfoPokemonHeader';

interface Props {
  pokemon: PokemonDetail;
  pokemonSpecies: PokemonSpecies;
}

const InfoPokemonTab = ({pokemon, pokemonSpecies}: Props) => {
  const {width} = useWindowDimensions();
  if (!pokemon.id && !pokemonSpecies.id) {
    return <></>;
  }
  return (
    <FlatList
      ListHeaderComponent={<InfoPokemonHeader pokemon={pokemon} />}
      ListFooterComponent={
        <InfoPokemonFooter pokemonSpecies={pokemonSpecies} pokemon={pokemon} />
      }
      nestedScrollEnabled
      contentContainerStyle={{alignItems: 'center'}}
      data={pokemon.types}
      numColumns={2}
      style={{backgroundColor: 'white'}}
      renderItem={({item}) => (
        <MaterialChipTypes
          type={item}
          style={{
            ...styles.materialChipBasic,
            width: width * 0.4,
          }}
        />
      )}
    />
  );
};

export default InfoPokemonTab;

// import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  materialChipBasic: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 30,
    width: 160,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
