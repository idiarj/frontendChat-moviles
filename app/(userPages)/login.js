import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fondo from '../../assets/fond0.png';
import CustomInput from './../components/customInput';
import CustomButton from './../components/customButton';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Simulación de validación
    if (username === 'admin' && password === '1234') {
      setError('');
      Alert.alert('Login exitoso', 'Bienvenido', [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } else {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        <CustomInput
          value={username}
          setvalue={setUsername}
          placeholder="Usuario"
        />
        <CustomInput
          value={password}
          setvalue={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <CustomButton text="Iniciar Sesión" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.link}>Regístrate aquí</Text>
          </Text>
        </TouchableOpacity>
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
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginTop: 100,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Bukhari-Script',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
