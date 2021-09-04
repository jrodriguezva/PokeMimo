import React from 'react';
import { FlatList, View } from 'react-native';
import { PokemonDetail } from '../../data/PokemonDetail';
import * as Progress from 'react-native-progress';
import { PokemonSpecies } from '../../data/PokemonSpecies';
import { Text, useTheme } from 'react-native-paper';

interface Props {
  pokemon: PokemonDetail;
  pokemonSpecies: PokemonSpecies;
}

const StatPokemonTab = ({ pokemon }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
      }}>
      <View style={{ marginTop: 24 }}>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                marginHorizontal: 24,
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text>Base experience</Text>
              <Text style={{ marginStart: 8, fontWeight: 'bold' }}>{pokemon.base_experience}</Text>
            </View>
          }
          data={pokemon.stats}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                marginHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item.stat.name}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{ fontWeight: 'bold' }}>{item.base_stat}</Text>
                <Progress.Bar
                  animated={true}
                  progress={item.base_stat / 300}
                  style={{ alignSelf: 'center', marginStart: 10 }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default StatPokemonTab;
