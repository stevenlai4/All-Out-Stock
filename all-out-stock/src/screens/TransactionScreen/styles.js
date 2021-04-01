import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: '10%',
    },
    centerText: {
        textAlign: 'center',
    },
    logo: {
        color: 'pink',
        fontSize: 45,
        marginVertical: 35,
    },
    name: {
        fontSize: 30,
    },
    currentPrice: {
        fontSize: 25,
        marginBottom: 30,
    },
    cell: {
        marginHorizontal: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 10,
    },
    cellText: {
        fontSize: 20,
    },
    refresh: {
        color: 'blue',
        marginTop: 20,
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    button: {
        backgroundColor: 'pink',
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
});
