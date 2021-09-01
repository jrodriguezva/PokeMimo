import React from 'react';
import {Pokemon} from '../data/Pokedex';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import CreatePokemonScreen from '../screens/CreatePokemonScreen';
import BottomTabs from './BottomTabs';

export type RootStackParams = {
  BottomTabs: undefined;
  CreatePokemonScreen: undefined;
  PokemonDetailScreen: {pokemon: Pokemon; color: string};
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          title: 'Pokedex',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PokemonDetailScreen"
        component={PokemonDetailScreen}
        options={({route}) => ({
          title: route.params.pokemon.name,
          headerStyle: {
            backgroundColor: route.params.color,
          },
        })}
      />

      <Stack.Screen
        name="CreatePokemonScreen"
        component={CreatePokemonScreen}
      />
    </Stack.Navigator>
  );
};
