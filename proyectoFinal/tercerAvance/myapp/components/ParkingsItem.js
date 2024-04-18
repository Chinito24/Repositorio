import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ParkingItem = ({ parking, handleDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.itemContainer}
                onPress={() => navigation.navigate('ParkingDetails', { id: parking.pk_parking })}
            >
                <Text style={styles.itemTitle}>Numero de Parking: {parking.parking_number}</Text>
                <Text style={styles.itemDescription}>Ubicacion: {parking.parking_location}</Text>
                <Text style={styles.itemDescription}>Capacidad: {parking.parking_capacity}</Text>
            </Pressable>

            <Pressable style={styles.btnEliminar} onPress={() => handleDelete(parking.pk_parking)}>
                <Text style={styles.btnText}>Eliminar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
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
    },
    itemContainer: {
        width: '90%',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 15,
    },
    btnEliminar: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ParkingItem;
