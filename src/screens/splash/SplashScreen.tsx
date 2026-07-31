import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {RootStackParamList} from '../../navigation/RootNavigator';
import Colors from '../../theme/Colors';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={['#2563EB', '#4F46E5', '#7C3AED']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topCircle} />
          <View style={styles.bottomCircle} />

          <View style={styles.content}>
            <View style={styles.logoShadow}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>JN</Text>
              </View>
            </View>

            <Text style={styles.appName}>JobNest</Text>

            <Text style={styles.tagline}>
              Find work that moves{'\n'}your career forward.
            </Text>
          </View>

          <View style={styles.loaderSection}>
            <ActivityIndicator color={Colors.white} size="small" />
            <Text style={styles.loadingText}>Preparing your opportunities</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },

  topCircle: {
    position: 'absolute',
    top: -110,
    right: -95,
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  bottomCircle: {
    position: 'absolute',
    bottom: -145,
    left: -110,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logoShadow: {
    width: 116,
    height: 116,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
  },

  logo: {
    width: 92,
    height: 92,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  logoText: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },

  appName: {
    marginTop: 27,
    color: Colors.white,
    fontSize: 39,
    fontWeight: '900',
    letterSpacing: -1,
  },

  tagline: {
    marginTop: 13,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },

  loaderSection: {
    alignItems: 'center',
    paddingBottom: 34,
  },

  loadingText: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.76)',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default SplashScreen;