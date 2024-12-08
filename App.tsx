import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constant';
import Login from './src/screens/login';
import SplashScreen from './src/screens/splash';
import LanguageScreen from './src/screens/language';

// import SplashScreen from 'react-native-splash-screen';
const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Login: Login,
    Splash: SplashScreen,
    Language: LanguageScreen
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.Primary} />
      <Navigation />
    </>
  );
};
export default App;