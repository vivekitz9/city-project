import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard';

export const LoginStackNavigator = createDrawerNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: DashboardScreen,
    // Notifications: NotificationsScreen,
  },
});

// export { LoginStackNavigator };
