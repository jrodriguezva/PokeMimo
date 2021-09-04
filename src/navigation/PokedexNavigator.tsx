import React from 'react';
import {Pokemon} from '../data/Pokedex';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import CreatePokemonScreen from '../screens/CreatePokemonScreen';
import BottomTabs from './BottomTabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

export type RootStackParams = {
  BottomTabs: undefined;
  CreatePokemonScreen: undefined;
  PokemonDetailScreen: {pokemon: Pokemon; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: route.params.color,
          },
        })}
      />

      <Stack.Screen
        name="CreatePokemonScreen"
        options={{
          title: 'Create Pokemon',
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
        component={CreatePokemonScreen}
      />
    </Stack.Navigator>
  );
};
