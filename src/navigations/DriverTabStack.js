import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatiscalDriverScreen from "../screens/module_Driver/StatiscalDriverScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1Screen from "../screens/module_Driver/RegisterDriverScreen/Step1";
import Step2Screen from "../screens/module_Driver/RegisterDriverScreen/Step2";
import CUSTOM_COLOR from "../constants/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
const DriverTabStack = createBottomTabNavigator();

export default DriverTabStackScreens = () => {

    const DriverProfileStack = createNativeStackNavigator();
    function DriverProfileStackScreens() {
        return (
            <DriverProfileStack.Navigator>
                <DriverProfileStack.Screen name="Step1" component={Step1Screen} options={{ headerTitle: '' }} />
                <DriverProfileStack.Screen name="Step2" component={Step2Screen} options={{ headerTitle: '' }} />
            </DriverProfileStack.Navigator>
        );
    }
    const OrdersDriverStack = createNativeStackNavigator();
    function OrdersDriverStackScreens() {
        return (
            <OrdersDriverStack.Navigator initialRouteName="Step1">
                <OrdersDriverStack.Screen name="Step1" component={Step1Screen} options={{ headerTitle: '' }} />
                <OrdersDriverStack.Screen name="Step2" component={Step2Screen} options={{ headerTitle: '' }} />
            </OrdersDriverStack.Navigator>
        );
    }
    const HomeDriverStack = createNativeStackNavigator();
    function HomeDriverStackScreens() {
        return (
            <HomeDriverStack.Navigator>
                <HomeDriverStack.Screen name="Step1" component={Step1Screen} options={{ headerTitle: '' }} />
                <HomeDriverStack.Screen name="Step2" component={Step2Screen} options={{ headerTitle: '' }} />
            </HomeDriverStack.Navigator>
        );
    }

    return (
        <DriverTabStack.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: CUSTOM_COLOR.Primary,
        }}>
            <DriverTabStack.Screen name="Home" component={HomeDriverStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <DriverTabStack.Screen name="Order" component={OrdersDriverStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'list' : 'list-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <DriverTabStack.Screen name="Statistical" component={StatiscalDriverScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
            <DriverTabStack.Screen name="Profile" component={DriverProfileStackScreens} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            }} />
        </DriverTabStack.Navigator>
    );
}