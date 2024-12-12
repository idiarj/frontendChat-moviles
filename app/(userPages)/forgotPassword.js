import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Link, useNavigation } from "expo-router";
import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import fondo from '../../assets/fondo.png';
import {fetchWrapper} from "../../utils/fetchWrapper.js";

const ForgotPassword = () => {
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetchsito1.get('/user/security-question');
                const data = await response.json();
                if (response.ok) {
                    setPregunta(data.pregunta);  
                } else {
                    setError("Error al recuperar la pregunta de seguridad");
                }
            } catch (error) {
                console.error(error);
                setError("Hubo un problema al conectar con el servidor");
            }
        };
        
        fetchQuestion();
    }, []);

    const onSendPressed = async () => {
        if (!respuesta) {
            setError("Por favor, ingresa tu respuesta");
            return;
        }

        try {
            const response = await fetchsito1.post("/user/validate-answer", { respuesta });
            const data = await response.json();
            if (response.ok) {
                setError("");
                Alert.alert("Verificación exitosa", "La respuesta es correcta.");
                navigation.navigate("LoadingScreen", { loadingText: "Espera un momento, estamos terminando de registrarte.", newRoute: "notas" });
            } else {
                setError(data.error || "Respuesta incorrecta");
            }
        } catch (error) {
            console.error(error);
            setError("Error al validar la respuesta. Intenta nuevamente.");
        }
    };

    return (
        <ImageBackground source={fondo} style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>

                    <Text style={styles.subTitle}>
                        Para completar el registro, responde la pregunta de seguridad.
                    </Text>

                    <View style={styles.container}>
                        <Text style={styles.securityQuestion}>{pregunta || "Cargando pregunta de seguridad..."}</Text>

                        <CustomInput
                            placeholder="Ingrese su respuesta"
                            value={respuesta}
                            setvalue={setRespuesta}
                            style={styles.input}
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <CustomButton text="Enviar" onPress={onSendPressed} />
                    </View>

                    <Link href="/login" style={styles.signInLink}>Ir a login</Link>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginTop: 100,
    },
    Title: {
        padding: 10,
        fontSize: 30,
        color: 'white',
        marginLeft: 5,
        marginTop: 25,
        fontFamily: 'Bukhari-Script',
    },
    subTitle1: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
        marginTop: 10,
    },
    subTitle: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        padding: 20,
    },
    container: {
        justifyContent: 'center',
        padding: 1,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    securityQuestion: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});

export default ForgotPassword;
