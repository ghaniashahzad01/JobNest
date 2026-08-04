import React from 'react';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../theme/Colors';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#94A3B8"
        />

        <TextInput
          placeholder="Search jobs..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterButton}>
        <Ionicons
          name="options-outline"
          size={22}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchContainer: {
    flex: 1,
    height: 58,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.white,

    borderRadius: 18,

    paddingHorizontal: 18,

    elevation: 5,
  },

  input: {
    flex: 1,

    marginLeft: 12,

    fontSize: 16,

    color: Colors.textPrimary,
  },

  filterButton: {
    width: 58,
    height: 58,

    marginLeft: 14,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 5,
  },
});