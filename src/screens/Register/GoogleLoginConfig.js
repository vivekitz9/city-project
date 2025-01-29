import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  // webClientId: "855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com",
  androidClientId:
    '855427964750-fh3k8drvc8urfgov7ganig08jblhh5kg.apps.googleusercontent.com',
  // iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const GoogleLoginConfig = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
export default GoogleLoginConfig;
