import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../theme/Colors';

interface Props {
  title: string;
  active: boolean;
}

const CategoryChip = ({
  title,
  active,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        active && styles.activeContainer,
      ]}>
      <Text
        style={[
          styles.text,
          active && styles.activeText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    paddingVertical: 12,

    backgroundColor: Colors.white,

    borderRadius: 25,

    marginRight: 12,

    elevation: 3,
  },

  activeContainer: {
    backgroundColor: Colors.primary,
  },

  text: {
    fontSize: 14,

    fontWeight: '600',

    color: Colors.textPrimary,
  },

  activeText: {
    color: Colors.white,
  },
});