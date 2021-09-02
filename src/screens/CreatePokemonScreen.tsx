import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const CreatePokemonScreen = () => {
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
        style={{
          marginTop: 10,
        }}
        value={number}
        onChangeText={text => setNumber(text)}
      />
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        autoCapitalize={'sentences'}
        style={{
          marginTop: 10,
        }}
        onChangeText={text => setName(text)}
      />
    </View>
  );
};

export default CreatePokemonScreen;
