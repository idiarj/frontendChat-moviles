import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import CustomInput from './../components/customInput';
import CustomButton from './../components/customButton';
import fondo from '../../assets/fondo.png';
import {fetchWrapper} from "../../utils/fetchWrapper.js";

const ResetPassword = () => {
    const [password, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const onResetPasswordPressed = async () => {
        // Validación de los campos
        if (!password || !confirmarContrasena) {
            setError("Por favor, ingresa ambas contraseñas.");
            return;
        }

        if (password !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        try {
            const response = await fetchWrapper.patch({
                endpoint: '/user/changePassword',
                data: { password },
            })
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setError('');
                Alert.alert('Contraseña restablecida', 'La contraseña se ha restablecido correctamente');
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
            setError("Error al restablecer la contraseña. Intenta nuevamente.");
        }
    };

    return (
        <ImageBackground source={fondo} style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.subTitle1}>Restablecer Contraseña</Text>
                    <Text style={styles.subTitle}>
                        Ingresa tu nueva contraseña para completar el proceso de recuperación.
                    </Text>

                    <View style={styles.container}>
                        <CustomInput
                            placeholder="Nueva Contraseña"
                            value={password}
                            setvalue={setNuevaContrasena}
                            style={styles.input}
                            secureTextEntry
                        />
                        <CustomInput
                            placeholder="Confirmar Contraseña"
                            value={confirmarContrasena}
                            setvalue={setConfirmarContrasena}
                            style={styles.input}
                            secureTextEntry
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <CustomButton text="Restablecer Contraseña" onPress={onResetPasswordPressed} />
                    </View>

                    <Link href="/login" replace style={styles.signInLink}>Ir a login</Link>
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
        marginTop: 200,
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
    input: {
        marginBottom: 15,
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

export default ResetPassword;
