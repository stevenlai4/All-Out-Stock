import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return(
        <Drawer.Navigator initialRouteName="Portfolio">
            <Drawer.Screen name = "Portfolio" component={PortfolioScreenNavigator} />
            <Drawer.Screen name = "Stock" component={StockScreenNavigator} />
        </Drawer.Navigator>
    )
}