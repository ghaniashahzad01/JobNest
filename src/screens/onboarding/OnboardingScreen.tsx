import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../theme/Colors';
import OnboardingData from './OnboardingData';

const {width} = Dimensions.get('window');

const OnboardingScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={OnboardingData}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={[styles.slide, {width}]}>
              {/* Top Section */}
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>

              {/* Bottom Section */}
              <View style={styles.content}>
                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },

  imageContainer: {
    flex: 0.58,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: width * 0.82,
    height: width * 0.82,
  },

  content: {
    flex: 0.42,
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
  },

  description: {
    marginTop: 18,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 10,
  },
});