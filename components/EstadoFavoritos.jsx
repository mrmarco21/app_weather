import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/EstadoFavoritosStyles';

const EstadoFavoritos = ({ cargando, favoritos }) => {
  if (cargando) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="hourglass-outline" size={50} color="#0099ff" />
        <Text style={styles.loadingText}>Cargando favoritos...</Text>
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="heart-outline" size={80} color="#ddd" />
        <Text style={styles.emptyText}>No tienes ciudades favoritas</Text>
        <Text style={styles.emptySubText}>
          Busca ciudades y se guardarán automáticamente aquí
        </Text>
      </View>
    );
  }

  return null;
};

export default EstadoFavoritos;