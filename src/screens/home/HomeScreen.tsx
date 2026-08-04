import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Colors from '../../theme/Colors';

import HomeHeader from './components/HomeHeader';
import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <SearchBar />
      <CategoryList />
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