import React from 'react';
import MyPokemonScreen from '../screens/MyPokemonScreen';
import PokemonListScreen from '../screens/PokemonListScreen';
import {BottomNavigation} from 'react-native-paper';
import SettingScreen from '../screens/SettingsScreen';

const BottomTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'pokedex', title: 'Pokedex', icon: 'pokeball'},
    {key: 'my_pokemon', title: 'My pokemons', icon: 'plus-circle-outline'},
    {key: 'setting', title: 'Settings', icon: 'cog-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    pokedex: PokemonListScreen,
    my_pokemon: MyPokemonScreen,
    setting: SettingScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomTabs;
