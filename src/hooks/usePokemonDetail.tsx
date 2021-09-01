import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonDetail} from '../data/PokemonDetail';
import {PokemonSpecies} from '../data/PokemonSpecies';

export const usePokemonDetail = (id: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>(
    {} as PokemonDetail,
  );

  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(
    {} as PokemonSpecies,
  );
  const [loading, isLoading] = useState<boolean>(false);

  const loadPokemonDetail = async () => {
    isLoading(true);
    const resp = await pokemonApi.get<PokemonDetail>(url);
    const respSpecies = await pokemonApi.get<PokemonSpecies>(
      resp.data.species.url,
    );

    setPokemonSpecies(respSpecies.data);
    setPokemonDetail(resp.data);
    isLoading(false);
  };

  useEffect(() => {
    loadPokemonDetail();
  }, []);
  return {loading, pokemonDetail, pokemonSpecies};
};
