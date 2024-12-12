import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert, Image } from 'react-native';
import fondo from '../../assets/fondo.png';
import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import { Link, useRouter } from 'expo-router';
// import { fetchWrapper } from '../../utils/fetchMethod';

const Register = () => {
    const [email, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();
    const onRegisterPressed = async () => {
        try {
            console.log('kklkjlkjlk')
            if (!email || !password || !username) {
                setError('Por favor, llena todos los campos');
                return;
            }
            router.push({
                pathname: '/infoUser',
                params: { email, password, username },
            });
        } catch (error) {
            console.error(error);
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
                    value={email}
                    setvalue={setCorreo}
                    placeholder="Correo"
                />

                <CustomInput
                    value={password}
                    setvalue={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                />

                <Text style={styles.errorText}>{Error}</Text>

                <Text style={styles.signInText}>Al registrarte, confirmas que aceptas nuestros términos de uso y política de privacidad.</Text>

                <CustomButton text="Registrarse" onPress={onRegisterPressed} />

                <Link href="/login" style={styles.signInLink}>Volver al login</Link>

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
        marginTop: 50,
    },
    subTitle1: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
        marginTop: 10,
    },
    Title: {
        padding: 10,
        fontSize: 30,
        color: 'white',
        marginLeft: 5,
        marginTop: 25,
      },
    title: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 30,
        marginTop: 50,
    },
    title1: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 30,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
 
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Garet',
    },
    errorText: {
        color: 'red',
    },
    signInText: {
        color: 'white',
        marginTop: 3,        
        alignSelf: 'center',
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 10,
    }
});

export default Register;