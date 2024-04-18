import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const HistoryItem = ({ history, handleDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>Fecha de entrada:</Text>
                    <Text style={styles.itemValue}>{history.date_in}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>Fecha de salida:</Text>
                    <Text style={styles.itemValue}>{history.date_out}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>ID del estacionamiento:</Text>
                    <Text style={styles.itemValue}>{history.fk_parking}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>ID de la tarjeta:</Text>
                    <Text style={styles.itemValue}>{history.fk_card}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>ID del espacio:</Text>
                    <Text style={styles.itemValue}>{history.fk_space}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemLabel}>ID del estado:</Text>
                    <Text style={styles.itemValue}>{history.fk_status}</Text>
                </View>
                <Pressable style={styles.btnSee} onPress={() => handleDelete(history.id)}>
                    <Text style={styles.btnText}>Ver detalles</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width: '35%',
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    itemValue: {
        flex: 1,
    },
    btnSee: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HistoryItem;
