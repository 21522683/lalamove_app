import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CUSTOM_COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeCreateOrderScreen from '../screens/module_User/CreateOrder/WelcomeCreateOrderScreen';
import GoodsInformationScreen from '../screens/module_User/CreateOrder/GoodsInformationScreen';
import ChooseVehicleScreen from '../screens/module_User/CreateOrder/ChooseVehicleScreen';
import PrevCompletedOrderScreen from '../screens/module_User/CreateOrder/PrevCompletedOrderScreen';
import CompletedOrderScreen from '../screens/module_User/CreateOrder/CompletedOrderScreen';
import AddressManagementScreen from '../screens/module_User/AddressManagement';
import AddAddressScreen from '../screens/module_User/AddressManagement/AddAddressScreen';
import CreateAddressScreen from '../screens/module_User/AddressManagement/CreateAddressScreen';
import UserComplainManagementScreen from '../screens/module_User/UserComplainManagementScreen';
import PrivateAccountScreen from '../screens/module_User/PrivateAccountScreen';
import ProfileScreen from '../screens/module_User/ProfileScreen';
import PasswordManageScreen from '../screens/module_User/PasswordManageScreen';
import AddressManageScreen from '../screens/module_User/AddressManageScreen';
import PrivatePolicyScreen from '../screens/module_User/PrivatePolicyScreen';
import UserOrdersScreen from '../screens/module_User/OrdersScreen';
import OrderDetailScreen from '../screens/module_User/OrderDetailScreen';
import ProfileDriverScreen from '../screens/module_Driver/ProfileScreen';
import ChatUserScreen from '../screens/module_User/ChatUserScreen';
import ChooseMapScreen from '../screens/module_User/AddressManagement/ChooseMapScreen';
import ChooseMapScreen2 from '../screens/module_User/AddressManagement/ChooseMapScreen2';
import ChooseVoucherScreen from '../screens/module_User/CreateOrder/ChooseVoucherScreen';

const UserStack = createStackNavigator();
export default function UserStackScreens() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="User-Home"
        component={UserTabStackScreens}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="WelcomeCreateOrderScreen"
        component={WelcomeCreateOrderScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ChooseAddressScreen"
        component={AddressManagementScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="AddAddressScreen"
        component={AddAddressScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="CreateAddressScreen"
        component={CreateAddressScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ChooseMapScreen"
        component={ChooseMapScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ChooseMapScreen2"
        component={ChooseMapScreen2}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="GoodsInformationScreen"
        component={GoodsInformationScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ChatUserScreen"
        component={ChatUserScreen}
        options={{title: 'Chat', headerBackTitle: ''}}
      />
      <UserStack.Screen
        name="ChooseVehicleScreen"
        component={ChooseVehicleScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ChooseVoucherScreen"
        component={ChooseVoucherScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="PrevCompletedOrderScreen"
        component={PrevCompletedOrderScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="CompletedOrderScreen"
        component={CompletedOrderScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="UserComplainManagementScreen"
        component={UserComplainManagementScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="PasswordManageScreen"
        component={PasswordManageScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="AddressManageScreen"
        component={AddressManageScreen}
        options={{headerShown: false}}
      />
      <UserStack.Screen
        name="PrivatePolicyScreen"
        component={PrivatePolicyScreen}
        options={{headerShown: false}}
      />
    </UserStack.Navigator>
  );
}

const UserTabStack = createBottomTabNavigator();

function UserTabStackScreens() {
  return (
    <UserTabStack.Navigator
      initialRouteName="ordersUser"
      screenOptions={{
        tabBarActiveTintColor: CUSTOM_COLOR.Primary,
      }}>
      <UserTabStack.Screen
        name="Orders"
        component={UserOrdersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'reader' : 'reader-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <UserTabStack.Screen
        name="Home"
        component={WelcomeCreateOrderScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <UserTabStack.Screen
        name="Complain"
        component={UserComplainManagementScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'text-document' : 'text-document-inverted';
            return <Entypo name={iconName} size={size} color={color} />;
          },
        }}
      />

      <UserTabStack.Screen
        name="Profile"
        component={PrivateAccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </UserTabStack.Navigator>
  );
}
