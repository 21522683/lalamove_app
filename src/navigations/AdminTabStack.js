import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatiscalAdminScreen from '../screens/module_Admin/StatiscalAdminScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CUSTOM_COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComplainManagementScreen from "../screens/module_Admin/ComplainManagementScreen";
import VehicleManagementScreen from "../screens/module_Admin/VehicleManagement/VehicleManagementScreen";
import DetaiVehicleScreen from "../screens/module_Admin/VehicleManagement/DetaiVehicleScreen";
import ReviewDriverScreen from "../screens/module_Admin/ReviewDriverScreen";
import DetailReviewDriverScreen from "../screens/module_Admin/DetailReviewDriverScreen";
import DriverManageScreen from "../screens/module_Admin/DriverManageScreen";
import DetailDriverScreen from "../screens/module_Admin/DetailDriverScreen";
import ProfileDriverScreen from '../screens/module_Driver/ProfileScreen';
import ProfileAdminScreen from '../screens/module_Admin/ProfileScreen';
const AdminTabStack = createBottomTabNavigator();


const AdminStatiscalStack = createStackNavigator();
export default function AdminStatiscalStackScreens() {
  return (
    <AdminStatiscalStack.Navigator >
      <AdminStatiscalStack.Screen name="home-admin" component={AdminTabStackScreens} options={{ headerShown: false }} />
      <AdminStatiscalStack.Screen name="DetaiVehicleScreen" component={DetaiVehicleScreen} options={{ headerShown: false }} />
      <AdminStatiscalStack.Screen name="DetailReviewDriverScreen" component={DetailReviewDriverScreen} options={{ headerShown: false }} />
      <AdminStatiscalStack.Screen name="DetailDriverScreen" component={DetailDriverScreen} options={{ headerShown: false }} />

    </AdminStatiscalStack.Navigator>
  );
}



function AdminTabStackScreens() {

  return (
    <AdminTabStack.Navigator
      initialRouteName="homeAdmin"
      screenOptions={{
        tabBarActiveTintColor: CUSTOM_COLOR.Primary,
      }}>
      <AdminTabStack.Screen
        name="homeAdmin"
        component={ReviewDriverScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Xét duyệt',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <AdminTabStack.Screen
        name="ordersAdmin"
        component={ComplainManagementScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Khiếu nại',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <AdminTabStack.Screen name="statisticalAdmin" component={StatiscalAdminScreen} options={{
        headerShown: false,
        tabBarLabel:'Thống kê',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? 'home' : 'home-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      }} />
      {/* <AdminTabStack.Screen name="profileAdmin" component={AdminProfileStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} /> */}
      <AdminTabStack.Screen
        name="vehicleAdmin"
        component={VehicleManagementScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Phương tiện',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <AdminTabStack.Screen
        name="admin-profile"
        component={ProfileAdminScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Hồ sơ',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </AdminTabStack.Navigator>
  );
};
