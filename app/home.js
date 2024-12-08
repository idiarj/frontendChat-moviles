import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import users from './data/user'; // Ruta correcta

const Home = () => {
  const [profiles, setProfiles] = useState(users);
  const swipe = new Animated.ValueXY();

  const swipeResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: swipe.x, dy: swipe.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 120) {
        swipeOut('right');
      } else if (gestureState.dx < -120) {
        swipeOut('left');
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const swipeOut = (direction) => {
    const x = direction === 'right' ? Dimensions.get('window').width : -Dimensions.get('window').width;
    Animated.timing(swipe, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setProfiles((prev) => prev.slice(1));
      swipe.setValue({ x: 0, y: 0 });
    });
  };

  const renderProfile = () => {
    if (profiles.length === 0) {
      return <Text style={styles.noProfilesText}>No hay más perfiles disponibles</Text>;
    }

    const profile = profiles[0];

    return (
      <Animated.View
        {...swipeResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: [
              { translateX: swipe.x },
              { translateY: swipe.y },
              { rotate: swipe.x.interpolate({
                  inputRange: [-200, 0, 200],
                  outputRange: ['-10deg', '0deg', '10deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Image source={{ uri: profile.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderProfile()}
      <View style={styles.buttonsContainer}>
        <AntDesign
          name="closecircle"
          size={60}
          color="red"
          onPress={() => swipeOut('left')}
          style={styles.icon}
        />
        <AntDesign
          name="checkcircle"
          size={60}
          color="green"
          onPress={() => swipeOut('right')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '70%',
    borderRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    position: 'absolute',
    bottom: 50,
  },
  icon: {
    padding: 10,
  },
  noProfilesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default Home;
