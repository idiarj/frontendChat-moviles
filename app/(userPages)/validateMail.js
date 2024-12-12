import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, Alert } from "react-native";
import fondo from '../../assets/fondo.png';
import CustomInput from './../components/customInput';
import CustomButton from './../components/customButton';
import { Link, router } from 'expo-router';
// import { fetchsito1 } from "../../utils/fetchMethod.js";

const ValidateMail = () => {
    const [email, setCorreo] = useState('');
    const [error, setError] = useState('');

    const onSubmitPressed = async () => {
        // Validación del campo de email
        if (!email) {
            setError("Por favor, ingresa tu email electrónico");
            return;
        }

        // Validación del formato de email
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(email)) {
            setError("Por favor, ingresa un email electrónico válido");
            return;
        }

        // Simulación de verificación de existencia del email
        try {
            const response = await fetchsito1.post('/user/sendEmailRecovery', { email });
            const data = await response.json();
            console.log(data)
            console.log(response.ok)
            if (response.ok) {
                setError('');
                router.push('anwersQuestion')
                // Aquí redirigimos a la pantalla de cambio de contraseña
                // Por ejemplo: router.push("/ChangePassword");
            } else {
                setError("El email ingresado no está registrado");
            }
        } catch (error) {
            console.error(error);
            setError("Error al verificar el email. Intenta nuevamente.");
        }
    };

    return (
        <ImageBackground source={fondo} style={StyleSheet.absoluteFillObject}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <View style={{ ...styles.container, width: "100%" }}>
                    <Text style={styles.subTitle}>Cambio de Contraseña</Text>

                        <CustomInput
                            placeholder="Ingrese su email"
                            value={email}
                            setvalue={setCorreo}
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <CustomButton text="Enviar" onPress={onSubmitPressed} />
                    </View>
                    <Link href="/login" style={styles.signInLink}>Volver al login</Link>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginTop: 240,
        
    },
    container: {
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
    },
    Title: {
        padding: 10,
        fontSize: 30,
        color: 'white',
        marginLeft: 5,
        marginTop: 25,
        fontFamily: 'Bukhari-Script',
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 10,
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

export default ValidateMail;
