import React from 'react';
import { View, Text, Image, FlatList, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { NavBar } from './components/navbar';
import fondo from '../assets/fondoHB.png';

const ChatScreen = () => {
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
            data={newMatches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.matchContainer}>
                <Image source={{ uri: item.image }} style={styles.matchImage} />
                <Text style={styles.matchName}>{item.name}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <TextInput style={styles.searchBar} placeholder="Buscar" placeholderTextColor="#999" />

        <Text style={styles.title}>Mensajes</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Image source={{ uri: item.image }} style={styles.messageImage} />
              <View style={styles.messageTextContainer}>
                <Text style={styles.messageName}>{item.name}</Text>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </View>
          )}
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
