import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/Home/HomeScreen';  // Tela de Apresentação
import BooksScreen from './src/pages/Books/BooksScreen';  // Tela de Livros

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
