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
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState(null); // Estado para género seleccionado
  const [error, setError] = useState('');

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

  // Función para calcular la edad
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const onNextPressed = async () => {
    try {
      if (!name || !lastName || !birthDate || !gender) {
        setError('Por favor, llena todos los campos y selecciona un género');
        return;
      }

      const age = calculateAge(birthDate); // Calcula la edad
      console.log(
        'Nombre:',
        name,
        'Apellido:',
        lastName,
        'Fecha de nacimiento:',
        birthDate,
        'Edad:',
        age,
        'Género:',
        gender
      );

      // Simulación de validación (reemplazar con fetch)
      const response = { ok: true }; // Simulación
      if (response.ok) {
        Alert.alert(
          'Registro exitoso',
          `Has avanzado al siguiente paso. Tu edad: ${age} años`
        );
        navigation.navigate('NextStep', { name, lastName, birthDate, gender, age }); // Navega al siguiente paso
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

        <CustomInput value={name} setvalue={setName} placeholder="Nombre" />
        <CustomInput value={lastName} setvalue={setLastName} placeholder="Apellido" />
        <CustomInput
          value={birthDate}
          setvalue={setBirthDate}
          placeholder="Fecha de nacimiento (año-mes-dia)"
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

        <CustomButton text="Siguiente" onPress={onNextPressed} />

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
  signInLink: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Register;
