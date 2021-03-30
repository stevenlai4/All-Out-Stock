import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function StockDetailScreen({ route }) {
    return (
        <View>
            <Text>All Out Stock</Text>
            <Text>{route.params.company}</Text>
            <Text>{}</Text>
        </View>
    );
}
