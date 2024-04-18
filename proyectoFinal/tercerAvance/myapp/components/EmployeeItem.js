import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmployeeItem = ({ employee, handleDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.itemContainer}
                onPress={() => navigation.navigate('EmployeeDetails', { id: employee.pk_employee })}
            >
                <Text style={styles.itemTitle}>Nombre del empleado:</Text>
                <Text style={styles.itemValue}>{`${employee.employee_name} ${employee.employee_lastNameP} ${employee.employee_lastNameM}`}</Text>
                <Text style={styles.itemTitle}>Empresa asociada:</Text>
                <Text style={styles.itemValue}>{employee.fk_client}</Text>
            </Pressable>

            <Pressable style={styles.btnEliminar} onPress={() => handleDelete(employee.pk_employee)}>
                <Text style={styles.btnText}>Eliminar</Text>
            </Pressable>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth * 0.9; // Ajusta el ancho del contenedor principal al 90% de la pantalla

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
        width: itemWidth,
        alignItems: 'center',
    },
    itemTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    itemValue: {
        textAlign: 'center',
    },
    btnEliminar: {
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

export default EmployeeItem;
