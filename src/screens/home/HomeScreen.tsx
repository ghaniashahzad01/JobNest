import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Colors from '../../theme/Colors';

import HomeHeader from './components/HomeHeader';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',
  },
});