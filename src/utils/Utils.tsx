interface TypeColor {
  backgroundColor: string;
  textColor: string;
}

export function getTypeColor(type: string): TypeColor {
  const white = '#fff';
  const black = '#000';

  switch (type) {
    case 'bug':
      return { backgroundColor: '#A8B821', textColor: black };
    case 'dark':
      return { backgroundColor: '#6F5848', textColor: white };
    case 'dragon':
      return { backgroundColor: '#7038F9', textColor: white };
    case 'electric':
      return { backgroundColor: '#F8D030', textColor: black };
    case 'fairy':
      return { backgroundColor: '#FFAEC9', textColor: black };
    case 'fighting':
      return { backgroundColor: '#C03028', textColor: white };
    case 'fire':
      return { backgroundColor: '#F07F2F', textColor: black };
    case 'flying':
      return { backgroundColor: '#A890F0', textColor: black };
    case 'ghost':
      return { backgroundColor: '#715899', textColor: white };
    case 'grass':
      return { backgroundColor: '#78C750', textColor: black };
    case 'ground':
      return { backgroundColor: '#DEBF67', textColor: black };
    case 'ice':
      return { backgroundColor: '#98D8D8', textColor: black };
    case 'normal':
      return { backgroundColor: '#A9A878', textColor: black };
    case 'poison':
      return { backgroundColor: '#A040A1', textColor: white };
    case 'psychic':
      return { backgroundColor: '#F85788', textColor: white };
    case 'rock':
      return { backgroundColor: '#B89F38', textColor: white };
    case 'steel':
      return { backgroundColor: '#B8B8D0', textColor: black };
    case 'water':
      return { backgroundColor: '#6890F0', textColor: black };
    default:
      return { backgroundColor: '#A9A878', textColor: black };
  }
}

export function capitalize(word: string): string {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export const isValidNumber = (v: unknown) => !Number.isNaN(v);
