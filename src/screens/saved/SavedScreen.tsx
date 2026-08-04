import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SavedScreen= () => {
  return (
    <View style={styles.container}>
      <Text>Saved Screen</Text>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },
});