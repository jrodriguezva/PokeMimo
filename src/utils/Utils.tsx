export function getTypeColor(type: string): string {
  switch (type) {
    case 'fighting':
      return '#9F422A';
    case 'flying':
      return '#90B1C5';
    case 'poison':
      return '#642785';
    case 'ground':
      return '#AD7235';
    case 'rock':
      return '#4B190E';
    case 'bug':
      return '#179A55';
    case 'ghost':
      return '#363069';
    case 'steel':
      return '#5C756D';
    case 'fire':
      return '#B22328';
    case 'water':
      return '#2648DC';
    case 'grass':
      return '#007C42';
    case 'electric':
      return '#E0E64B';
    case 'psychic':
      return '#AC296B';
    case 'ice':
      return '#7ECFF2';
    case 'dragon':
      return '#378A94';
    case 'fairy':
      return '#9E1A44';
    case 'dark':
      return '#040706';
    default:
      return '#B1A5A5';
  }
}

export function capitalize(word: string): string {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
