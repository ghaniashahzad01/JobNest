import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../theme/Colors';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const OTPScreen = () => {
  const [otp, setOtp] = useState<string[]>(
    Array.from({length: OTP_LENGTH}, () => ''),
  );
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(previous => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleOtpChange = (value: string, index: number) => {
    const cleanValue = value.replace(/[^0-9]/g, '');

    if (cleanValue.length > 1) {
      const pastedValues = cleanValue.slice(0, OTP_LENGTH).split('');
      const updatedOtp = Array.from({length: OTP_LENGTH}, (_, otpIndex) => {
        return pastedValues[otpIndex] ?? '';
      });

      setOtp(updatedOtp);

      const nextIndex = Math.min(pastedValues.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = cleanValue;
    setOtp(updatedOtp);

    if (cleanValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = otp.join('');

    if (verificationCode.length !== OTP_LENGTH) {
      Alert.alert(
        'Incomplete code',
        'Please enter the complete 6-digit verification code.',
      );
      return;
    }

    try {
      setLoading(true);

      // Later: replace with authApi.verifyOtp({code: verificationCode}).
      console.log('OTP code:', verificationCode);

      Alert.alert(
        'Code verified',
        'OTP verification is ready. Password reset will be connected next.',
      );
    } catch {
      Alert.alert('Verification failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (secondsRemaining > 0) {
      return;
    }

    setOtp(Array.from({length: OTP_LENGTH}, () => ''));
    setSecondsRemaining(RESEND_SECONDS);
    inputRefs.current[0]?.focus();

    Alert.alert(
      'Code resent',
      'A new verification code will be sent after backend integration.',
    );
  };

  const handleBack = () => {
    Alert.alert(
      'Back',
      'Forgot Password navigation will be connected after routes are registered.',
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
            <Pressable onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
              <Text style={styles.backText}>Back</Text>
            </Pressable>

            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>#</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Verify your email</Text>

              <Text style={styles.subtitle}>
                We sent a 6-digit code to{'\n'}
                <Text style={styles.emailText}>you@example.com</Text>
              </Text>
            </View>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={reference => {
                    inputRefs.current[index] = reference;
                  }}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null,
                  ]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={OTP_LENGTH}
                  selectTextOnFocus
                  textAlign="center"
                  accessibilityLabel={`Verification code digit ${index + 1}`}
                />
              ))}
            </View>

            <PrimaryButton
              title="Verify code"
              loading={loading}
              onPress={handleVerify}
            />

            <View style={styles.resendSection}>
              <Text style={styles.resendQuestion}>Didn't receive a code?</Text>

              {secondsRemaining > 0 ? (
                <Text style={styles.timerText}>
                  Resend available in 00:
                  {String(secondsRemaining).padStart(2, '0')}
                </Text>
              ) : (
                <Pressable onPress={handleResend}>
                  <Text style={styles.resendText}>Resend code</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.securityNote}>
              <Text style={styles.securityIcon}>⌁</Text>
              <Text style={styles.securityText}>
                For your security, never share this verification code with
                anyone.
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    color: Colors.primary,
    fontSize: 31,
    fontWeight: '800',
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

  emailText: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 42,
    marginBottom: 32,
  },

  otpInput: {
    width: 47,
    height: 58,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 15,
    backgroundColor: Colors.white,
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },

  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: '#F4F8FF',
  },

  resendSection: {
    alignItems: 'center',
    marginTop: 27,
  },

  resendQuestion: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  timerText: {
    marginTop: 8,
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },

  resendText: {
    marginTop: 8,
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },

  securityNote: {
    flexDirection: 'row',
    marginTop: 42,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F1F6FF',
  },

  securityIcon: {
    marginRight: 10,
    color: Colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },

  securityText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});

export default OTPScreen;