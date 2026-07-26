import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Colors from '../../theme/Colors';
import OnboardingData, {OnboardingItem} from './OnboardingData';

type OnboardingNavigationParamList = {
  Login: undefined;
};

const OnboardingScreen = () => {
  const {width} = useWindowDimensions();
  const navigation =
    useNavigation<NavigationProp<OnboardingNavigationParamList>>();

  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastSlide = currentIndex === OnboardingData.length - 1;

  const goToLogin = () => {
    // Later, save onboarding completion in AsyncStorage/Redux Persist here.
    navigation.navigate('Login');
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / width,
    );

    setCurrentIndex(nextIndex);
  };

  const handleNext = () => {
    if (isLastSlide) {
      goToLogin();
      return;
    }

    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <View style={styles.container}>
        <View style={styles.topGlow} />
        <View style={styles.bottomGlow} />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.skipButton}
          onPress={goToLogin}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Animated.FlatList
          ref={flatListRef}
          data={OnboardingData}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const imageScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.82, 1, 0.82],
              extrapolate: 'clamp',
            });

            const imageOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.25, 1, 0.25],
              extrapolate: 'clamp',
            });

            const contentTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [24, 0, -24],
              extrapolate: 'clamp',
            });

            const contentOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <View style={[styles.slide, {width}]}>
                <Animated.View
                  style={[
                    styles.illustrationContainer,
                    {
                      opacity: imageOpacity,
                      transform: [{scale: imageScale}],
                    },
                  ]}>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={[
                      styles.illustration,
                      {
                        width: width * 0.82,
                        height: width * 0.82,
                      },
                    ]}
                  />
                </Animated.View>

                <Animated.View
                  style={[
                    styles.content,
                    {
                      opacity: contentOpacity,
                      transform: [{translateY: contentTranslateY}],
                    },
                  ]}>
                  <Text style={styles.title}>{item.title}</Text>

                  <Text style={styles.description}>
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            );
          }}
        />

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {OnboardingData.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [9, 28, 9],
                extrapolate: 'clamp',
              });

              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      width: dotWidth,
                      opacity: dotOpacity,
                      backgroundColor:
                        currentIndex === index
                          ? Colors.primary
                          : '#CBD5E1',
                    },
                  ]}
                />
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.nextButton}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLastSlide ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },

  topGlow: {
    position: 'absolute',
    top: -110,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#DBEAFE',
    opacity: 0.6,
  },

  bottomGlow: {
    position: 'absolute',
    bottom: 80,
    left: -140,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#EDE9FE',
    opacity: 0.65,
  },

  skipButton: {
    position: 'absolute',
    top: 18,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  skipText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  slide: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 52,
    paddingBottom: 175,
    justifyContent: 'space-between',
  },

  illustrationContainer: {
    flex: 0.62,
    alignItems: 'center',
    justifyContent: 'center',
  },

  illustration: {
    maxWidth: 360,
    maxHeight: 360,
  },

  content: {
    flex: 0.38,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    maxWidth: 340,
    color: Colors.textPrimary,
    fontSize: 33,
    fontWeight: '800',
    lineHeight: 41,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  description: {
    maxWidth: 325,
    marginTop: 17,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },

  footer: {
    position: 'absolute',
    right: 24,
    bottom: 26,
    left: 24,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    marginBottom: 24,
  },

  dot: {
    height: 9,
    borderRadius: 99,
    marginHorizontal: 4,
  },

  nextButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  nextButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});