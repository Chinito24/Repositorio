import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { loginUser } from '../api'; // Importamos la función de autenticación de la API
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const LoginScreen = ({ setIsLoggedIn }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const navigation = useNavigation(); // Obtiene el objeto de navegación

    const handleChange = (name, value) => {
        setUserData({ ...userData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            // Llamamos a la función de autenticación de la API
            const response = await loginUser(userData);

            // Verificamos si la autenticación fue exitosa
            if (response.success) {
                // Si es exitosa, redireccionamos al usuario al HomeScreen
                // Limpiar el formulario después de guardar exitosamente
                setUserData({ email: '', password: '' });

                // Aquí puedes navegar a la pantalla HomeScreen o realizar alguna acción necesaria
                setIsLoggedIn(true);
                redirectToHomeScreen();
            } else {
                // Si hay un error, mostramos el mensaje de error
                // Puedes mostrar el mensaje de error en una alerta o en otro lugar de la interfaz de usuario
                console.error('Error al iniciar sesión:', response.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Manejo de errores, puedes mostrar un mensaje de error al usuario aquí
        }
    };

    const redirectToHomeScreen = () => {
        // Navegar a la pantalla de inicio (Parkings)
        navigation.navigate('Parkings');
        console.log('Usuario autenticado. Redirigiendo al HomeScreen...');
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Parking Manager</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        value={userData.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={userData.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color gris semitransparente
        paddingHorizontal: 20,
    },
    innerContainer: {
        width: '30%',
        backgroundColor: '#fff', // Color de fondo blanco
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevación para Android
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        width: '100%',
        backgroundColor: 'gray',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
