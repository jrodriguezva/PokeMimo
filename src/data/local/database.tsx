import Realm from 'realm';

export type PokemonModel = {
  _id: number;
  name: string;
  number: string;
  photo?: string;
};
const PokemonSchema = {
  name: 'PokemonModel',
  properties: {
    _id: 'int',
    name: 'string',
    number: 'string',
    photo: 'string?',
  },
  primaryKey: '_id',
};

let realm = Realm.open({ schema: [PokemonSchema] });

export default realm;
