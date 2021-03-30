import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    HomeScreen,
    RegistrationScreen,
    PortfolioScreen,
    StockScreen,
    StockDetailScreen,
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
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen
                        name="Portfolio"
                        component={PortfolioScreen}
                    />
                    <Stack.Screen name="Stock" component={StockScreen} />
                    <Stack.Screen
                        name="StockDetail"
                        component={StockDetailScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
