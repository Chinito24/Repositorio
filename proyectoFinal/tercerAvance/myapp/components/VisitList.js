import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, View, StyleSheet, Dimensions } from 'react-native';
import VisitItem from './VisitItem';
import { getVisits, deleteVisit } from '../api';

const VisitList = () => {
    const [visit, setVisit] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const loadVisit = async () => {
        const data = await getVisits();
        setVisit(data);
    };

    useEffect(() => {
        loadVisit();
    }, []);

    const handleDelete = async (id) => {
        await deleteVisit(id);
        await loadVisit();
    }

    const renderItem = ({ item }) => {
        return <VisitItem visit={item} handleDelete={handleDelete} />;
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadVisit();
        setRefreshing(false);
    })

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={visit}
                keyExtractor={(item) => item.pk_visit.toString()}
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

export default VisitList;
