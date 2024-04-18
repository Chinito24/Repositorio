import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { saveEmployee } from '../api';
import { useNavigation } from '@react-navigation/native';

const EmployeeForm = () => {
    const navigation = useNavigation();

    const [employee, setEmployee] = useState({
        employee_name: '',
        employee_lastNameP: '',
        employee_lastNameM: '',
        tel: ''
    });

    const handleChange = (name, value) => {
        // Convertir el valor a cadena de texto si el campo es 'tel'
        if (name === 'tel') {
            value = value.toString();
        }
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await saveEmployee(employee);
            // Limpiar el formulario después de guardar exitosamente
            setEmployee({
                employee_name: '',
                employee_lastNameP: '',
                employee_lastNameM: '',
                tel: ''
            });
            // Alert.alert('Éxito', 'El empleado ha sido agregado exitosamente.');
            navigation.navigate('Employee');
            console.log('Inserccion completada. Redirigiendo a Employee...');
        } catch (error) {
            console.error('Error al guardar el empleado:', error);
            Alert.alert(
                'Error',
                'Hubo un problema al intentar agregar el empleado. Por favor, inténtalo de nuevo más tarde.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del empleado:</Text>
            <TextInput
                style={styles.input}
                value={employee.employee_name}
                onChangeText={(text) => handleChange('employee_name', text)}
                placeholder="Ingrese el nombre del empleado"
            />
            <Text style={styles.label}>Apellido paterno del empleado:</Text>
            <TextInput
                style={styles.input}
                value={employee.employee_lastNameP}
                onChangeText={(text) => handleChange('employee_lastNameP', text)}
                placeholder="Ingrese el apellido paterno del empleado"
            />
            <Text style={styles.label}>Apellido materno del empleado:</Text>
            <TextInput
                style={styles.input}
                value={employee.employee_lastNameM}
                onChangeText={(text) => handleChange('employee_lastNameM', text)}
                placeholder="Ingrese el apellido materno del empleado"
            />
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                style={styles.input}
                value={employee.tel}
                onChangeText={(text) => handleChange('tel', text)}
                placeholder="Ingrese el teléfono del empleado"
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar Empleado</Text>
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

export default EmployeeForm;
