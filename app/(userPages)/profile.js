import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import fondo from '../../assets/fondoHB.png';
import { NavBar } from '../components/navbar';
import { Ionicons } from '@expo/vector-icons';

// JSON de ejemplo con la información del usuario
const userData = {
  name: 'Isabel',
  lastName: 'Lopez',
  gender: 'Mujer',
  birthDate: '2000-10-10', // Cambiar formato a YYYY-MM-DD para calcular edad
  description: 'Soy alegre y me gusta la música pop',
  username: 'isabel10',
  email: 'isabel10@gmail.com',
  image: 'https://randomuser.me/api/portraits/women/44.jpg', // Imagen inicial
};

export default function Profile() {
  const [user, setUser] = useState(userData);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [description, setDescription] = useState(user.description);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(null);

  useEffect(() => {
    // Calcular edad
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

    const userAge = calculateAge(user.birthDate);
    setAge(userAge);
  }, [user.birthDate]);

  const handleImageChange = () => {
    setUser({
      ...user,
      image: 'https://randomuser.me/api/portraits/women/50.jpg', // Cambia la imagen de prueba
    });
    Alert.alert('Imagen actualizada', 'Tu foto de perfil ha sido cambiada.');
  };

  const handleSaveDescription = () => {
    if (description.length > 180) {
      Alert.alert(
        'Descripción demasiado larga',
        'La descripción no puede tener más de 180 caracteres.'
      );
      return;
    }
    setUser({ ...user, description });
    setIsEditingDescription(false);
    Alert.alert('Descripción actualizada', 'Tu descripción ha sido guardada.');
  };

  const handleSaveUserInfo = () => {
    setUser({ ...user, username, email });
    setIsEditingUserInfo(false);
    Alert.alert('Información de usuario actualizada', 'Cambios guardados.');
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.container, { marginTop: 30 }]}></View>
        <View style={styles.profileSection}>
          {/* Imagen de perfil */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleImageChange}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Información personal (no editable) */}
          <Text style={styles.title}>Perfil</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Nombre:</Text> {user.name}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Apellido:</Text> {user.lastName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Género:</Text> {user.gender}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Fecha de nacimiento:</Text>{' '}
              {user.birthDate}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Edad:</Text> {age} años
            </Text>
          </View>

          {/* Descripción */}
          <Text style={styles.sectionTitle}>Descripción</Text>
          <View style={styles.infoContainer}>
            {isEditingDescription ? (
              <>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  onChangeText={setDescription}
                  maxLength={180}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveDescription}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.row}>
                <Text style={styles.infoText}>{user.description}</Text>
                <TouchableOpacity
                  onPress={() => setIsEditingDescription(true)}
                >
                  <Ionicons name="pencil" size={20} color="#741d1d" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Información de usuario */}
          <Text style={styles.sectionTitle}>Información de usuario</Text>
          <View style={styles.infoContainer}>
            {isEditingUserInfo ? (
              <>
                <Text style={styles.boldText}>Usuario:</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                />
                <Text style={styles.boldText}>Correo:</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveUserInfo}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Usuario:</Text> {user.username}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingUserInfo(true)}
                  >
                    <Ionicons name="pencil" size={20} color="#741d1d" />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Correo:</Text> {user.email}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingUserInfo(true)}
                  >
                    <Ionicons name="pencil" size={20} color="#741d1d" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#741d1d',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#741d1d',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#741d1d',
    borderRadius: 15,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#741d1d',
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#741d1d',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#741d1d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
