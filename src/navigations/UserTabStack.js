import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CUSTOM_COLOR from "../constants/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeCreateOrderScreen from "../screens/module_User/CreateOrder/WelcomeCreateOrderScreen";
import GoodsInformationScreen from "../screens/module_User/CreateOrder/GoodsInformationScreen";
import ChooseVehicleScreen from "../screens/module_User/CreateOrder/ChooseVehicleScreen";
import PrevCompletedOrderScreen from "../screens/module_User/CreateOrder/PrevCompletedOrderScreen";
import CompletedOrderScreen from "../screens/module_User/CreateOrder/CompletedOrderScreen";
import AddressManagementScreen from "../screens/module_User/AddressManagement";
import AddAddressScreen from "../screens/module_User/AddressManagement/AddAddressScreen";
import CreateAddressScreen from "../screens/module_User/AddressManagement/CreateAddressScreen";
import UserComplainManagementScreen from "../screens/module_User/UserComplainManagementScreen";

const UserTabStack = createBottomTabNavigator();

export default UserTabStackScreens = () => {

    const UserProfileStack = createStackNavigator();
    function UserProfileStackScreens() {
        return (
            <UserProfileStack.Navigator initialRouteName="UserAddressManagementScreen">
                <UserProfileStack.Screen name="UserAddressManagementScreen" component={AddressManagementScreen} options={{headerShown: false}}/>
                <UserProfileStack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{headerShown: false}}/>
                <UserProfileStack.Screen name="CreateAddressScreen" component={CreateAddressScreen} options={{headerShown: false}}/>
            </UserProfileStack.Navigator>
        );
    }
    const OrdersUserStack = createStackNavigator();
    function OrdersUserStackScreens() {
        return (
            <OrdersUserStack.Navigator initialRouteName="WelcomeCreateOrderScreen">
                <OrdersUserStack.Screen name="WelcomeCreateOrderScreen" component={WelcomeCreateOrderScreen} options={{headerShown: false}}/>
                <OrdersUserStack.Screen name="GoodsInformationScreen" component={GoodsInformationScreen} options={{headerShown: false}}/>
                <OrdersUserStack.Screen name="ChooseVehicleScreen" component={ChooseVehicleScreen} options={{headerShown: false}}/>
                <OrdersUserStack.Screen name="PrevCompletedOrderScreen" component={PrevCompletedOrderScreen} options={{headerShown: false}}/>
                <OrdersUserStack.Screen name="CompletedOrderScreen" component={CompletedOrderScreen} options={{headerShown: false}}/>
                
                <OrdersUserStack.Screen name="UserComplainManagementScreen" component={UserComplainManagementScreen} options={{headerShown: false}}/>
 


                
            </OrdersUserStack.Navigator>
        );
    }


   

    const HomeUserStack = createStackNavigator();
    function HomeUserStackScreens() {
        return (
            <HomeUserStack.Navigator>
                
            </HomeUserStack.Navigator>
        );
    }

    return (
        <UserTabStack.Navigator initialRouteName="ordersUser" screenOptions={{
            tabBarActiveTintColor: CUSTOM_COLOR.Primary,
        }}>
            <UserTabStack.Screen name="homeUser" component={HomeUserStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <UserTabStack.Screen name="ordersUser" component={OrdersUserStackScreens}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = focused ? 'home' : 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                }} />
 
            <UserTabStack.Screen name="profileUser" component={UserProfileStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
        </UserTabStack.Navigator>
    );
}