import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import fondo from '../../assets/fondo.png';
import CustomButton from '../components/customButton';

const Description = () => {
  const [description, setDescription] = useState('');
  const [interestedIn, setInterestedIn] = useState(null); // Estado para género de interés
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!description || !interestedIn) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    Alert.alert('Información guardada', `Descripción: ${description}\nInteresado en: ${interestedIn}`);
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.label}>Agrega una pequeña descripción sobre ti:</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Escribe algo sobre ti..."
          maxLength={180}
          placeholderTextColor="#a56969"
        />
        <Text style={styles.charCount}>{description.length}/180 caracteres</Text>

        <Text style={styles.label}>¿Qué género te gustaría ver?</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              interestedIn === 'Hombre' && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn('Hombre')}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === 'Hombre' && styles.genderTextSelected,
              ]}
            >
              Hombre
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              interestedIn === 'Mujer' && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn('Mujer')}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === 'Mujer' && styles.genderTextSelected,
              ]}
            >
              Mujer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              interestedIn === 'Ambos' && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn('Ambos')}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === 'Ambos' && styles.genderTextSelected,
              ]}
            >
              Ambos
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <CustomButton text="Guardar" onPress={handleSave} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  textInput: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginBottom: 10,
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#a56969',
    fontSize: 12,
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    width: '30%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  genderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  genderTextSelected: {
    color: '#3a0707', // Cambia a negro cuando está seleccionado
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Description;
