import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    views: {
        width: '90%'
    },
    colors: {
        yellow: { color: '#ffb301' },
        white: { color: '#fff'},
        white_1: { color: '#ffffffb3' },
        black: { color: '#000'}
    },
    text: {
        whiteHeader: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 40
        },
        subText: {
            color: '#ffffffb3',
            marginTop: 10,
            marginBottom: 10,
            fontSize: 18,
            textAlign: 'center'
        },
        label: {
            color: '#ffffffb3',
            fontWeight: 'bold',
            marginBottom: 4,
        }
    },
    input: {
        borderColor: '#ffffffb3',
        borderWidth: 1,
        borderRadius: 6,
        minHeight: 50,
        backgroundColor: '#141414',
        color: '#fff',
        paddingLeft: 10,
        marginBottom: 14
    }, 
    button: {
        borderRadius: 6,
        backgroundColor: '#ffb301',
        color: '#000',
        padding: 20,
        marginBottom: 20,
    }
})