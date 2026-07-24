import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../theme/Colors';

import AppInput from '../../components/common/AppInput';
import PasswordInput from '../../components/common/PasswordInput';
import PrimaryButton from '../../components/common/PrimaryButton';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <Text style={styles.subtitle}>
          Sign in to continue using JobNest
        </Text>

        <View style={{height: 40}} />

        <AppInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
        />

        <View style={{height: 10}} />

        <PrimaryButton
          title="Login"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default LoginScreen;