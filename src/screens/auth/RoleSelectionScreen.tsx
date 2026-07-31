import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../../components/common/PrimaryButton';
import Colors from '../../theme/Colors';

type UserRole = 'jobSeeker' | 'employer';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('jobSeeker');

  const handleContinue = () => {
    // Later: save the role in Redux, then navigate to Login/Register.
    Alert.alert(
      'Role selected',
      selectedRole === 'jobSeeker'
        ? 'You selected Job Seeker.'
        : 'You selected Employer.',
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>JN</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>How will you use JobNest?</Text>
            <Text style={styles.subtitle}>
              Select your role to personalize your experience.
            </Text>
          </View>

          <View style={styles.options}>
            <Pressable
              onPress={() => setSelectedRole('jobSeeker')}
              style={[
                styles.roleCard,
                selectedRole === 'jobSeeker' && styles.roleCardSelected,
              ]}>
              <View
                style={[
                  styles.iconCircle,
                  selectedRole === 'jobSeeker' && styles.iconCircleSelected,
                ]}>
                <Text style={styles.roleIcon}>⌕</Text>
              </View>

              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>I am looking for a job</Text>
                <Text style={styles.roleDescription}>
                  Find roles, save opportunities, and track your applications.
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  selectedRole === 'jobSeeker' && styles.radioSelected,
                ]}>
                {selectedRole === 'jobSeeker' ? (
                  <View style={styles.radioDot} />
                ) : null}
              </View>
            </Pressable>

            <Pressable
              onPress={() => setSelectedRole('employer')}
              style={[
                styles.roleCard,
                selectedRole === 'employer' && styles.roleCardSelected,
              ]}>
              <View
                style={[
                  styles.iconCircle,
                  selectedRole === 'employer' && styles.iconCircleSelected,
                ]}>
                <Text style={styles.roleIcon}>▣</Text>
              </View>

              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>I am hiring talent</Text>
                <Text style={styles.roleDescription}>
                  Post jobs, manage listings, and review candidate profiles.
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  selectedRole === 'employer' && styles.radioSelected,
                ]}>
                {selectedRole === 'employer' ? (
                  <View style={styles.radioDot} />
                ) : null}
              </View>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>You can change this later</Text>
            <Text style={styles.infoText}>
              Your role only helps JobNest show the most relevant features
              first.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton title="Continue" onPress={handleContinue} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 32,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.24,
    shadowRadius: 11,
    elevation: 6,
  },

  logoText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  header: {
    marginTop: 40,
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 33,
    lineHeight: 41,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 11,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },

  options: {
    marginTop: 38,
    gap: 16,
  },

  roleCard: {
    minHeight: 146,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 22,
    backgroundColor: Colors.white,
  },

  roleCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F5F9FF',
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF4FF',
  },

  iconCircleSelected: {
    backgroundColor: '#DCEBFF',
  },

  roleIcon: {
    color: Colors.primary,
    fontSize: 26,
    fontWeight: '800',
  },

  roleContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  roleTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },

  roleDescription: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: Colors.primary,
  },

  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },

  infoCard: {
    marginTop: 24,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#F1F6FF',
  },

  infoTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },

  infoText: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 34,
  },
});

export default RoleSelectionScreen;