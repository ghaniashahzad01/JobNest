import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../theme/Colors';

interface PasswordInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const PasswordInput = ({
  label,
  error,
  ...props
}: PasswordInputProps) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
        ]}>
        <TextInput
          {...props}
          style={styles.input}
          secureTextEntry={secure}
          placeholderTextColor={Colors.textSecondary}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSecure(!secure)}>
          <Icon
            name={secure ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

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
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,

    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
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

export default PasswordInput;