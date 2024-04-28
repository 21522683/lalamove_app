import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatiscalAdminScreen from "../screens/module_Admin/StatiscalAdminScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CUSTOM_COLOR from "../constants/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
const AdminTabStack = createBottomTabNavigator();

export default AdminTabStackScreens = () => {

    const AdminProfileStack = createNativeStackNavigator();
    function AdminProfileStackScreens() {
        return (
            <AdminProfileStack.Navigator>

            </AdminProfileStack.Navigator>
        );
    }
    const AdminManageVehicleTypeStack = createNativeStackNavigator();
    function AdminManageVehicleTypeStackScreens() {
        return (
            <AdminManageVehicleTypeStack.Navigator>

            </AdminManageVehicleTypeStack.Navigator>
        );
    }

    const AdminManageReportStack = createNativeStackNavigator();
    function AdminManageReportStackScreens() {
        return (
            <AdminManageReportStack.Navigator>

            </AdminManageReportStack.Navigator>
        );
    }
    const AdminManageApproveStack = createNativeStackNavigator();
    function AdminManageApproveStackScreens() {
        return (
            <AdminManageApproveStack.Navigator>

            </AdminManageApproveStack.Navigator>
        );
    }

    return (
        <AdminTabStack.Navigator initialRouteName="homeAdmin" screenOptions={{
            tabBarActiveTintColor: CUSTOM_COLOR.Primary,
        }}>
            <AdminTabStack.Screen name="homeAdmin" component={AdminManageApproveStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <AdminTabStack.Screen name="ordersAdmin" component={AdminManageReportStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <AdminTabStack.Screen name="statisticalAdmin" component={StatiscalAdminScreen} options={{
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
            }} />
        </AdminTabStack.Navigator>
    );
}