import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, Text, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

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