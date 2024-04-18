import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import EmployeeItem from './EmployeeItem'; // Asegúrate de tener este componente EmployeeItem creado y disponible
import { getEmployees, deleteEmployee } from '../api'; // Asegúrate de importar las funciones adecuadas del API

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        await loadEmployees();
    }

    const renderItem = ({ item }) => {
        return <EmployeeItem employee={item} handleDelete={handleDelete} />;
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadEmployees();
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={employees}
                keyExtractor={(item) => item.pk_employee.toString()}
                renderItem={renderItem}
                refreshing={refreshing}
                refreshControl={
                    <RefreshControl
                        colors={['#78308f']}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    listContainer: {
        width: windowWidth - 20, // Resta el padding horizontal
    },
});

export default EmployeesList;
