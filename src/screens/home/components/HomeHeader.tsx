import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../theme/Colors';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Good Evening 👋
        </Text>

        <Text style={styles.name}>
          Qwill
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.notificationButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,

    marginHorizontal: 20,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  greeting: {
    fontSize: 15,

    color: Colors.textSecondary,
  },

  name: {
    marginTop: 4,

    fontSize: 28,

    fontWeight: '700',

    color: Colors.textPrimary,
  },

  notificationButton: {
    width: 52,

    height: 52,

    borderRadius: 26,

    backgroundColor: Colors.white,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 6,
  },
});