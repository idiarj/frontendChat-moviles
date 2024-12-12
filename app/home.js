import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import users from './data/user'; 
import { NavBar } from './components/navbar';
import { Ionicons } from '@expo/vector-icons';
import fondo from '../assets/fondoHB.png'; 
import {fetchWrapper} from '../utils/fetchWrapper.js';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const swipe = new Animated.ValueXY();

  const getInterestedIn = async () =>{
    try {
      const response = await fetchWrapper.get({
        endpoint: '/user/getInterestedIn',
      })
      const data = await response.json();
      // console.log(users)
      console.log('a',data.data)
      if(response.ok){
        setProfiles(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const setUpPosibleMatch = async () =>{
    try {
      
    } catch (error) {
      console.error(error);
      
    }
  }

  const handleLike = async ()=>{
    try {
      console.log('en el handler')
      console.log(profiles[0]._id)
      const response = await fetchWrapper.post({
        endpoint: '/user/likeUser',
        data: {
          matchId: profiles[0]._id
        }
      })
      const data = await response.json();
      console.log(data)
      if(response.ok){
        console.log('Like guardado, tienes buenos gustos! (o no)')
        swipeOut('right');
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getInterestedIn();
  }, [])

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
      return (
        <View style={styles.noProfilesContainer}>
          <Text style={styles.noProfilesText}>No hay más perfiles disponibles</Text>
        </View>
      );
    }

    const profile = profiles[0];
    console.log('profile')
    console.log(profile._id)
    console.log(profiles)

    if(!profile){
      return (
        <View style={styles.noProfilesContainer}>
          <Text style={styles.noProfilesText}>No hay más perfiles disponibles</Text>
        </View>
      );
    }

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
        {profile.image ? (
              <Image source={{ uri: profile.image }} style={styles.image} />
            ) : (
              <Ionicons name="person-outline" size={375} color="black" style={styles.image} />
        )}
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{`${profile.firstName} ${profile.lastName}`}</Text>
          <Text style={styles.bio}>{profile.description}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        {renderProfile()}
        <View style={styles.buttonsContainer}>
          <View style={styles.circleButton}>
            <AntDesign
              name="close"
              size={40}
              color="red"
              onPress={() => swipeOut('left')}
            />
          </View>
          <View style={styles.circleButton}>
            <AntDesign
              name="heart"
              size={40}
              color="green"
              onPress={handleLike}
            />
          </View>
        </View>
      </View>
      <NavBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
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
    top:'13%',
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
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
    position: 'absolute',
    bottom: 50,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top:'-20%',
  },
  noProfilesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfilesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default Home;
