import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { saveParking } from '../api';
import { useNavigation } from '@react-navigation/native';


const ParkingForm = () => {
    const navigation = useNavigation();

    const [parkingData, setParkingData] = useState({
        parking_number: '',
        parking_location: '',
        parking_capacity: '',
    });

    const handleChange = (name, value) => {
        setParkingData({ ...parkingData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            // Verificar que todos los campos estén completos
            if (!parkingData.parking_number || !parkingData.parking_location || !parkingData.parking_capacity) {
                Alert.alert('Error', 'Por favor completa todos los campos.');
                return; // Detener la ejecución si algún campo está vacío
            }

            // console.log(parkingData);
            await saveParking(parkingData);

            // Limpiar el formulario después de guardar exitosamente
            setParkingData({ parking_number: '', parking_location: '', parking_capacity: '' });

            // Alert.alert('Éxito', 'El parking ha sido agregado exitosamente.');
            navigation.navigate('Parkings');
            console.log('Inserccion completada. Redirigiendo a Parkings...');
        } catch (error) {
            console.error('Error al guardar el parking:', error);
            Alert.alert('Error', 'Hubo un problema al intentar agregar el parking. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Numero del parking:</Text>
            <TextInput
                style={styles.input}
                value={parkingData.parking_number}
                onChangeText={(text) => handleChange('parking_number', text)}
                placeholder="Ingrese el numero del parking"
            />
            <Text style={styles.label}>Ubicación:</Text>
            <TextInput
                style={styles.input}
                value={parkingData.parking_location}
                onChangeText={(text) => handleChange('parking_location', text)}
                placeholder="Ingrese la ubicación del parking"
            />
            <Text style={styles.label}>Capacidad:</Text>
            <TextInput
                style={styles.input}
                value={parkingData.parking_capacity}
                onChangeText={(text) => handleChange('parking_capacity', text)}
                placeholder="Ingrese la capacidad del parking"
                keyboardType="numeric"
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar Parking</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#10ac84',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ParkingForm;
