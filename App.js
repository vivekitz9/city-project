import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './src/constant';
import Login from './src/screens/login';
import SplashScreen from './src/screens/splash';
import LanguageScreen from './src/screens/language';
import VerifyOtpScreen from './src/screens/verifyOTP';
import {ToastProvider} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import RegisterScreen from './src/screens/signUp';
import DashboardScreen from './src/screens/Dashboard';
import RegisterScreen from './src/screens/Register';
import {store} from './src/Redux/store';
import {Provider} from 'react-redux';
import MemberScreen from './src/screens/member';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login: Login,
    VerifyOtp: VerifyOtpScreen,
    Splash: SplashScreen,
    Language: LanguageScreen,
    Register: RegisterScreen,
    Member: MemberScreen,
    Dashboard: DashboardScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  const [IsLogin, setIsLogin] = useState(true);

  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType="slide-in" //'slide-in | zoom-in'
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray"
        // icon={<Icon name="checkmark-done-circle" color={"green"} size={20} />}
        successIcon={
          <Icon name="checkmark-done-circle" color={'green'} size={20} />
        }
        dangerIcon={<Icon name="dangerous" color={'red'} size={20} />}
        warningIcon={
          <MaterialIcons name="warning" color={'orange'} size={20} />
        }
        textStyle={{fontSize: 20}}
        offset={50} // offset for both top and bottom toasts
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
        renderType={{
          custom_type: toast => (
            <View style={{padding: 15, backgroundColor: 'grey'}}>
              <Text>{toast.message}</Text>
            </View>
          ),
        }}>
        <StatusBar animated={true} backgroundColor={COLORS.Primary} />
        <Navigation />
      </ToastProvider>
    </Provider>
  );
};
export default App;
