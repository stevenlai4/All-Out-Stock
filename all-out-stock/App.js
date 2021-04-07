import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    RegistrationScreen,
    StockDetailScreen,
    NavigationScreen,
    TransactionScreen,
} from './src/screens';
import { decode, encode } from 'base-64';
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                    /> 
                    <Stack.Screen name="Root" component={NavigationScreen}  options={{headerShown: false}}/>                   
                    <Stack.Screen
                        name="StockDetail"
                        component={StockDetailScreen} 
                    />
                    <Stack.Screen name="Transaction" component={TransactionScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
