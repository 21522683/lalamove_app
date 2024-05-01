import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DriverTabStack from './src/navigations/DriverTabStack';
import UserTabStack from './src/navigations/UserTabStack';
import AdminTabStack from './src/navigations/AdminTabStack';
import AuthStackScreens from './src/navigations/AuthStack';

export default function App() {
  const [userType, setUserType] = React.useState("User")

  return (

    <NavigationContainer >
      {
        userType === 'User' ? <UserTabStack />
          : userType === 'Driver' ? <DriverTabStack />
            : userType === 'Admin' ? <AdminTabStack />
              : <AuthStackScreens />
      }
    </NavigationContainer>
  );
}
