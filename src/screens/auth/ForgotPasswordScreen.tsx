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
import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../theme/Colors';

type ForgotPasswordFormValues = {
  email: string;
};

const forgotPasswordSchema: yup.ObjectSchema<ForgotPasswordFormValues> =
  yup.object({
    email: yup
      .string()
      .trim()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
  });

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleContinue = async (data: ForgotPasswordFormValues) => {
    try {
      // Later: replace with authApi.requestPasswordReset(data).
      console.log('Password reset email:', data.email);

      Alert.alert(
        'Check your email',
        'A password-reset code will be sent here once the backend is connected.',
      );
    } catch {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  const handleBackToLogin = () => {
    Alert.alert(
      'Back to Login',
      'Login navigation will be connected after auth routes are registered.',
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
            <Pressable
              onPress={handleBackToLogin}
              style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
              <Text style={styles.backText}>Back to sign in</Text>
            </Pressable>

            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>✉</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Forgot password?</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we will send you a verification
                code to reset your password.
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

              <PrimaryButton
                title="Send verification code"
                loading={isSubmitting}
                onPress={handleSubmit(handleContinue)}
              />
            </View>

            <View style={styles.helpCard}>
              <Text style={styles.helpTitle}>Need help?</Text>
              <Text style={styles.helpText}>
                Make sure you use the email address associated with your
                JobNest account.
              </Text>
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
    paddingTop: 22,
    paddingBottom: 32,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  backIcon: {
    color: Colors.primary,
    fontSize: 31,
    lineHeight: 26,
    marginRight: 5,
  },

  backText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },

  iconCircle: {
    width: 78,
    height: 78,
    marginTop: 58,
    borderRadius: 25,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    color: Colors.primary,
    fontSize: 33,
  },

  header: {
    marginTop: 28,
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 33,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },

  form: {
    marginTop: 38,
  },

  helpCard: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#F1F6FF',
  },

  helpTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },

  helpText: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});

export default ForgotPasswordScreen;