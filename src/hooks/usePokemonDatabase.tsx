import {useState} from 'react';
import {Pokemon} from '../data/Pokedex';
import database, {PokemonModel} from '../data/local/database';

export const usePokemonDatabase = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, isLoading] = useState<boolean>(false);

  function mapPokemon(pokemonModelList: Realm.Results<PokemonModel>) {
    const pokemons: Pokemon[] = pokemonModelList.map((item: PokemonModel) => {
      return {
        id: item.number,
        idDatabase: item._id,
        name: item.name,
        image: item.photo,
      };
    });
    return pokemons;
  }

  const loadPokemon = () => {
    database.then(realm => {
      isLoading(true);

      const pokemonModelList = realm.objects<PokemonModel>('PokemonModel');
      setPokemonList([...mapPokemon(pokemonModelList)]);

      pokemonModelList.addListener(() => {
        const pokemons = mapPokemon(pokemonModelList);
        setPokemonList([...pokemons]);
      });

      isLoading(false);
      return () => {
        pokemonModelList.removeAllListeners();
        realm.close();
      };
    });
  };

  const addPokemon = (name: string, number: string, image: string) => {
    database.then(realm => {
      const results = realm.objects<PokemonModel>('PokemonModel').sorted('_id');
      const id = results.length > 0 ? results[results.length - 1]._id + 1 : 1;
      realm.write(() => {
        realm.create<PokemonModel>('PokemonModel', {
          _id: id,
          name: name,
          number: number,
          photo: image ? image : undefined,
        });
      });
      return () => {
        realm.close();
      };
    });
  };

  const deletePokemon = (id: number) => {
    database.then(realm => {
      const pokemonToDelete = realm.objectForPrimaryKey('PokemonModel', id);
      const pokemonToDeletes = realm.objects('PokemonModel');
      console.log(pokemonToDelete);
      console.log(JSON.stringify(pokemonToDeletes));
      console.log(id);
      realm.write(() => {
        realm.delete(pokemonToDelete);
      });
      return () => {
        realm.close();
      };
    });
  };

  return {loading, pokemonList, addPokemon, deletePokemon, loadPokemon};
};
