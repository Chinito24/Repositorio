import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { saveVisit } from '../api'; // Asegúrate de importar la función de guardar visita desde tu archivo de API
import { useNavigation } from '@react-navigation/native';

const VisitForm = () => {
    const navigation = useNavigation();

    const [visitData, setVisitData] = useState({
        visit_company: '',
        visit_reason: '',
        visit_name: '',
        visit_lastName: '',
    });

    const handleChange = (name, value) => {
        setVisitData({ ...visitData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            // Verificar que todos los campos estén completos
            if (!visitData.visit_company || !visitData.visit_reason || !visitData.visit_name || !visitData.visit_lastName) {
                Alert.alert('Error', 'Por favor completa todos los campos.');
                return; // Detener la ejecución si algún campo está vacío
            }

            // Guardar la visita utilizando la función de la API
            await saveVisit(visitData);

            // Limpiar el formulario después de guardar exitosamente
            setVisitData({ visit_company: '', visit_reason: '', visit_name: '', visit_lastName: '' });

            // Redirigir a la pantalla de visitas después de guardar
            navigation.navigate('Visit');
            console.log('Insercción completada. Redirigiendo a Visitas...');
        } catch (error) {
            console.error('Error al guardar la visita:', error);
            Alert.alert('Error', 'Hubo un problema al intentar agregar la visita. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Empresa de la visita:</Text>
            <TextInput
                style={styles.input}
                value={visitData.visit_company}
                onChangeText={(text) => handleChange('visit_company', text)}
                placeholder="Ingrese la empresa de la visita"
            />
            <Text style={styles.label}>Motivo de la visita:</Text>
            <TextInput
                style={styles.input}
                value={visitData.visit_reason}
                onChangeText={(text) => handleChange('visit_reason', text)}
                placeholder="Ingrese el motivo de la visita"
            />
            <Text style={styles.label}>Nombre del visitante:</Text>
            <TextInput
                style={styles.input}
                value={visitData.visit_name}
                onChangeText={(text) => handleChange('visit_name', text)}
                placeholder="Ingrese el nombre del visitante"
            />
            <Text style={styles.label}>Apellido del visitante:</Text>
            <TextInput
                style={styles.input}
                value={visitData.visit_lastName}
                onChangeText={(text) => handleChange('visit_lastName', text)}
                placeholder="Ingrese el apellido del visitante"
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar Visita</Text>
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

export default VisitForm;
