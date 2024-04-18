import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, View, StyleSheet, Dimensions } from 'react-native';
import ParkingItem from './ParkingsItem'; // Asegúrate de tener este componente ParkinItem creado y disponible
import { getParkings, deleteParking } from '../api'; // Asegúrate de importar las funciones adecuadas del API

const ParkingsList = () => {
    const [parkings, setParkings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const loadParkings = async () => {
        const data = await getParkings();
        setParkings(data);
    };

    useEffect(() => {
        loadParkings();
    }, []);

    const handleDelete = async (id) => {
        await deleteParking(id);
        await loadParkings();
    }

    const renderItem = ({ item }) => {
        return <ParkingItem parking={item} handleDelete={handleDelete} />;
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadParkings();
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={parkings}
                keyExtractor={(item) => item.pk_parking.toString()}
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

export default ParkingsList;
