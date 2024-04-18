import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const UserItem = ({ user, handleDelete }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.itemContainer}>
            <Pressable onPress={() => navigation.navigate('EmployeeForm')}>
                <Text style={styles.itemTitle}>{user.nickname}</Text>
                <Text style={styles.itemDescription}>{user.accessCode}</Text>
            </Pressable>

            <Pressable style={styles.btnEliminar}
                onPress={() => handleDelete(user.pk_user)}
            >
                <Text style={{ color: 'white', }}>Eliminar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 15,
    },
    btnEliminar: {
        backgroundColor: '#ee5253',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default UserItem