import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard';
import CustomDrawerContent from '../screens/Drower';

const LoginStackNavigator = createDrawerNavigator({
  drawerContent: (props) => <CustomDrawerContent {...props} />,
  initialRouteName: 'Dashboard',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Dashboard: DashboardScreen,
  },
});

export { LoginStackNavigator };
