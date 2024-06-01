import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatiscalDriverScreen from '../screens/module_Driver/StatiscalDriverScreen';
import Step1Screen from '../screens/module_Driver/RegisterDriverScreen/Step1';
import Step2Screen from '../screens/module_Driver/RegisterDriverScreen/Step2';
import CUSTOM_COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileDriverScreen from '../screens/module_Driver/ProfileScreen';
import PrivatePolicyScreen from '../screens/module_User/PrivatePolicyScreen';
import DetailDriverScreen from '../screens/module_Admin/DetailDriverScreen';
import DriverInformationScreen from '../screens/module_Driver/ProfileScreen/DriverInformationScreen';
import LisenceDriverManageScreen from '../screens/module_Driver/ProfileScreen/LisenceDriverManageScreen';
import LicenseDriverInforScreen from '../screens/module_Driver/ProfileScreen/LisenceDriverManageScreen/LicenseDriverInforScreen';
import LicenseDriverForm from '../screens/module_Driver/ProfileScreen/LisenceDriverManageScreen/LicenseDriverForm';
import VehicleManageScreen from '../screens/module_Driver/ProfileScreen/VehicleManageScreen';
import VehicleDriverInforScreen from '../screens/module_Driver/ProfileScreen/VehicleManageScreen/VehicleDriverInforScreen';
import VehicleDriverForm from '../screens/module_Driver/ProfileScreen/VehicleManageScreen/VehicleDriverForm';
import DriverOrdersScreen from '../screens/module_Driver/screens/OrdersScreen';
import OrderDetailDriverScreen from '../screens/module_Driver/screens/OrderDetailScreen';
import ReceiverDetailDriverScreen from '../screens/module_Driver/screens/ReceiverDetailScreen';
import DriverReviewMap from '../screens/module_Driver/screens/ReviewMap';
import VerifyOrderDriverScreen from '../screens/module_Driver/screens/VerifyOrderScreen';
import { Polygon } from 'react-native-svg';
import ReceivedDriverOrderDetailScreen from '../screens/module_Driver/OrderDetailScreen';
import DriverReceivedOrdersScreen from '../screens/module_Driver/ReceivedOrdersScreen';
import ChatDriverScreen from '../screens/module_Driver/ChatDriverScreen';
const DriverTabStack = createBottomTabNavigator();


const DriverStack = createStackNavigator();
export default function DriverStackScreens() {
  return (
    <DriverStack.Navigator>

      <DriverStack.Screen
        name="application-driver"
        component={DriverTabStackScreens}
        options={{ headerTitle: '' , headerShown: false}}
      />
      <DriverStack.Screen
        name="infor-driver"
        component={DriverInformationScreen}
        options={{ headerTitle: 'Thông tin tài xế', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="policy"
        component={PrivatePolicyScreen}
        options={{ headerTitle: 'Chính sách tài xế', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="license-driver"
        component={LisenceDriverManageScreen}
        options={{ headerTitle: 'Bằng lái tài xế', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="license-driver-infor"
        component={LicenseDriverInforScreen}
        options={{ headerTitle: 'Thông tin bằng lái', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="license-driver-form"
        component={LicenseDriverForm}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: '',
        })}
      />
      <DriverStack.Screen
        name="vehicle-driver"
        component={VehicleManageScreen}
        options={{ headerTitle: 'Phương tiện', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="vehicle-driver-infor"
        component={VehicleDriverInforScreen}
        options={{ headerTitle: 'Thông tin phương tiện', headerBackTitle: '' }}
      />
      <DriverStack.Screen
        name="vehicle-driver-form"
        component={VehicleDriverForm}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: '',
        })}
      />

      <DriverStack.Screen
        name="DriverOrderScreen"
        component={DriverOrdersScreen}
        options={{ headerShown: false }}
      />
      <DriverStack.Screen
        name="OrderDetailDriverScreen"
        component={OrderDetailDriverScreen}
        options={{ headerShown: false }}
      />
      <DriverStack.Screen
        name="ChatDriverScreen"
        component={ChatDriverScreen}
        options={{title:'Chat', headerBackTitle:''}}
      />
      <DriverStack.Screen
        name="ReceiverDetailDriverScreen"
        component={ReceiverDetailDriverScreen}
        options={{ headerShown: false }}
      />
      <DriverStack.Screen
        name="DriverReviewMap"
        component={DriverReviewMap}
        options={{ headerShown: false }}
      />
      <DriverStack.Screen
        name="VerifyOrderDriverScreen"
        component={VerifyOrderDriverScreen}
        options={{ headerShown: false }}
      />
       <DriverStack.Screen
        name="ReceivedDriverOrderDetailScreen"
        component={ReceivedDriverOrderDetailScreen}
        options={{ headerShown: false }}
      />
    </DriverStack.Navigator>
  );
}

function DriverTabStackScreens() {
  return (
    <DriverTabStack.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: CUSTOM_COLOR.Primary,
      }}>
      <DriverTabStack.Screen
        name="Orders"
        component={DriverOrdersScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Nhận đơn',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'download' : 'download-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <DriverTabStack.Screen
        name="Order"
        component={DriverReceivedOrdersScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Đơn hàng',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'reader' : 'reader-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <DriverTabStack.Screen
        name="Statistical"
        component={StatiscalDriverScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Thống kê',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <DriverTabStack.Screen
        name="Profile"
        component={ProfileDriverScreen}
        options={{
          headerShown: false,
          tabBarLabel:'Hồ sơ',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </DriverTabStack.Navigator>
  );
};
