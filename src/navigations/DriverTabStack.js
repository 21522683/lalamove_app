import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatiscalDriverScreen from '../screens/module_Driver/StatiscalDriverScreen';
import Step1Screen from '../screens/module_Driver/RegisterDriverScreen/Step1';
import Step2Screen from '../screens/module_Driver/RegisterDriverScreen/Step2';
import CUSTOM_COLOR from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
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
const DriverTabStack = createBottomTabNavigator();

export default DriverTabStackScreens = () => {
  const DriverProfileStack = createStackNavigator();
  function DriverProfileStackScreens() {
    return (
      <DriverProfileStack.Navigator>
        <DriverProfileStack.Screen
          name="profile"
          component={ProfileDriverScreen}
          options={{headerShown: false}}
        />
        <DriverProfileStack.Screen
          name="policy"
          component={PrivatePolicyScreen}
          options={{headerTitle: 'Chính sách người dùng', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="infor-driver"
          component={DriverInformationScreen}
          options={{headerTitle: 'Thông tin tài xế', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="license-driver"
          component={LisenceDriverManageScreen}
          options={{headerTitle: 'Bằng lái tài xế', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="license-driver-infor"
          component={LicenseDriverInforScreen}
          options={{headerTitle: 'Thông tin bằng lái', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="license-driver-form"
          component={LicenseDriverForm}
          options={({route}) => ({
            title: route.params.name,
            headerBackTitle: '',
          })}
        />
        <DriverProfileStack.Screen
          name="vehicle-driver"
          component={VehicleManageScreen}
          options={{headerTitle: 'Phương tiện', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="vehicle-driver-infor"
          component={VehicleDriverInforScreen}
          options={{headerTitle: 'Thông tin phương tiện', headerBackTitle: ''}}
        />
        <DriverProfileStack.Screen
          name="vehicle-driver-form"
          component={VehicleDriverForm}
          options={({route}) => ({
            title: route.params.name,
            headerBackTitle: '',
          })}
        />
      </DriverProfileStack.Navigator>
    );
  }
  const OrdersDriverStack = createStackNavigator();
  function OrdersDriverStackScreens() {
    return (
      <OrdersDriverStack.Navigator initialRouteName="ReceiverDetailDriverScreen">
        <HomeDriverStack.Screen
          name="ReceiverDetailDriverScreen"
          component={ReceiverDetailDriverScreen}
          options={{headerShown: false}}
        />
      </OrdersDriverStack.Navigator>
    );
  }
  const HomeDriverStack = createStackNavigator();
  function HomeDriverStackScreens() {
    return (
      <HomeDriverStack.Navigator>
        <HomeDriverStack.Screen
          name="DriverOrderScreen"
          component={DriverOrdersScreen}
          options={{headerShown: false}}
        />
        <HomeDriverStack.Screen
          name="OrderDetailDriverScreen"
          component={OrderDetailDriverScreen}
          options={{headerShown: false}}
        />
        <HomeDriverStack.Screen
          name="ReceiverDetailDriverScreen"
          component={ReceiverDetailDriverScreen}
          options={{headerShown: false}}
        />
        <HomeDriverStack.Screen
          name="DriverReviewMap"
          component={DriverReviewMap}
          options={{headerShown: false}}
        />
        <HomeDriverStack.Screen
          name="VerifyOrderDriverScreen"
          component={VerifyOrderDriverScreen}
          options={{headerShown: false}}
        />
      </HomeDriverStack.Navigator>
    );
  }

  return (
    <DriverTabStack.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: CUSTOM_COLOR.Primary,
      }}>
      <DriverTabStack.Screen
        name="Orders"
        component={HomeDriverStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'download' : 'download-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <DriverTabStack.Screen
        name="Order"
        component={HomeDriverStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
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
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <DriverTabStack.Screen
        name="Profile"
        component={DriverProfileStackScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </DriverTabStack.Navigator>
  );
};
