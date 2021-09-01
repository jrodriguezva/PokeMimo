import * as React from 'react';
import App from './src/App';
import {CustomThemeProvider} from './src/context/ThemeContext';

export default function Main() {
  return (
    <AppState>
      <App />
    </AppState>
  );
}

const AppState = ({children}: any) => {
  return <CustomThemeProvider>{children}</CustomThemeProvider>;
};
