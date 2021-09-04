import React from 'react';
import {ThemeType} from '../theme/Theme';

interface PreferenceContextProp {
  toggleTheme: (_: ThemeType) => void;
  userSelection: ThemeType;
}

export const PreferencesContext = React.createContext<PreferenceContextProp>({
  toggleTheme: (_: ThemeType) => {},
  userSelection: 'system',
});
