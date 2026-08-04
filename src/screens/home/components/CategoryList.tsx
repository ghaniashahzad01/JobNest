import React, {useState} from 'react';

import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import CategoryChip from './CategoryChip';

import categories from '../data/categories';

const CategoryList = () => {
  const [selected, setSelected] = useState('All');

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CategoryChip
            title={item.title}
            active={selected === item.title}
          />
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,

    paddingLeft: 20,
  },
});