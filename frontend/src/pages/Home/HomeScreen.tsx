import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }: any) => {
  const [booksData, setBooksData] = useState<any>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [oldestBook, setOldestBook] = useState<any>(null);
  const [newestBook, setNewestBook] = useState<any>(null);

  useEffect(() => {
    // Substitua pelo seu IP
    axios.get('http://192.168.0.20:3010/api/books')
      .then(response => {
        const books = response.data;
        setBooksData(books);
        setTotalBooks(books.length);

        // Filtra para pegar o livro mais velho e mais novo
        if (books.length > 0) {
          const oldest = books.reduce((oldest: any, book: any) => {
            return book.year < oldest.year ? book : oldest;
          });

          const newest = books.reduce((newest: any, book: any) => {
            return book.year > newest.year ? book : newest;
          });

          setOldestBook(oldest);
          setNewestBook(newest);
        }

        // Calcula o total de cursos (ou disciplinas)
        const courses = new Set(books.map((book: any) => book.course));
        setTotalCourses(courses.size);
      })
      .catch(error => {
        console.error('Erro ao carregar dados dos livros:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bibliografia</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Disciplinas: {totalCourses}</Text>
        <Text style={styles.statText}>Livros: {totalBooks}</Text>
        <Text style={styles.statText}>Livro Mais Velho: {oldestBook ? `${oldestBook.title} (${oldestBook.year})` : 'N/A'}</Text>
        <Text style={styles.statText}>Livro Mais Novo: {newestBook ? `${newestBook.title} (${newestBook.year})` : 'N/A'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Books')}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Cor de fundo neutra e clean
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#343A40', // Cor escura e neutra para um toque moderno
    marginBottom: 30,
    fontFamily: 'Helvetica Neue', // Fonte clean e moderna
    textAlign: 'center', // Título centralizado
  },
  statsContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Dados centralizados
    marginBottom: 30,
  },
  statText: {
    fontSize: 18,
    fontWeight: '300', // Fonte mais fina para um visual clean
    color: '#6C757D', // Cor suave e neutra
    marginBottom: 10,
    fontFamily: 'Arial', // Fonte simples e elegante
  },
  button: {
    backgroundColor: '#6C757D', // Cor cinza
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30, // Botão arredondado
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
