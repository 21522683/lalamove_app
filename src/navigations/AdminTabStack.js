import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatiscalAdminScreen from '../screens/module_Admin/StatiscalAdminScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CUSTOM_COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComplainManagementScreen from '../screens/module_Admin/ComplainManagementScreen';
import VehicleManagementScreen from '../screens/module_Admin/VehicleManagement/VehicleManagementScreen';
import DetaiVehicleScreen from '../screens/module_Admin/VehicleManagement/DetaiVehicleScreen';
const AdminTabStack = createBottomTabNavigator();

export default AdminTabStackScreens = () => {
  const AdminProfileStack = createStackNavigator();
  function AdminProfileStackScreens() {
    return <AdminProfileStack.Navigator></AdminProfileStack.Navigator>;
  }
  const AdminManageVehicleTypeStack = createStackNavigator();
  function AdminManageVehicleTypeStackScreens() {
    return (
      <AdminManageVehicleTypeStack.Navigator initialRouteName="VehicleManagementScreen">
        <AdminManageVehicleTypeStack.Screen
          name="VehicleManagementScreen"
          component={VehicleManagementScreen}
          options={{headerShown: false}}
        />
        <AdminManageVehicleTypeStack.Screen
          name="DetaiVehicleScreen"
          component={DetaiVehicleScreen}
          options={{headerShown: false}}
        />
      </AdminManageVehicleTypeStack.Navigator>
    );
  }

  const AdminManageReportStack = createStackNavigator();
  function AdminManageReportStackScreens() {
    return (
      <AdminManageReportStack.Navigator initialRouteName="AdminComplainManagementScreen">
        <AdminManageReportStack.Screen
          name="AdminComplainManagementScreen"
          component={ComplainManagementScreen}
          options={{headerShown: false}}
        />
      </AdminManageReportStack.Navigator>
    );
  }
  const AdminManageApproveStack = createStackNavigator();
  function AdminManageApproveStackScreens() {
    return (
      <AdminManageApproveStack.Navigator></AdminManageApproveStack.Navigator>
    );
  }

  return (
    <AdminTabStack.Navigator
      initialRouteName="reportAdmin"
      screenOptions={{
        tabBarActiveTintColor: CUSTOM_COLOR.Primary,
      }}>
      <AdminTabStack.Screen
        name="homeAdmin"
        component={AdminManageApproveStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <AdminTabStack.Screen
        name="ordersAdmin"
        component={AdminManageReportStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      {/* <AdminTabStack.Screen name="statisticalAdmin" component={StatiscalAdminScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <AdminTabStack.Screen name="profileAdmin" component={AdminProfileStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} /> */}
      <AdminTabStack.Screen
        name="vehicleAdmin"
        component={AdminManageVehicleTypeStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <AdminTabStack.Screen
        name="reportAdmin"
        component={AdminManageReportStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </AdminTabStack.Navigator>
  );
};
