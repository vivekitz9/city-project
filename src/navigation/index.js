import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard';
import CustomDrawerContent from '../screens/Drower';
import MemberScreen from '../screens/member';
import {MyTabs} from './tab';
import MemberShipCardScreen from '../screens/MemberShipCard';

const LoginStackNavigator = createDrawerNavigator({
  drawerContent: props => <CustomDrawerContent {...props} />,
  initialRouteName: 'Dashboard',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Dashboard: MyTabs,
    // Member: MemberScreen
    // MemberShipCard: MemberShipCardScreen,
  },
});

export {LoginStackNavigator};
