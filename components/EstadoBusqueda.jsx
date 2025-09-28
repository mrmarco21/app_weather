import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/EstadoBusquedaStyles';

const EstadoBusqueda = ({ cargando, error, consulta, resultados }) => {
  if (cargando) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0099ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="alert-circle-outline" size={40} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (resultados.length === 0 && consulta !== '') {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="search-outline" size={50} color="#999" />
        <Text style={styles.noResultsText}>No se encontraron resultados</Text>
        <Text>Intenta con otro término de búsqueda</Text>
      </View>
    );
  }

  if (consulta === '' && resultados.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="search" size={80} color="#ddd" />
        <Text style={styles.initialText}>Busca una ciudad para ver su clima</Text>
      </View>
    );
  }

  return null;
};

export default EstadoBusqueda;