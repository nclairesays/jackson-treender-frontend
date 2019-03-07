import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        flex: 1
    },
    mainBody: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    },

    card: {
       
        width: width - 40,
        height: height * 0.7,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 20,
    },
    input: {
        width: width - 40,
        height: 50,
        margin: 5,
        padding: 8,
        fontSize: 18,
        fontWeight: '500'
    },
    input_multiline: {
        width: width - 40,
        minHeight: 50,
        maxHeight: 200,
        margin: 5,
        padding: 8,
        fontSize: 18,
        fontWeight: '500'

    }
 
})