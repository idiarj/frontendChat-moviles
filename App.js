import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/(userPages)/login';
import Register from './app/(userPages)/register';
import Home from './app/home';
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