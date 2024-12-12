import { useState, useCallback } from 'react';
import { useFocusEffect, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, FlatList, TextInput, StyleSheet, ImageBackground, Pressable } from 'react-native';
import NavBar from '../components/navbar';
import { fetchWrapper } from '../../utils/fetchWrapper.js';
import fondo from '../../assets/fondoHB.png';

const ChatScreen = () => {
  const [matches, setMaches] = useState([]);
  const [chats, setChats] = useState([]);

  const getMatches = async () => {
    try {
      const response = await fetchWrapper.get({
        endpoint: '/user/getMatches'
      });
      const { data } = await response.json();
      if (response.ok) {
        setMaches(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getChats = async () => {
    try {
      const response = await fetchWrapper.get({
        endpoint: '/user/getChats'
      });
      const { data } = await response.json();
      if (response.ok) {
        setChats(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMatches();
      getChats();
    }, [])
  );

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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const user1FirstName = item.id_user1 ? item.id_user1.firstName : '';
            const user2FirstName = item.id_user2 ? item.id_user2.firstName : '';
            return (
              <Pressable onPress={() => {
                console.log('presionado');
                router.push('/profile');
              }}>
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
              </Pressable>
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#612222',
  },
});

export default ChatScreen;
