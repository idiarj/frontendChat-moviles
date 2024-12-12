import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; 
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fetchWrapper } from '../../utils/fetchWrapper.js'; 
import { io } from 'socket.io-client';
 
export default function Chat() { 
  const router = useRouter(); 
  const { id } = useLocalSearchParams();  
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(''); 
  const socket = io('https://backendchat-moviles.onrender.com'); // Asegúrate de que la URL sea correcta
 
  useEffect(() => { 
    // Conectar al servidor de Socket.IO
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joinRoom', { roomId: id });
    });

    // Escuchar mensajes entrantes
    socket.on('receiveMessage', (message) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Desconectar del servidor cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const getMessages = async () => {
    try {
      const response = await fetchWrapper.get({ endpoint: `/getMessages/${id}` });
      const data = await response.json();
      if(response.ok){
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error)
    }
  }
 
  const sendMessage = () => { 
    if (input.trim() === '') return; 
 
    const newMessage = { 
      _id: uuidv4(), // Generar un ID único para el mensaje
      roomId: id,
      text: input, 
      sender: 'me', 
    }; 
 
    // Enviar mensaje al servidor
    console.log(newMessage)
    socket.emit('sendMessage', newMessage.text);

    // Agregar mensaje a la lista localmente
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput(''); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => router.back()}> 
          <Text style={styles.backButton}>←</Text> 
        </TouchableOpacity> 
        <Text style={styles.headerTitle}>Chat ID: {id}</Text> 
      </View> 
      <FlatList 
        data={messages} 
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => ( 
          <View 
            style={[ 
              styles.messageBubble, 
              item.sender === 'me' ? styles.myMessage : styles.otherMessage, 
            ]} 
          > 
            <Text style={styles.messageText}>{item.text}</Text> 
          </View> 
        )} 
        style={styles.messagesList} 
        inverted 
      /> 
      <View style={styles.inputContainer}> 
        <TextInput 
          value={input} 
          onChangeText={setInput} 
          placeholder="Escribe un mensaje" 
          style={styles.input} 
        /> 
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}> 
          <Text style={styles.sendButtonText}>Enviar</Text> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
  }, 
  backButton: { 
    fontSize: 18, 
    color: '#741d1d', 
    marginRight: 10, 
  }, 
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#741d1d', 
  }, 
  messagesList: { 
    flex: 1, 
    padding: 15, 
  }, 
  messageBubble: { 
    padding: 10, 
    borderRadius: 15, 
    marginVertical: 5, 
    maxWidth: '75%', 
  }, 
  myMessage: { 
    backgroundColor: '#d1f7c4', 
    alignSelf: 'flex-end', 
  }, 
  otherMessage: { 
    backgroundColor: '#f0f0f0', 
    alignSelf: 'flex-start', 
  }, 
  messageText: { 
    fontSize: 16, 
    color: '#333', 
  }, 
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#ddd', 
  }, 
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 20, 
    padding: 10, 
    marginRight: 10, 
    backgroundColor: '#f9f9f9', 
  }, 
  sendButton: { 
    backgroundColor: '#741d1d', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
  }, 
  sendButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
  }, 
}
);