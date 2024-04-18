import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VisitItem = ({ visit, handleDelete }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.itemContainer}
                onPress={() => navigation.navigate('VisitForm')}
            >
                <Text style={styles.itemTitle}>{visit.visit_reason}</Text>
                <Text style={styles.itemValue}>{visit.visit_name}</Text>
            </Pressable>

            <Pressable
                style={styles.btnEliminar}
                onPress={() => handleDelete(visit.pk_visit)}
            >
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
        marginBottom: 20,
        padding: 15,
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
        paddingVertical: 20,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemValue: {
        fontSize: 16,
        color: '#333',
    },
    btnEliminar: {
        backgroundColor: '#ee5253',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default VisitItem;
