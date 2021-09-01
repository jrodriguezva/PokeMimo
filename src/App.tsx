import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from './context/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigator} from './navigation/PokedexNavigator';

const App = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Navigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
