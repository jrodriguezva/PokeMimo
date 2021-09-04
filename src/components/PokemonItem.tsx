import React, { useEffect, useRef, useState } from 'react';
import { Pokemon } from '../data/Pokedex';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { FadeInImage } from './FadeInImage';
import { Text } from 'react-native-paper';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  pokemon: Pokemon;
  event?: () => void;
}

const PokemonItem = ({ pokemon, event }: Props) => {
  const { width } = useWindowDimensions();
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (pokemon.image != null) {
      ImageColors.getColors(pokemon.image, { fallback: 'grey' }).then(colors => {
        if (!isMounted.current) {
          return;
        }

        switch (colors.platform) {
          case 'android':
          case 'web':
            setBgColor(colors.muted || 'grey');
            break;
          case 'ios':
            setBgColor(colors.background || 'grey');
            break;
          default:
            throw new Error('Unexpected platform');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={
        event
          ? event
          : () =>
              navigation.navigate('PokemonDetailScreen', {
                pokemon: pokemon,
                color: bgColor,
              })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: width * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokeballContainer}>
          <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
        </View>
        {pokemon.image && <FadeInImage uri={pokemon.image} style={styles.pokemonImage} showLoading={true} />}
      </View>
    </TouchableOpacity>
  );
};

export default PokemonItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    right: 0,
    bottom: -5,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
