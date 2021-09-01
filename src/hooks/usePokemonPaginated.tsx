import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {Pokedex, Pokemon, PokemonResult} from '../data/Pokedex';
import {capitalize} from '../utils/Utils';

export const usePokemonPaginated = () => {
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, isLoading] = useState<boolean>(false);

  const loadPokemon = async () => {
    isLoading(true);
    const resp = await pokemonApi.get<Pokedex>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;

    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokeList: PokemonResult[]) => {
    const pokemons: Pokemon[] = pokeList.map(({name, url}) => {
      const urlPart = url.split('/');
      const nameCapitalize = capitalize(name);
      const id = urlPart[urlPart.length - 2];
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {
        id,
        name: nameCapitalize,
        image,
      };
    });

    setPokemonList([...pokemonList, ...pokemons]);
    isLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);
  return {loading, pokemonList, loadPokemon};
};
