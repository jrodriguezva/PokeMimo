import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MyPokemonScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>MyPokemonScreen</Text>
      <Button
        onPress={() => navigation.navigate('CreatePokemonScreen')}
        title="Open Modal"
      />
    </View>
  );
};

export default MyPokemonScreen;
