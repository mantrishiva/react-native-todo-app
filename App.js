import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1'},
    { text: 'create an app', key: '2'},
    { text: 'play on the switch', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevtodo) => {
      return prevtodo.filter(item => item.key != key)
    })
  }

  const submitHandler = (text) => {
    if(text.length > 0){
    setTodos((prevtodo) => {
      return [{text: text, key: Math.random().toString()},...prevtodo]
    })}else{
      Alert.alert('oops!', 'Type any text', [
        {text: 'Understood', onPress: () => console.log('alert closed')}
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={()=> {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList 
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler}/>
            )}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    flex:1,
    marginTop: 10,
  }
  
});