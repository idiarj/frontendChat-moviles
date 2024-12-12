import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import fondo from '../../assets/fondo.png';

const InfoUser = () => {
  const router = useRouter();
  const {email, password, username} = useLocalSearchParams();
  // console.log(email, password, username);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState('');

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
      if (!firstName || !lastName || !birthDate || !gender) {
        setError('Por favor, llena todos los campos y selecciona un género');
        return;
      }

      const age = calculateAge(birthDate);
      if (age < 18) {
        setError('Debes ser mayor de 18 años para registrarte.');
        return;
      }

      console.log(
        'Nombre:',
        firstName,
        'Apellido:',
        lastName,
        'Fecha de nacimiento:',
        birthDate.toISOString().split('T')[0],
        'Edad:',
        age,
        'Género:',
        gender
      );
      console.log('a')
      console.log({ firstName, lastName, birthDate, gender, username, email, password })
      router.push({
        pathname: '/Description',
        params: { firstName, lastName, birthDate, gender, username, email, password }
      })
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Ocurrió un error inesperado. Intenta nuevamente.');
    }
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        <CustomInput value={firstName} setvalue={setFirstName} placeholder="Nombre" />
        <CustomInput value={lastName} setvalue={setLastName} placeholder="Apellido" />

        {/* Fecha de nacimiento con Modal */}
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.datePickerText}>
            {birthDate ? birthDate.toISOString().split('T')[0] : 'Selecciona tu fecha de nacimiento'}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={birthDate || new Date('2006-01-01')}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowModal(false);
                  if (selectedDate) {
                    setBirthDate(selectedDate);
                  }
                }}
                maximumDate={new Date('2006-12-31')}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
          onPress={() => router.push('/login')}
        >
          Volver al login
        </Text>
      </View>
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
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  subTitle1: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 10,
  },
  datePicker: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 15,
    alignItems: 'center',
  },
  datePickerText: {
    color: 'white',
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
    color: '#3a0707',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalCloseButton: {
    marginTop: 10,
    backgroundColor: '#741d1d',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default InfoUser;
