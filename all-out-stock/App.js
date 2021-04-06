import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    RegistrationScreen,
    PortfolioScreen,
    StockScreen,
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
import { firebase } from './src/firebase/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    if(user){
        console.log('User Email: ', user.email);
    }

    // if (loading) {
    //   return (
    //     <></>
    //   )
    // }

    // useEffect(() => {
    //   const usersRef = firebase.firestore().collection('users');
    //   firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //       usersRef
    //         .doc(user.uid)
    //         .get()
    //         .then((document) => {
    //           const userData = document.data()
    //           setLoading(false)
    //           setUser(userData)
    //         })
    //         .catch((error) => {
    //           setLoading(false)
    //         });
    //     } else {
    //       setLoading(false)
    //     }
    //   });
    // }, []);

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
