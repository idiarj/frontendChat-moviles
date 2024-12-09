import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from './../components/customInput';
import CustomButton from './../components/customButton';
import fondo from '../../assets/fondoR.png';

const Register = () => {
  const navigation = useNavigation();
  const [email, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(null); // Estado para género seleccionado

  // Animación para el formulario
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const onRegisterPressed = async () => {
    try {
      if (!email || !password || !username || !gender) {
        setError('Por favor, llena todos los campos y selecciona un género');
        return;
      }
      console.log(
        'Usuario:',
        username,
        'Correo:',
        email,
        'Contraseña:',
        password,
        'Género:',
        gender
      );

      // Simulación de registro (reemplazar con fetch)
      const response = {
        ok: true, // Cambiar según la respuesta real del servidor
        data: { email },
      };

      if (response.ok) {
        Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
        navigation.navigate('Login'); // Navega al Login
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Ocurrió un error inesperado. Intenta nuevamente.');
    }
  };

  return (

    <ImageBackground source={fondo} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.subTitle1}>Registro</Text>

        <CustomInput
          value={username}
          setvalue={setUsername}
          placeholder="Usuario"
        />
        <CustomInput value={email} setvalue={setCorreo} placeholder="Correo" />
        <CustomInput
          value={password}
          setvalue={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />

        {/* Campo de selección de género */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Hombre' && styles.genderSelected,
            ]}
            onPress={() => setGender('Hombre')}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'Hombre' && styles.genderTextSelected,
              ]}
            >
              Hombre
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Mujer' && styles.genderSelected,
            ]}
            onPress={() => setGender('Mujer')}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'Mujer' && styles.genderTextSelected,
              ]}
            >
              Mujer
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.errorText}>{error}</Text>

        <Text style={styles.signInText}>
          Al registrarte, confirmas que aceptas nuestros términos de uso y
          política de privacidad.
        </Text>

        <CustomButton text="Registrarse" onPress={onRegisterPressed} />

        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('Login')}
        >
          Volver al login
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a0707',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginTop: -120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
  },
  subTitle1: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  genderButton: {
    width: '45%',
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
  signInText: {
    color: 'white',
    marginTop: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
  signInLink: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Register;
