import {useEffect, useState} from 'react';
import {cancelToken, pokemonApi} from '../data/api/pokemonApi';
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

    const sourceDetail = cancelToken.source();
    const sourceSpecies = cancelToken.source();

    const resp = await pokemonApi.get<PokemonDetail>(url, {
      cancelToken: sourceDetail.token,
    });
    const respSpecies = await pokemonApi.get<PokemonSpecies>(
      resp.data.species.url,
      {
        cancelToken: sourceSpecies.token,
      },
    );

    setPokemonSpecies(respSpecies.data);
    setPokemonDetail(resp.data);
    isLoading(false);
    return () => {
      if (sourceDetail) {
        sourceDetail.cancel();
      }
      if (sourceSpecies) {
        sourceSpecies.cancel();
      }
    };
  };

  useEffect(() => {
    loadPokemonDetail();
  }, []);
  return {loading, pokemonDetail, pokemonSpecies};
};
