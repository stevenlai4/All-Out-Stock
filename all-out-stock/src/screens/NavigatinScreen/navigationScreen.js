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

import { createStackNavigator } from '@react-navigation/stack';
import PortfolioScreen from '../PortfolioScreen/PortfolioScreen';
import MenuIcon from './MenuIcon';

const PortfolioStack = createStackNavigator()
function PortfolioScreenNavigator() {
    return(
        <PortfolioStack.Navigator>
            <PortfolioStack.Screen name = "Portfolio" component={PortfolioScreen} options = {{headerTitle: 'User Portfolio', headerLeft: () => <MenuIcon />}}
            />
        </PortfolioStack.Navigator>
    )
}

import StockScreen from '../StockScreen/StockScreen';

const StockScreenStack = createStackNavigator()
function StockScreenNavigator() {
    return(
        <StockScreenStack.Navigator>
            <StockScreenStack.Screen name ="Stock" component={StockScreen} options = {{headerTitle: 'Stock Purchase'}}
            />
        </StockScreenStack.Navigator>
    )
}