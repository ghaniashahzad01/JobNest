import {ImageSourcePropType} from 'react-native';

export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const OnboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Discover Your Dream Job',
    description:
      'Browse thousands of opportunities from leading companies and find the perfect role for your career.',
    image: require('../../assets/images/onboarding/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Apply With One Tap',
    description:
      'Create your profile once and apply to jobs instantly without filling the same details repeatedly.',
    image: require('../../assets/images/onboarding/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Track Every Application',
    description:
      'Monitor your applications, interview invitations, and hiring progress in one place.',
    image: require('../../assets/images/onboarding/onboarding3.png'),
  },
];

export default OnboardingData;