import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

function NavBar() {
  return (
    <View style={styles.NavBar}>
      <Link href="/home" replace>
        <Ionicons name="home-outline" size={32} color="white" style={styles.icon} />
      </Link>
      <Link href="/Chat" replace >
        <Ionicons name="chatbubble-ellipses-outline" size={32} color="white" />
      </Link>
      <Link href="/profile" replace>
        <Ionicons name="person-outline" size={32} color="white" style={styles.icon} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3a0707',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    elevation: 10,
    zIndex: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default NavBar;