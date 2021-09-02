import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {FadeInImage} from '../components/FadeInImage';
import {RootStackParams} from '../navigation/PokedexNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useAnimation} from '../hooks/useAnimation';
import {usePokemonDetail} from '../hooks/usePokemonDetail';
import InfoPokemonTab from '../components/tabs/InfoPokemonTab';
import {ThemeContext} from '../context/ThemeContext';
import StatsPokemonTab from '../components/tabs/StatsPokemonTab';

interface Props
  extends StackScreenProps<RootStackParams, 'PokemonDetailScreen'> {}

const PokemonDetailScreen = ({route}: Props) => {
  const layout = useWindowDimensions();
  const {rotateAnimation, animatedStyle} = useAnimation();
  const {theme} = useContext(ThemeContext);
  const {pokemon, color} = route.params;
  const {pokemonDetail, pokemonSpecies} = usePokemonDetail(pokemon.id);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return (
          <InfoPokemonTab
            pokemon={pokemonDetail}
            pokemonSpecies={pokemonSpecies}
          />
        );
      case 'second':
        return (
          <StatsPokemonTab
            pokemon={pokemonDetail}
            pokemonSpecies={pokemonSpecies}
          />
        );
      default:
        return null;
    }
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Info'},
    {key: 'second', title: 'Stats'},
  ]);

  useEffect(() => {
    rotateAnimation(3000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: color}}>
      <View style={styles.pokemonContainer}>
        <Animated.Image
          source={require('../assets/pokeball-simple.png')}
          style={[styles.pokeball, animatedStyle]}
        />
        <FadeInImage
          uri={pokemon.image}
          style={styles.pokemonImage}
          showLoading={false}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar {...props} style={{backgroundColor: theme.colors.primary}} />
        )}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default PokemonDetailScreen;

// import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  pokemonContainer: {
    width: 160,
    marginTop: 10,
    alignSelf: 'center',
    height: 160,
  },
  pokemonImage: {
    width: 120,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
  },
  pokeball: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    opacity: 0.6,
    position: 'absolute',
  },
});
