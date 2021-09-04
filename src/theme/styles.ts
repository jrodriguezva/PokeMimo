import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeballBG: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: -70,
    right: -70,
    opacity: 0.2,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
