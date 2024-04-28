import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/module_General/IntroScreen';
import LoginScreen from '../screens/module_General/LoginScreen';
import ForgotPasswordScreen from '../screens/module_General/ForgotPasswordScreen';
import ChoosingTypeAccountScreen from '../screens/module_General/ChoosingTypeAccountScreen';
import RegisterUserScreen from '../screens/module_User/RegisterUserScreen';
import VerifyEmailScreen from '../screens/module_General/VerifyEmailScreen';
import RegisterDriverScreen from '../screens/module_Driver/RegisterDriverScreen';
import Step1Screen from '../screens/module_Driver/RegisterDriverScreen/Step1';
import Step2Screen from '../screens/module_Driver/RegisterDriverScreen/Step2';
import Step3Screen from '../screens/module_Driver/RegisterDriverScreen/Step3';

const AuthStack = createNativeStackNavigator();
export default function AuthStackScreens() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="ChoosingTypeAccount" component={ChoosingTypeAccountScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="RegisterUser" component={RegisterUserScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="RegisterDriver" component={RegisterDriverScreen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="Step1" component={Step1Screen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="Step2" component={Step2Screen} options={{ headerTitle: '' }} />
            <AuthStack.Screen name="Step3" component={Step3Screen} options={{ headerTitle: '' }} />
        </AuthStack.Navigator>
    );
}