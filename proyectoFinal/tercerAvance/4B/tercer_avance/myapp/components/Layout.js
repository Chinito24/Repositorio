import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#333" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 20,
    },
    scrollContent: {
        flexGrow: 1, // Permite que el contenido crezca para llenar el espacio disponible
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default Layout
