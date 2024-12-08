import { View, Text,ImageBackground, StyleSheet, Image } from 'react-native';
import React, {useState} from 'react';
import {Link} from 'expo-router';
import fondo from '../../assets/fond0.png';
import CustomInput from './../components/customInput';
import CustomButton from './../components/customButton';
// import { fetchsito1 } from '../../utils/fetchMethod.js';
import { router } from 'expo-router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigation = useNavigation();

    async function onSingInPressed() {
        try {
            console.log('hare el fetch');
            console.log(username);
            console.log(password);
            const response = await fetchsito1.post('/user/login', { username, password });
            if(!username || !password){
                setError('Por favor, llena todos los campos');
                return
            }
            console.log('fetch hecho');
            const data = await response.json();
            console.log(response);
            if (response.ok) {
                console.log('ahora deberia llevarte a home');
                router.navigate('home');
                console.log(data);
            } else {
                console.log(data);
                console.error(data.error);
                setError(data.error);
            }
            
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


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
            secureTextEntry // Esto activa la funcionalidad de mostrar/ocultar contraseña
        />

        <Text style={styles.error}>
            {error}
        </Text>
        <View style={styles.button}>
        <CustomButton 
            text="Acceder"
            onPress={onSingInPressed}
        />
        </View>
        <Link href="/validateMail">
            <Text style={styles.ForgotPassword}>
                ¿Olvidaste tu contraseña? <Text style={styles.signInLink}>Ingresa aquí</Text>
            </Text>
        </Link>
        <Link href="/register">
            <Text style={styles.signInText}> 
                ¿No tienes cuenta? <Text style={styles.signInLink}>Regístrate aquí</Text>
            </Text>
        </Link>
        
        <Link href="/home" >home</Link>

    </View>
</ImageBackground>
  )
}
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
        marginTop: 150,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Garet',
        alignSelf: 'center',
        marginBottom: 40,
    },
    error: {
        color: 'red',
        marginBottom: 10,
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
        marginLeft: 15,
    },
    button: {
    marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    
    ForgotPassword: {
        color: 'white',
        marginTop: 15,
        alignSelf: 'left',
    },
    
    signInText: {
        color: 'white',
        marginTop: 40,
        alignSelf: 'left',
        marginBottom: 20,
    },
    signInLink: {
        marginTop: 10,
        color: 'white',
        textDecorationLine: 'underline',
        alignItems: 'center',
    },
    });
export default Login