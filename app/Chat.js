import {useState, useCallback} from 'react';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, FlatList, TextInput, StyleSheet, ImageBackground } from 'react-native';
import NavBar from './components/navbar';
import {fetchWrapper} from '../utils/fetchWrapper.js';
import fondo from '../assets/fondoHB.png';

const ChatScreen = () => {
  const [matches, setMaches] = useState([]);
  const [chats, setChats] = useState([]);

  const getMatches = async () => {
    try {
      const response = await fetchWrapper.get({
        endpoint: '/user/getMatches'
      })
      const {data} = await response.json();
      //console.log(response)
      if(response.ok){
        // console.log(data)
        setMaches(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getChats = async () => {
    try {
      const response = await fetchWrapper.get({
        endpoint: '/user/getChats'
      })
      console.log(response.ok)
      const {data} = await response.json();
      // console.log(data)
      if(response.ok){
        setChats(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useFocusEffect(
    useCallback(()=>{
      getMatches();
      getChats();
    }, [])
  )
  const newMatches = [
    { id: '1', name: 'Erica', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Kayleigh', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', name: 'Claire', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '4', name: 'Sophie', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '5', name: 'Lily', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  ];

  const messages = [
    { id: '1', name: 'Blake', message: 'I’ll be flying to Italy tonight...', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Rose', message: 'How do you know Jon?', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '3', name: 'Nicky', message: "Yeah! I'm down to hangout Sunday...", image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '4', name: 'Rachel', message: 'I love that coffee shop', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: '5', name: 'Joanna', message: 'Your dog is so cute', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  ];

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 80 }]}>Nuevos Matches</Text>
        <View>
          <FlatList
            horizontal
            data={matches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.matchContainer}>
              {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
              <Ionicons name="person-outline" size={40} color="black" style={styles.image} />
                )}
                <Text style={styles.matchName}>{item.firstName}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <TextInput style={styles.searchBar} placeholder="Buscar" placeholderTextColor="#999" />

        <Text style={styles.title}>Mensajes</Text>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            console.log('item', item); // Esto imprimirá cada item en la consola
            const user1FirstName = item.id_user1 ? item.id_user1.firstName : '';
            const user2FirstName = item.id_user2 ? item.id_user2.firstName : '';
            return (
              <View style={styles.messageContainer}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                  <Ionicons name="person-outline" size={35} color="black" style={styles.image} />
                )}
                <View style={styles.messageTextContainer}>
                  <Text style={styles.messageName}>{user1FirstName || user2FirstName}</Text>
                  <Text style={styles.messageText}>{item.message ? item.message : `No hay mensajes entre tu y ${user1FirstName || user2FirstName}`}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <NavBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#612222',
    marginBottom: 12,
  },
  matchContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#612222',
  },
  matchName: {
    fontSize: 12,
    color: '#612222',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
    fontSize: 14,
    color: '#333',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  messageImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageTextContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  messageName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#612222',
  },
  messageText: {
    fontSize: 12,
    color: '#666',
  },

});

export default ChatScreen;
