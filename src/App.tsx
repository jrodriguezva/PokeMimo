import React, { useCallback, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigator } from './navigation/PokedexNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { Appearance, AppState, StatusBar } from 'react-native';
import { CustomDarkTheme, CustomDefaultTheme, ThemeType } from './theme/Theme';
import { PreferencesContext } from './context/PreferenceContext';

const PREFERENCES_KEY = 'APP_PREFERENCES';

const App = () => {
  const [theme, setTheme] = React.useState(CustomDefaultTheme);

  const isMounted = useRef(true);
  const [userSelection, setUserSelection] = React.useState<ThemeType>('system');

  const changeThemeByAppearance = useCallback(() => {
    console.log('changeThemeByAppearance');
    setTheme(Appearance.getColorScheme() === 'light' ? CustomDefaultTheme : CustomDarkTheme);
  }, []);

  const changeTheme = useCallback(
    (themeType: ThemeType) => {
      setUserSelection(themeType);
      console.log('changeTheme' + themeType);
      switch (themeType) {
        case 'light':
          setTheme(CustomDefaultTheme);
          break;
        case 'dark':
          setTheme(CustomDarkTheme);
          break;
        case 'system':
          changeThemeByAppearance();
          AppState.addEventListener('change', status => {
            if (status === 'active' && userSelection === 'system') {
              changeThemeByAppearance();
            }
          });
          break;
      }
    },
    [changeThemeByAppearance],
  );

  React.useEffect(() => {
    const restorePrefs = async () => {
      await AsyncStorage.getItem(PREFERENCES_KEY).then(prefString => {
        if (!isMounted.current) {
          return;
        }
        try {
          const preferences: ThemeType = prefString != null ? JSON.parse(prefString) : 'system';
          console.log('preferences: ' + preferences);
          changeTheme(preferences);
        } catch (e) {
          console.error(e);
          // ignore error
        }
      });
    };
    restorePrefs();
    return () => {
      isMounted.current = true;
    };
  }, [changeTheme]);

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(userSelection));
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [userSelection]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme: (themeType: ThemeType) => changeTheme(themeType),
      userSelection,
    }),
    [changeTheme, userSelection],
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <PreferencesContext.Provider value={preferences}>
          <NavigationContainer theme={theme}>
            <StatusBar
              backgroundColor={theme.colors.primary}
              barStyle={theme === CustomDarkTheme ? 'light-content' : 'dark-content'}
            />
            <Navigator />
          </NavigationContainer>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
