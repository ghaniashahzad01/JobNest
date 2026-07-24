import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import Colors from '../../theme/Colors';

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AppInput = ({label, error, ...props}: AppInputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...props}
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor={Colors.textSecondary}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 8,
    fontWeight: '600',
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
  },

  inputError: {
    borderColor: Colors.error,
  },

  error: {
    marginTop: 6,
    color: Colors.error,
    fontSize: 13,
  },
});

export default AppInput;