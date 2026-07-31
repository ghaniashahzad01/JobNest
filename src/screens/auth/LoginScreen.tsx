import React from 'react';
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

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema: yup.ObjectSchema<LoginFormValues> = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters.')
    .required('Password is required.'),
});

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormValues) => {
    try {
      // Later: replace this with authApi.login(data).
      console.log('Login data:', data);

      Alert.alert(
        'Login ready',
        'Frontend validation is working. Backend API will be connected here later.',
      );
    } catch {
      Alert.alert('Login failed', 'Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      `${provider} login`,
      'This is a frontend placeholder. Social authentication will be connected later.',
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Forgot Password screen navigation will be connected next.',
    );
  };

  const handleRegister = () => {
    Alert.alert(
      'Create Account',
      'Register screen navigation will be connected next.',
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
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Sign in to explore opportunities made for you.
              </Text>
            </View>

            <View style={styles.form}>
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
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                  />
                )}
              />

              <Pressable
                onPress={handleForgotPassword}
                style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </Pressable>

              <PrimaryButton
                title="Sign in"
                loading={isSubmitting}
                onPress={handleSubmit(handleLogin)}
              />
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtons}>
              <Pressable
                onPress={() => handleSocialLogin('Google')}
                style={styles.socialButton}>
                <View style={[styles.socialBadge, styles.googleBadge]}>
                  <Text style={styles.googleText}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Google</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSocialLogin('Apple')}
                style={styles.socialButton}>
                <View style={[styles.socialBadge, styles.appleBadge]}>
                  <Text style={styles.appleText}>●</Text>
                </View>
                <Text style={styles.socialButtonText}>Apple</Text>
              </Pressable>
            </View>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>New to JobNest? </Text>
              <Pressable onPress={handleRegister}>
                <Text style={styles.registerLink}>Create an account</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 48,
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
    marginTop: 38,
  },

  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -6,
    marginBottom: 26,
  },

  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 31,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  dividerText: {
    marginHorizontal: 12,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  socialButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },

  socialButton: {
    flex: 1,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },

  socialBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  googleBadge: {
    backgroundColor: '#F1F5F9',
  },

  googleText: {
    color: '#4285F4',
    fontSize: 15,
    fontWeight: '800',
  },

  appleBadge: {
    backgroundColor: Colors.textPrimary,
  },

  appleText: {
    color: Colors.white,
    fontSize: 10,
  },

  socialButtonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 31,
  },

  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  registerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});

export default LoginScreen;