import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState({
    allTodos: false,
    completedTodos: false,
    uncompletedTodos: false,
    userIds: false,
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
      setFilteredTodos(data); // Mostrar todos inicialmente
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const displayTodos = (filter) => {
    switch (filter) {
      case 'all':
        setFilteredTodos(todos);
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        break;
    }
  };

  const toggleAdditionalInfo = (key) => {
    setShowAdditionalInfo(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú de Todos</Text>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.button} onPress={() => { displayTodos('all'); toggleAdditionalInfo('allTodos') }}>
          <Text style={styles.buttonText}>Mostrar Todos</Text>
        </TouchableOpacity>
        {showAdditionalInfo.allTodos && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes (IDs y Titles)</Text>
            {todos.map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.title}</Text>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => { displayTodos('completed'); toggleAdditionalInfo('completedTodos') }}>
          <Text style={styles.buttonText}>Mostrar Completados</Text>
        </TouchableOpacity>
        {showAdditionalInfo.completedTodos && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes resueltos (IDs y Titles)</Text>
            {todos.filter(todo => todo.completed === true).map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.title}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => { displayTodos('uncompleted'); toggleAdditionalInfo('uncompletedTodos') }}>
          <Text style={styles.buttonText}>Mostrar Sin Completar</Text>
        </TouchableOpacity>
        {showAdditionalInfo.uncompletedTodos && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes sin resolver (IDs y Titles)</Text>
            {todos.filter(todo => todo.completed === false).map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.title}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => toggleAdditionalInfo('userIds')} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar IDs y userId</Text>
        </TouchableOpacity>
        {showAdditionalInfo.userIds && (
          <View style={styles.innerContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes (IDs y userId)</Text>
            {todos.map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.userId}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => toggleAdditionalInfo('completedUserIds')} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Resueltos (IDs y userId)</Text>
        </TouchableOpacity>
        {showAdditionalInfo.completedUserIds && (
          <View style={styles.innerContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes resueltos (IDs y userId)</Text>
            {todos.filter(todo => todo.completed === true).map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.userId}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => toggleAdditionalInfo('uncompletedUserIds')} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Sin Resolver (IDs y userId)</Text>
        </TouchableOpacity>
        {showAdditionalInfo.uncompletedUserIds && (
          <View style={styles.innerContainer}>
            <Text style={styles.infoHeader}>Lista de todos los pendientes sin resolver (IDs y userId)</Text>
            {todos.filter(todo => todo.completed === false).map(todo => (
              <Text key={todo.id}>{todo.id} - {todo.userId}</Text>
            ))}
          </View>
        )}


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scroll: {
    width: '80%',
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  todosContainer: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
