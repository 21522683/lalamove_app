import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/module_User/ProfileScreen';
import IntroScreen from './src/screens/module_General/IntroScreen';
import LoginScreen from './src/screens/module_General/LoginScreen';
import ForgotPasswordScreen from './src/screens/module_General/ForgotPasswordScreen';
import ChoosingTypeAccountScreen from './src/screens/module_General/ChoosingTypeAccountScreen';
import RegisterUserScreen from './src/screens/module_User/RegisterUserScreen';
import VerifyEmailScreen from './src/screens/module_General/VerifyEmailScreen';
import RegisterDriverScreen from './src/screens/module_Driver/RegisterDriverScreen';
import Step1Screen from './src/screens/module_Driver/RegisterDriverScreen/Step1';
import Step2Screen from './src/screens/module_Driver/RegisterDriverScreen/Step2';
import Step3Screen from './src/screens/module_Driver/RegisterDriverScreen/Step3';
import PrivateAccountScreen from './src/screens/module_User/PrivateAccountScreen';
import PrivatePolicyScreen from './src/screens/module_User/PrivatePolicyScreen';
import PasswordManageScreen from './src/screens/module_User/PasswordManageScreen';
import AddressManageScreen from './src/screens/module_User/AddressManageScreen';
import ReviewDriverScreen from './src/screens/module_Admin/ReviewDriverScreen';
import DetailReviewDriverScreen from './src/screens/module_Admin/DetailReviewDriverScreen';
import DriverManageScreen from './src/screens/module_Admin/DriverManageScreen';
import DetailDriverScreen from './src/screens/module_Admin/DetailDriverScreen';
import StatiscalAdminScreen from './src/screens/module_Admin/StatiscalAdminScreen';
import StatiscalDriverScreen from './src/screens/module_Driver/StatiscalDriverScreen';
import DriverTabStack from './src/navigations/DriverTabStack';
import UserTabStack from './src/navigations/UserTabStack';
import AdminTabStack from './src/navigations/AdminTabStack';
import AuthStackScreens from './src/navigations/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = React.useState("")
  return (
    <NavigationContainer>

      {/* <Stack.Navigator initialRouteName="Step2">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Private Account" component={PrivateAccountScreen} />
        <Stack.Screen name="Private Policy" component={PrivatePolicyScreen} />
        <Stack.Screen name="Password Manage" component={PasswordManageScreen} />
        <Stack.Screen name="Address Manage" component={AddressManageScreen} />
        <Stack.Screen name="Review driver" component={ReviewDriverScreen} />
        <Stack.Screen name="Detail review driver" component={DetailReviewDriverScreen} />
        <Stack.Screen name="Manage driver" component={DriverManageScreen} />
        <Stack.Screen name="Detail driver" component={DetailDriverScreen} />
        <Stack.Screen name="Statiscal admin" component={StatiscalAdminScreen} />
        <Stack.Screen name="Statiscal driver" component={StatiscalDriverScreen} />
      </Stack.Navigator> */}
      {
        userType === 'User' ? <UserTabStack />
          : userType === 'Driver' ? <DriverTabStack />
            : userType === 'Admin' ? <AdminTabStack />
              : <AuthStackScreens />
      }



    </NavigationContainer>
  );
}

