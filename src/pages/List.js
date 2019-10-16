import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, Text, Image, Alert } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const allowedOrigins = "//192.168.15.20:19000";
      const socket = socketio('http://192.168.15.20:3333', {
        query: {'user_id': user_id},
        origins: allowedOrigins,
        transports: ['websocket', 'polling', 'flashsocket']
      })
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      // trim remove espaço antes e depois
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  },[]);
  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  },
});