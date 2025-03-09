import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, Alert, Platform } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONT } from './src/constant';
import Login from './src/screens/login';
import SplashScreen from './src/screens/splash';
import LanguageScreen from './src/screens/language';
import VerifyOtpScreen from './src/screens/verifyOTP';
import { ToastProvider } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RegisterScreen from './src/screens/Register';
import { store } from './src/Redux/store';
import { Provider, useSelector } from 'react-redux';
import { NetworkProvider } from './src/api/NetInfo';
import NavigationScreen from './src/navigation';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "1b7bbc30678cf1f7a5ac2ce9ec50bc4707148667",
  authDomain: "https://accounts.google.com/o/oauth2/auth",
  projectId: "connect-with-shivdeep",
  storageBucket: "connect-with-shivdeep.firebasestorage.app",
  messagingSenderId: "820543835149",
  appId: "1:820543835149:android:db361c819b3e1991f6d944",
};

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    requestUserPermission();
    createNotificationListeners();
  }, []);

  const requestUserPermission = async () => {
    let status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('status............', status);
  };

  const createNotificationListeners = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('remoteMessage---->', remoteMessage);
        }
      });
    messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
        Platform.OS == "android" ? remoteMessage?.notification?.android?.imageUrl : ''
      )
    });
  };


  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType="slide-in" //'slide-in | zoom-in'
        animationDuration={250}
        successColor={'#fff'}
        dangerColor={'#fff'}
        warningColor={'#fff'}
        successIcon={
          <Icon name="checkmark-done-circle" color={'green'} size={20} />
        }
        dangerIcon={<Icon name="dangerous" color={'red'} size={20} />}
        warningIcon={
          <MaterialIcons name="warning" color={'orange'} size={20} />
        }
        textStyle={{ fontSize: 16, color: '#182663', padding: 10, fontFamily: FONT.Regular, fontWeight: '400', lineHeight: 23.2 }}
        offset={50} // offset for both top and bottom toasts
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
        renderToast={toastOptions => (
          <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between', borderRadius: 15, borderColor: COLORS.Primary_2, borderWidth: 0.5, paddingRight: 10 }}>
            <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
              {
                toastOptions?.type == "waring" ? (
                  <MaterialIcons name="warning" color={'orange'} size={20} />
                ) :
                  (<Icon name="checkmark-done-circle" color={'green'} size={20} />)
              }
              <Text style={{ fontSize: 14, textAlign: 'left', color: '#182663', marginHorizontal: 10, fontFamily: FONT.Regular, marginVertical: 16, fontWeight: '400', lineHeight: 20.3 }}>
                {toastOptions.message}
              </Text>
            </View>
            <Icon name="close-outline" color={'#000'} size={20} onPress={() => toastOptions.onDestroy()} />
          </View>
        )}
      >
        <StatusBar animated={true} backgroundColor={COLORS.Primary} />
        <NetworkProvider>
          <NavigationScreen />
        </NetworkProvider>
      </ToastProvider>
    </Provider>
  );
};
export default App;