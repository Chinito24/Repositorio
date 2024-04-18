import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import UserItem from './UserItem';
import { getUsers, deleteUser } from '../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete =  async (id) => {
        await deleteUser(id);
        await loadUsers();
    }

    const renderItem = ({ item }) => {
        return <UserItem user={item} handleDelete={handleDelete}/>;
    };

    const onRefresh = React.useCallback (async () => {
        setRefreshing(true);
        await loadUsers();
        setRefreshing(false);
    })

    return (
        <FlatList
            style={{ backgroundColor: 'red', width: '100%' }}
            data={users}
            keyExtractor={(item) => item.pk_user.toString()}
            renderItem={renderItem}
            refreshing={refreshing}
            refreshControl={
                <RefreshControl
                    colors={['#78308f']}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export default UserList;
