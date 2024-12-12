import { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';

const ChatScreen = () => {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [chats, setChats] = useState([]);

  const getMatches = async () => {
    // Simulación de obtener matches
    setMatches([
      { _id: '1', firstName: 'Maria', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { _id: '2', firstName: 'Juan', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ]);
  };

  const getChats = async () => {
    // Simulación de obtener chats
    setChats([
      {
        _id: '1',
        id_user1: { firstName: 'Maria' },
        id_user2: { firstName: 'You' },
        message: 'Hola, ¿cómo estás?',
      },
      {
        _id: '2',
        id_user1: { firstName: 'Juan' },
        id_user2: { firstName: 'You' },
        message: '¡Hola! ¿Nos vemos el viernes?',
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      getMatches();
      getChats();
    }, [])
  );

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 80 }]}>Nuevos Matches</Text>
        <FlatList
          horizontal
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.matchContainer}>
              <Image source={{ uri: item.image }} style={styles.matchImage} />
              <Text style={styles.matchName}>{item.firstName}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <TextInput style={styles.searchBar} placeholder="Buscar" placeholderTextColor="#999" />

        <Text style={styles.title}>Mensajes</Text>
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/chat/${item._id}`)}>
              <View style={styles.messageContainer}>
                <Ionicons name="person-outline" size={35} color="black" />
                <View style={styles.messageTextContainer}>
                  <Text style={styles.messageName}>
                    {item.id_user1.firstName || item.id_user2.firstName}
                  </Text>
                  <Text style={styles.messageText}>{item.message}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
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
