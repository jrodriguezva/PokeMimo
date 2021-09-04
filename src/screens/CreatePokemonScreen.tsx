import React, {useState} from 'react';
import {Alert, Image, NativeModules, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {isValidNumber} from '../utils/Utils';
import {usePokemonDatabase} from '../hooks/usePokemonDatabase';

const CreatePokemonScreen = () => {
  const [name, setName] = useState('');
  const {addPokemon} = usePokemonDatabase();
  const navigation = useNavigation();
  const [image, setImage] = useState<string>('');
  const [number, setNumber] = useState('');

  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 24}}>
      <View style={{alignItems: 'center'}}>
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={{width: 200, height: 200}}
          />
        ) : (
          <Image
            source={require('../assets/placeholder_image.png')}
            style={{width: 200, height: 200}}
          />
        )}
        <Button
          style={{
            marginTop: 10,
          }}
          icon="camera"
          mode="outlined"
          onPress={() =>
            NativeModules.ImagePicker.getImage()
              .then((responseItem: string) => {
                setImage(`data:image/png;base64,${responseItem}`);
              })
              .catch((error: any) => createButtonAlert(error.message))
          }>
          Add Image
        </Button>
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

      <Button
        icon="content-save-outline"
        mode="contained"
        style={styles.marginTop}
        onPress={() => {
          if (name.trim().length < 1) {
            Alert.alert('Alert', 'Name is empty');
            return;
          }
          if (!isValidNumber(number.trim())) {
            Alert.alert('Alert', 'Number is error number');
            return;
          }
          addPokemon(name, number, image);
          navigation.goBack();
        }}>
        Create Pokemon
      </Button>
    </View>
  );
};

export default CreatePokemonScreen;

const createButtonAlert = (error: string) =>
  Alert.alert('An error has occurred!!', error, [{text: 'OK'}]);

const styles = StyleSheet.create({
  marginTop: {marginTop: 10},
});
