import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import HistoryItem from './HistoryItem'; // Asegúrate de tener este componente HistoryItem creado y disponible
import { getHistory, deleteHistory } from '../api'; // Asegúrate de importar las funciones adecuadas del API

const HistoryList = () => {
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
    const loadHistory = async () => {
        const data = await getHistory();
        setHistory(data);
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const handleDelete = async (id) => {
        await deleteHistory(id);
        await loadHistory();
    }

    const renderItem = ({ item }) => {
        return <HistoryItem history={item} handleDelete={handleDelete}/>;
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadHistory();
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={history}
                keyExtractor={(item) => item.pk_check.toString()}
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

export default HistoryList;
