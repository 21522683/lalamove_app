import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/module_User/ProfileScreen';
import PrivateAccountScreen from './src/screens/module_User/PrivateAccountScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrivatePolicyScreen from './src/screens/module_User/PrivatePolicyScreen';
import PasswordManageScreen from './src/screens/module_User/PasswordManageScreen';
import AddressManageScreen from './src/screens/module_User/AddressManageScreen';
import ReviewDriverScreen from './src/screens/module_Admin/ReviewDriverScreen';
import DetailReviewDriverScreen from './src/screens/module_Admin/DetailReviewDriverScreen';
import DriverManageScreen from './src/screens/module_Admin/DriverManageScreen';
import DetailDriverScreen from './src/screens/module_Admin/DetailDriverScreen';
import StatiscalAdminScreen from './src/screens/module_Admin/StatiscalAdminScreen';
import StatiscalDriverScreen from './src/screens/module_Driver/StatiscalDriverScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Statiscal driver" screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

