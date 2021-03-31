import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import styles from './styles';
import firebase from 'firebase'

export default function TransactionScreen(props) {
    const [share, setShare] = useState(0)
    const stock = props.route.params.stock;
    const isBuying = props.route.params.isBuying
    
    const db = firebase.firestore()
    const uid = "jzWwiZ0QMKfKp3OHAhoxWGqoQWB2"
    
    const handleTransaction = async () => {
        const transaction = await db.collection("users").doc(uid).collection("transaction").add({name: stock.name, price: stock.quote.c, share: share});
    }

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>

            <Text> How many shares of {stock.name} do you want to buy?</Text>
            
            <TextInput placeholder="0" keyboardType="numeric" onChangeText={(text) => setShare(text)}> </TextInput>
            <Text>
                {stock.name} Price: ${stock.quote.c}
            </Text>
            <Text>
                Estimated cost: $0.00
            </Text>
            <Text>
                Available to trade: $100
            </Text>

            <View style={styles.btnContainer}>
                {
                    isBuying &&
                    <TouchableOpacity style={styles.button} onPress={()=>{handleTransaction()}}>
                        <Text style={styles.btnText}>Buy</Text>
                    </TouchableOpacity> ||
                    <TouchableOpacity style={styles.button} onPress={()=>{handleTransaction()}}>
                    <Text style={styles.btnText}>Sell</Text>
                </TouchableOpacity>
                }
                
            </View>
        </View>
    );
}
