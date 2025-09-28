import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/EncabezadoFavoritosStyles';

const EncabezadoFavoritos = ({ favoritos, actualizarTodosFavoritos, actualizando }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Mis Ciudades Favoritas</Text>
      {favoritos.length > 0 && (
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={actualizarTodosFavoritos}
          disabled={actualizando}
        >
          <Ionicons 
            name={actualizando ? "sync-circle" : "sync"} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EncabezadoFavoritos;