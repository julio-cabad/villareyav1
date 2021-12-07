import React from 'react';
import {Easing, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Login from '../session/Login';
import Home from '../home/Home';
import LoginForm from '../session/LoginForm';
import CreateAccount from '../session/CreateAccount';
import FingerPrint from '../session/FingerPrint';
import RecoverPassword from '../session/RecoverPassword';
import SessionHelp from '../session/SessionHelp';

const Stack = createStackNavigator();

const config = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
        mass: 10,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
        mass: 10,
    },
};

const NavigationApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Login'}
                             transitionerStyle={{backgroundColor: 'black'}}
                             screenOptions={{
                                 gestureEnabled: true,
                                 gestureDirection: 'horizontal',
                                 cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                 transitionSpec: {
                                     open: config,
                                     close: closeConfig,
                                 },
                             }}
                             headerMode={'float'}
                             animation={'fade'}
            >
                <Stack.Screen name="Login" component={Login}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="LoginForm" component={LoginForm}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="FingerPrint" component={FingerPrint}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="Home" component={Home}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="RecoverPassword" component={RecoverPassword}
                              options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="SessionHelp" component={SessionHelp}
                              options={{headerShown: false, gestureEnabled: false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationApp;
