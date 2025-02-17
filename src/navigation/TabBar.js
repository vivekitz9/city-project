import { View, Platform, Image } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONT, FONTS_SIZE } from '../constant';
import { HomeIcon, MemberIcon, NewsIcon, ConnectIcon, EventsIcon } from '../assets/icons';
import MemberScreen from '../screens/member';
import DashboardScreen from '../screens/Dashboard';
import NewsScreen from '../screens/News';
import EventsScreen from '../screens/Events';
import ConnectScreen from '../screens/Connect';
import GalleryScreen from '../screens/Gallery';
import BlogsScreen from '../screens/Blogs';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import TermConditionScreen from '../screens/TermCondition';
import MemberShipCardScreen from '../screens/MemberShipCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MyTabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={{ flexDirection: 'row', backgroundColor: COLORS.Primary_2, height: 60, paddingHorizontal: 10 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ width: 70, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? "#55471F" : COLORS.Primary_2, marginHorizontal: 2 }}
                    >
                        <View style={{ width: 70, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ borderRadius: 35 / 2, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
                                {label == "Home" &&
                                    <Image source={HomeIcon} style={{ width: 20, height: 20 }} />
                                }
                                {label == "Member" &&
                                    <Image source={MemberIcon} style={{ width: 20, height: 20 }} />
                                }
                                {label == "News" &&
                                    <Image source={NewsIcon} style={{ width: 20, height: 20 }} />
                                }
                                {label == "Connect" &&
                                    <Image source={ConnectIcon} style={{ width: 20, height: 20 }} />
                                }
                                {label == "Events" &&
                                    <Image source={EventsIcon} style={{ width: 20, height: 20 }} />
                                }
                            </View>
                            <Text style={{ color: COLORS.white, fontSize: FONTS_SIZE.smaller, paddingTop: 2, fontFamily: FONT.MediumRoboto, textTransform: 'uppercase' }}>{label}</Text>
                        </View>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const HomeStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: DashboardScreen,
        Gallery: GalleryScreen,
        Blogs: BlogsScreen,
        PrivacyPolicy: PrivacyPolicyScreen,
        TermCondition: TermConditionScreen,
    },
});

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

const Newstack = createNativeStackNavigator({
    initialRouteName: 'News',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        News: NewsScreen,
    },
});

const Eventstack = createNativeStackNavigator({
    initialRouteName: 'Events',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Events: ConnectScreen,
    },
});

const Connecttack = createNativeStackNavigator({
    initialRouteName: 'Events',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Connect: EventsScreen,
    },
});

export const MyTabs = createBottomTabNavigator({
    tabBar: (props) => <MyTabBar {...props} />,
    initialRouteName: 'Home',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: HomeStack,
        News: Newstack,
        Member: MemberStack,
        Events: Eventstack,
        Connect: Connecttack,
    },
});