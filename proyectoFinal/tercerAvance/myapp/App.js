import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import EmployeeForm from "./screens/EmployeeForm";
import ParkingForm from "./screens/ParkingsForm";
import VisitForm from "./screens/VisitForm";
import Employee from "./screens/Employee";
import Parkings from './screens/Parkings';
import History from './screens/History';
import Visit from './screens/Visit';
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EmployeeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Employee"
        component={Employee}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons.Button
              name="add-circle-outline"
              size={30}
              color="green"
              backgroundColor="transparent"
              onPress={() => navigation.navigate('EmployeeForm')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EmployeeForm"
        component={EmployeeForm}
        options={{ title: 'Agregar Empleado' }}
      />
    </Stack.Navigator>
  );
};

const ParkingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Parkings"
        component={Parkings}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons.Button
              name="add-circle-outline"
              size={30}
              color="green"
              backgroundColor="transparent"
              onPress={() => navigation.navigate('ParkingsForm')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ParkingsForm"
        component={ParkingForm}
        options={{ title: 'Agregar Parking' }}
      />
    </Stack.Navigator>
  );
};

const VisitStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Visit"
        component={Visit}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons.Button
              name="add-circle-outline"
              size={30}
              color="green"
              backgroundColor="transparent"
              onPress={() => navigation.navigate('VisitForm')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="VisitForm"
        component={VisitForm}
        options={{ title: 'Agregar Visita' }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (userData) => {
    try {
      // Aquí realizarías la lógica de autenticación, por ejemplo, llamando a una función loginUser
      const response = await loginUser(userData);

      if (response.success) {
        setIsLoggedIn(true);
      } else {
        // Manejar error de autenticación, mostrar mensaje de error, etc.
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejo de errores
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="Parkings">
          <Tab.Screen
            name="Empleados"
            component={EmployeeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Parkings"
            component={ParkingStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Visitas"
            component={VisitStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Historial"
            component={History}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Login onLogin={(userData) => handleLogin(userData)} setIsLoggedIn={setIsLoggedIn} />)}
    </NavigationContainer>
  );
}

export default App;
