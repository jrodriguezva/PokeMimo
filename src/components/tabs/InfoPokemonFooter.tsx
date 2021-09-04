import { PokemonDetail } from '../../data/PokemonDetail';
import { PokemonSpecies } from '../../data/PokemonSpecies';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { capitalize } from '../../utils/Utils';
import { FadeInImage } from '../FadeInImage';
import { Text, useTheme } from 'react-native-paper';

interface Props {
  pokemon: PokemonDetail;
  pokemonSpecies: PokemonSpecies;
}

const InfoPokemonFooter = ({ pokemon, pokemonSpecies }: Props) => {
  const { colors } = useTheme();
  return pokemon.id && pokemonSpecies.id ? (
    <View>
      <View style={styles.container}>
        <Text
          style={{
            ...styles.detail,
            color: colors.text,
          }}>
          {pokemonSpecies.flavor_text_entries
            .filter(item => item.language.name.includes('en'))[0]
            .flavor_text.replace(/\r?\n|\r/g, ' ')}
        </Text>
      </View>
      <View
        style={{
          ...styles.cardContainer,
          ...styles.shadowProp,
          backgroundColor: colors.surface,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ color: colors.onSurface }}>Height</Text>
          <Text style={{ ...styles.breedingDetail1, color: colors.onSurface }}>{pokemon.height / 10} m</Text>
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ color: colors.onSurface }}>Weight</Text>
          <Text style={{ ...styles.breedingDetail1, color: colors.onSurface }}>{pokemon.weight / 10} kg</Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.title}>Breeding</Text>
        <View style={styles.horizontalView}>
          <Text style={styles.breedingTitle}>Gender</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text style={styles.breedingDetail1}>{(pokemonSpecies.gender_rate / 8) * 100}%</Text>
            <Icon name="gender-female" size={16} color={colors.text} />
            <Text style={{ ...styles.breedingDetail1, marginStart: 5 }}>
              {100 - (pokemonSpecies.gender_rate / 8) * 100}%
            </Text>
            <Icon name="gender-male" size={16} color={colors.text} />
          </View>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.breedingTitle}>Egg</Text>
          <Text style={styles.breedingDetail}>
            {pokemonSpecies.egg_groups.map(item => capitalize(item.name)).join(', ')}
          </Text>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.breedingTitle}>Steps to hatch</Text>
          <Text style={styles.breedingDetail}>{255 * (pokemonSpecies.hatch_counter + 1)}</Text>
        </View>
      </View>

      <View style={{ margin: 24 }}>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView
          // style
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {pokemon.sprites.front_default && (
            <FadeInImage showLoading={false} uri={pokemon.sprites.front_default} style={styles.basicSprite} />
          )}
          {pokemon.sprites.back_default && (
            <FadeInImage showLoading={false} uri={pokemon.sprites.back_default} style={styles.basicSprite} />
          )}
          {pokemon.sprites.front_shiny && (
            <FadeInImage showLoading={false} uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
          )}
          {pokemon.sprites.back_shiny && (
            <FadeInImage showLoading={false} uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
          )}
        </ScrollView>
      </View>
    </View>
  ) : (
    <></>
  );
};
export default InfoPokemonFooter;

const styles = StyleSheet.create({
  detail: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 24,
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
  },
  cardContainer: {
    marginHorizontal: 24,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  horizontalView: {
    flexDirection: 'row',
  },
  breedingTitle: {
    flex: 1,
    fontSize: 14,
  },
  breedingDetail: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  breedingDetail1: {
    fontSize: 14,
    fontWeight: '600',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
