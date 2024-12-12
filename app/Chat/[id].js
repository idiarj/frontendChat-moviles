import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; 
import { useRouter, useLocalSearchParams } from 'expo-router'; 
 
export default function Chat() { 
  const router = useRouter(); 
  const { id } = useLocalSearchParams();  
  const [messages, setMessages] = useState([ 
    { id: '1', text: 'Hola, ¿cómo estás?', sender: 'other' }, 
    { id: '2', text: 'Todo bien, ¿y tú?', sender: 'me' }, 
  ]); 
  const [input, setInput] = useState(''); 
 
  useEffect(() => { 
    // Aquí puedes cargar los mensajes del chat usando el id 
  }, [id]); 
 
  const sendMessage = () => { 
    if (input.trim() === '') return; 
 
    const newMessage = { 
      id: Math.random().toString(), 
      text: input, 
      sender: 'me', 
    }; 
    setMessages([...messages, newMessage]); 
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
        keyExtractor={(item) => item.id} 
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