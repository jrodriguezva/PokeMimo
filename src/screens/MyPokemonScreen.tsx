import React, {useContext, useState} from 'react';
import {Image, NativeModules, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ThemeContext} from '../context/ThemeContext';
import {Button, FAB, TextInput} from 'react-native-paper';

const MyPokemonScreen = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 24}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image
          source={{
            uri: 'https://www.madrid.es/UnidadesDescentralizadas/UDCMedios/noticias/2021/09Septiembre/01Miercoles/Notasprensa/Almeida%20inaugura%20bus%20Pza.El%C3%ADptica-Islazul/DESTACADA.jpeg',
          }}
          style={{width: 200, height: 200}}
        />
        <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
          <Button
            icon="camera"
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            Camera
          </Button>
          <Button
            icon="image"
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            Gallery
          </Button>
        </View>
      </View>
      <TextInput
        mode="outlined"
        label="Number"
        keyboardType={'number-pad'}
        style={styles.marginTop}
        value={number}
        onChangeText={text => setNumber(text)}
      />
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        autoCapitalize={'sentences'}
        style={styles.marginTop}
        onChangeText={text => setName(text)}
      />

      <View style={styles.reminderView}>
        <FAB
          small
          icon="plus"
          onPress={() => NativeModules.Toast.show('hola que ase!')}
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          style={{...styles.fabStyle, marginBottom: tabBarHeight}}
        />
      </View>
    </View>
  );
};

export default MyPokemonScreen;

// import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  reminderView: {
    flex: 1,
    right: 0,
    margin: 10,
    bottom: 0,
    position: 'absolute',
  },
  fabStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  marginTop: {marginTop: 10},
});
