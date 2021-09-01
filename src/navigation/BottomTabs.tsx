import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
import MyPokemonScreen from '../screens/MyPokemonScreen';
import PokemonListScreen from '../screens/PokemonListScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          borderWidth: 0,
          opacity: 0.9,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'android' ? 10 : 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Pokedex',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="pokeball" />
          ),
        }}
        name="PokemonListScreen"
        component={PokemonListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Mis pokemon',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="plus-circle-outline" />
          ),
        }}
        name="MyPokemonScreen"
        component={MyPokemonScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
