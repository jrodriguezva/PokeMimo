import React from 'react';
import {RadioButton, Title} from 'react-native-paper';
import {View} from 'react-native';
import {ThemeType} from '../theme/Theme';
import {PreferencesContext} from '../context/PreferenceContext';

const SettingScreen = () => {
  const {toggleTheme, userSelection} = React.useContext(PreferencesContext);
  const [value, setValue] = React.useState<ThemeType>(userSelection);
  return (
    <View style={{margin: 20}}>
      <Title>Select theme</Title>
      <RadioButton.Group
        onValueChange={val => {
          setValue(val as 'light' | 'dark' | 'system');
          toggleTheme(val as 'light' | 'dark' | 'system');
        }}
        value={value}>
        <RadioButton.Item label="Light theme" value="light" />
        <RadioButton.Item label="Dark theme" value="dark" />
        <RadioButton.Item label="System theme" value="system" />
      </RadioButton.Group>
    </View>
  );
};

export default SettingScreen;
