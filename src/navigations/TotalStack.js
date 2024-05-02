import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserTabStack from './UserTabStack';
import { NavigationContainer } from '@react-navigation/native';
import AdminTabStack from './AdminTabStack';
import AuthStackScreens from './AuthStack';
import { setUserAuth } from '../redux/slices/usersSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DriverTabStack from './DriverTabStack';
export default TotalStack = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state?.users?.userAuth);
  console.log(userAuth)

  useEffect(() => {
    async function userStorage() {
      const u = await AsyncStorage.getItem('userStorage');

      if (u !== null) {
        dispatch(setUserAuth(JSON.parse(u)));
      } else dispatch(setUserAuth({}));
    }
    userStorage();
  }, [dispatch]);
  return (
    <NavigationContainer>
      {
        userAuth?.userType === 'User' ? <UserTabStack />
          : userAuth?.userType === 'Driver' ? <DriverTabStack />
            : userAuth?.userType === 'Admin' ? <AdminTabStack />
              : <AuthStackScreens />
      }
    </NavigationContainer>
  );
};
