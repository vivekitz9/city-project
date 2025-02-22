import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../screens/Drower';
import { MyTabs } from './TabBar';
import Login from '../screens/login';
import SplashScreen from '../screens/splash';
import LanguageScreen from '../screens/language';
import VerifyOtpScreen from '../screens/verifyOTP';
import RegisterScreen from '../screens/Register';
import NewsScreen from '../screens/News';
import EventsScreen from '../screens/Events';
import GalleryScreen from '../screens/Gallery';
import BlogsScreen from '../screens/Blogs';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import TermConditionScreen from '../screens/TermCondition';
import ConnectScreen from '../screens/Connect';
import MemberShipCardScreen from '../screens/MemberShipCard';
import MemberScreen from '../screens/member';
import MissionVisionScreen from '../screens/MissionVision';
import ProfileScreen from '../screens/Profile';
import HelpCenterScreen from '../screens/HelpCenter';

const MemberStack = createNativeStackNavigator({
  initialRouteName: 'Member',
  screenOptions: {
      headerShown: false,
  },
  screens: {
      Member: MemberScreen,
      MemberCard: MemberShipCardScreen,
  },
});


const LoginStackNavigator = createDrawerNavigator({
  drawerContent: (props) => <CustomDrawerContent {...props} />,
  initialRouteName: 'HelpCenter',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Dashboard: MyTabs,
    Gallery: GalleryScreen,
    Blogs: BlogsScreen,
    News: NewsScreen,
    Events: EventsScreen,
    PrivacyPolicy: PrivacyPolicyScreen,
    TermCondition: TermConditionScreen,
    Connect: ConnectScreen,
    Member: MemberStack,
    MissionVision: MissionVisionScreen,
    Profile: ProfileScreen,
    HelpCenter: HelpCenterScreen
  },
});

const MainStackNavigator = createNativeStackNavigator({
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
    News: NewsScreen,
    Events: EventsScreen,
    Dashboard: LoginStackNavigator,
  },
});

const NavigationScreen = () => {
  const Navigation = createStaticNavigation(MainStackNavigator)
  return (
    <Navigation />
  )
}
export default NavigationScreen;