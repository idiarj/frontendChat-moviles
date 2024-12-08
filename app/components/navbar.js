import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { Link } from 'expo-router';

export function NavBar() {
  return (
    <View style={styles.navbar}>
      <Link href="/home">
        <Ionicons name="home-outline" size={32} color="#3a0707" style={styles.icon} />
      </Link>
      <Link href="/chat">
      <Ionicons name="chatbox-ellipses-outline" size={24} color="#3a0707" style={styles.icon} />
        </Link>
      <Link href="/profile">
        <Ionicons name="person-outline" size={32} color="#3a0707" style={styles.icon} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 10, 
    zIndex: 10,
  },
  icon: {
    marginHorizontal: 10,
  }
});
