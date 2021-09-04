import React, {Fragment} from 'react';
import {ActivityIndicator, FlatList, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import PokemonItem from '../components/PokemonItem';
import {globalStyle} from '../theme/styles';
import {Text} from 'react-native-paper';

const PokemonListScreen = () => {
  const {top} = useSafeAreaInsets();
  const {pokemonList, loadPokemon} = usePokemonPaginated();
  return (
    <Fragment>
      <Image
        source={require('../assets/pokeball.png')}
        style={globalStyle.pokeballBG}
      />
      <FlatList
        data={pokemonList}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={pokemon => pokemon.id}
        numColumns={2}
        renderItem={({item}) => <PokemonItem pokemon={item} />}
        onEndReached={loadPokemon}
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyle.title,
              top: top + 20,
              marginStart: 20,
              marginBottom: top + 20,
              paddingBottom: 10,
            }}>
            Pokedex
          </Text>
        }
        ListFooterComponent={
          <ActivityIndicator style={{height: 100}} size={20} color={'red'} />
        }
      />
    </Fragment>
  );
};

export default PokemonListScreen;
