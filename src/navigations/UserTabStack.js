import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CUSTOM_COLOR from "../constants/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserTabStack = createBottomTabNavigator();

export default UserTabStackScreens = () => {

    const UserProfileStack = createNativeStackNavigator();
    function UserProfileStackScreens() {
        return (
            <UserProfileStack.Navigator>

            </UserProfileStack.Navigator>
        );
    }
    const OrdersUserStack = createNativeStackNavigator();
    function OrdersUserStackScreens() {
        return (
            <OrdersUserStack.Navigator>

            </OrdersUserStack.Navigator>
        );
    }
    const HomeUserStack = createNativeStackNavigator();
    function HomeUserStackScreens() {
        return (
            <HomeUserStack.Navigator>

            </HomeUserStack.Navigator>
        );
    }

    return (
        <UserTabStack.Navigator initialRouteName="homeUser" screenOptions={{
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