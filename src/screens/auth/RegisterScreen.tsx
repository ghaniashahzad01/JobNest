import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AppInput from '../../components/common/AppInput';
import PasswordInput from '../../components/common/PasswordInput';
import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../theme/Colors';

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema: yup.ObjectSchema<RegisterFormValues> = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .required('Full name is required.'),

  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),

  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters.')
    .required('Password is required.'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match.')
    .required('Please confirm your password.'),
});

const RegisterScreen = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormValues) => {
    if (!acceptedTerms) {
      Alert.alert(
        'Terms required',
        'Please accept the Terms of Service and Privacy Policy.',
      );
      return;
    }

    try {
      // Later: replace this with authApi.register(data).
      console.log('Register data:', data);

      Alert.alert(
        'Account ready',
        'Frontend validation is working. Backend registration will be connected here later.',
      );
    } catch {
      Alert.alert('Registration failed', 'Please try again.');
    }
  };

  const handleLogin = () => {
    Alert.alert(
      'Login',
      'Login screen navigation will be connected after all auth screens are registered.',
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.brandSection}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>JN</Text>
              </View>

              <Text style={styles.appName}>JobNest</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Create account</Text>
              <Text style={styles.subtitle}>
                Start discovering opportunities that fit your career.
              </Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="fullName"
                render={({field: {onChange, onBlur, value}}) => (
                  <AppInput
                    label="Full name"
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.fullName?.message}
                    autoCapitalize="words"
                    textContentType="name"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({field: {onChange, onBlur, value}}) => (
                  <AppInput
                    label="Email address"
                    placeholder="you@example.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Create a password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, onBlur, value}}) => (
                  <PasswordInput
                    label="Confirm password"
                    placeholder="Re-enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                  />
                )}
              />

              <Pressable
                onPress={() => setAcceptedTerms(previous => !previous)}
                style={styles.termsRow}>
                <View
                  style={[
                    styles.checkbox,
                    acceptedTerms && styles.checkboxSelected,
                  ]}>
                  {acceptedTerms ? (
                    <Text style={styles.checkmark}>✓</Text>
                  ) : null}
                </View>

                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>.
                </Text>
              </Pressable>

              <PrimaryButton
                title="Create account"
                loading={isSubmitting}
                onPress={handleSubmit(handleRegister)}
              />
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>

              <Pressable onPress={handleLogin}>
                <Text style={styles.loginLink}>Sign in</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },

  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 6,
  },

  logoText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  appName: {
    marginLeft: 11,
    color: Colors.textPrimary,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.4,
  },

  header: {
    marginTop: 42,
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 10,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },

  form: {
    marginTop: 34,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -2,
    marginBottom: 24,
  },

  checkbox: {
    width: 21,
    height: 21,
    marginTop: 1,
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },

  termsText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  termsLink: {
    color: Colors.primary,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 30,
  },

  loginText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});

export default RegisterScreen;