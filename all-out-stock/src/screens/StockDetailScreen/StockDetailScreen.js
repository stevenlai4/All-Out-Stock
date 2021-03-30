import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function StockDetailScreen({ route }) {
    const [stock, setStock] = useState(route.params);

    return (
        <View>
            <Text>All Out Stock</Text>
            <Text>${stock.c}</Text>
            <View>
                <Text>Open</Text>
                <Text>${stock.o}</Text>
            </View>
            <View>
                <Text>High</Text>
                <Text>${stock.h}</Text>
            </View>
            <View>
                <Text>Low</Text>
                <Text>${stock.l}</Text>
            </View>
            <View>
                <Text>Previous Closing</Text>
                <Text>${stock.p}</Text>
            </View>
        </View>
    );
}
