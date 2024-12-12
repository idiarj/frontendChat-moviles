import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // Importa Image Picker
import CustomButton from "./../components/customButton";
import fondo from "../../assets/fondo.png";

const Description = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
  const [description, setDescription] = useState("");
  const [interestedIn, setInterestedIn] = useState(null); 
  const [error, setError] = useState("");

  // Maneja la selección de imágenes desde la galería
  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permiso denegado", "Se necesita acceso a la galería para continuar.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri); // Actualiza la imagen seleccionada
      }
    } catch (error) {
      console.error("Error seleccionando imagen:", error);
      Alert.alert("Error", "Ocurrió un problema seleccionando la imagen.");
    }
  };

  const handleSave = async () => {
    if (!description || !interestedIn || !selectedImage) {
      setError("Por favor completa todos los campos y selecciona una imagen.");
      return;
    }
    // Aquí puedes añadir la lógica para guardar la información
    console.log("Descripción:", description);
    console.log("Interesado en:", interestedIn);
    console.log("Imagen seleccionada:", selectedImage);
    Alert.alert("Datos guardados", "Tu información ha sido actualizada correctamente.");
    router.push("/nextStep");
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Sube tu foto:</Text>
        <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
          )}
        </TouchableOpacity>

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
          <Pressable
            style={[
              styles.genderButton,
              interestedIn === "Hombre" && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn("Hombre")}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === "Hombre" && styles.genderTextSelected,
              ]}
            >
              Hombre
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.genderButton,
              interestedIn === "Mujer" && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn("Mujer")}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === "Mujer" && styles.genderTextSelected,
              ]}
            >
              Mujer
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.genderButton,
              interestedIn === "Ambos" && styles.genderSelected,
            ]}
            onPress={() => setInterestedIn("Ambos")}
          >
            <Text
              style={[
                styles.genderText,
                interestedIn === "Ambos" && styles.genderTextSelected,
              ]}
            >
              Ambos
            </Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <CustomButton text="Siguiente" onPress={handleSave} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 160,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  imageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#a56969",
    textAlign: "center",
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
    color: "white",
    marginBottom: 10,
  },
  charCount: {
    alignSelf: "flex-end",
    color: "#a56969",
    fontSize: 12,
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  genderButton: {
    width: "30%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "white",
    borderColor: "white",
  },
  genderText: {
    color: "white",
    fontWeight: "bold",
  },
  genderTextSelected: {
    color: "#3a0707",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Description;
 