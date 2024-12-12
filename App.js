import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/(userPages)/login';
import InfoUser from './app/(userPages)/infoUser';
import Profile from './app/(userPages)/profile';
import Description from './app/(userPages)/Description';
import ResetPassword from './app/(userPages)/resetPassword';
import AnwersQuestion from './app/(userPages)/answerQuestion';
import Register from './app/(userPages)/register';
import ForgotPassword from './app/(userPages)/forgotPassword';
import Home from './app/home';
import Chat from './app/Chat';
import ValidateMail from './app/(userPages)/validateMail';
import { StyleSheet, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 

        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 

        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 

        />
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          options={{ headerShown: false }} 

        />
          <Stack.Screen 
          name="Profile" 
          component={ Profile } 
          options={{ headerShown: false }} 

        /> 
        <Stack.Screen 
        name="Description" 
        component={ Description } 
        options={{ headerShown: false }} 

      />
      <Stack.Screen 
        name="ValidateMail" 
        component={ ValidateMail } 
        options={{ headerShown: false }}

      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ ResetPassword } 
        options={{ headerShown: false }}   

      />
      <Stack.Screen 
        name="AnwersQuestion" 
        component={ AnwersQuestion } 
        options={{ headerShown: false }}

      />
      <Stack.Screen 
        name="InfoUser" 
        component={ InfoUser } 
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,

  },
});