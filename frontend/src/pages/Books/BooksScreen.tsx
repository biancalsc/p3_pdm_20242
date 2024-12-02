import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const BooksScreen = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    // Substitua pelo seu IP
    axios.get('http://192.168.0.20:3010/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar livros:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Livros</Text>
      
      <FlatList
  data={books}
  keyExtractor={(item) => (item._id ? item._id.toString() : String(item.title))} // Verificando se _id está presente
  renderItem={({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookDetails}>Autor: {item.author}</Text>
            <Text style={styles.bookDetails}>Editora: {item.publisher}</Text>
            <Text style={styles.bookDetails}>Ano: {item.year}</Text>
            <Text style={styles.bookDetails}>Curso: {item.course}</Text>
    </View>
  )}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Cor de fundo neutra
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#343A40', // Cor escura e neutra
    marginBottom: 30,
    fontFamily: 'Helvetica Neue', // Fonte clean e moderna
    textAlign: 'center', // Título centralizado
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  bookDetails: {
    fontSize: 16,
    fontWeight: '300', // Fonte mais fina para um visual clean
    color: '#6C757D',
    marginBottom: 5,
    fontFamily: 'Arial', // Fonte simples e elegante
  },
  bookItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
});


export default BooksScreen;
