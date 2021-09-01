import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import PokemonItem from '../components/PokemonItem';
import {globalStyle} from '../theme/styles';

const PokemonListScreen = () => {
  const {top} = useSafeAreaInsets();

  const {pokemonList, loadPokemon} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokeball.png')}
        style={globalStyle.pokeballBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemonList}
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
      </View>
    </>
  );
};

export default PokemonListScreen;
