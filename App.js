import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/module_User/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverOrdersScreen from './src/screens/module_Driver/screens/OrdersScreen';
import OrderDetailDriverScreen from './src/screens/module_Driver/screens/OrderDetailScreen';
import ReceiverDetailDriverScreen from './src/screens/module_Driver/screens/ReceiverDetailScreen';
import DriverReviewMap from './src/screens/module_Driver/screens/ReviewMap';
import VerifyOrderDriverScreen from './src/screens/module_Driver/screens/VerifyOrderScreen';
import UserOrdersScreen from './src/screens/module_User/OrdersScreen';
import OrderDetailScreen from './src/screens/module_User/OrderDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserOrderScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DriverOrders" component={DriverOrdersScreen} />
        <Stack.Screen
          name="OrderDetailDriverScreen"
          component={OrderDetailDriverScreen}
        />
        <Stack.Screen
          name="ReceiverDetailDriverScreen"
          component={ReceiverDetailDriverScreen}
        />
        <Stack.Screen name="DriverReviewMap" component={DriverReviewMap} />
        <Stack.Screen
          name="VerifyOrderDriverScreen"
          component={VerifyOrderDriverScreen}
        />
        <Stack.Screen name="UserOrderScreen" component={UserOrdersScreen} />
        <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
