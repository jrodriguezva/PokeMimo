export interface Pokedex {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface Pokemon {
  id: string;
  idDatabase: number;
  name: string;
  image?: string;
  color?: string;
}
