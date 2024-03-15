import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState(''); // Inicialmente sin filtro

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  const renderList = () => {
    let filtered = todos;

    switch (mode) {
      case 'allIDs':
        filtered = todos.map(({ id }) => ({ id }));
        break;
      case 'allIDTitles':
        filtered = todos.map(({ id, title }) => ({ id, title }));
        break;
      case 'pendingIDTitle':
        filtered = todos.filter((todo) => !todo.completed).map(({ id, title }) => ({ id, title }));
        break;
      case 'completedIDTitle':
        filtered = todos.filter((todo) => todo.completed).map(({ id, title }) => ({ id, title }));
        break;
      case 'allIDUserID':
        filtered = todos.map(({ id, userId }) => ({ id, userId }));
        break;
      case 'completedIDUserID':
        filtered = todos.filter((todo) => todo.completed).map(({ id, userId }) => ({ id, userId }));
        break;
      case 'pendingIDUserID':
        filtered = todos.filter((todo) => !todo.completed).map(({ id, userId }) => ({ id, userId }));
        break;
      default:
        filtered = [];
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            ID: {item.id} {item.title && `- Title: ${item.title}`} {item.userId && `- UserID: ${item.userId}`}
          </Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items to display</Text>}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.buttonContainer}>
        <Button title="All IDs" onPress={() => setMode('allIDs')} color="#5f9ea0" />
        <Button title="All IDs & Titles" onPress={() => setMode('allIDTitles')} color="#5f9ea0" />
        <Button title="Pending (ID & Title)" onPress={() => setMode('pendingIDTitle')} color="#5f9ea0" />
        <Button title="Completed (ID & Title)" onPress={() => setMode('completedIDTitle')} color="#5f9ea0" />
        <Button title="All IDs & UserIDs" onPress={() => setMode('allIDUserID')} color="#5f9ea0" />
        <Button title="Completed IDs & UserIDs" onPress={() => setMode('completedIDUserID')} color="#5f9ea0" />
        <Button title="Pending IDs & UserIDs" onPress={() => setMode('pendingIDUserID')} color="#5f9ea0" />
      </ScrollView>
      <View style={styles.listContainer}>
        {renderList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    backgroundColor: '#f0f8ff',
    paddingVertical: 38,
    height: 120,
    borderBottomHeight: 10,
  },
  listContainer: {
    flex: 50,
  },
  itemText: {
    padding: 8,
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 18,
  },
});

export default App;
