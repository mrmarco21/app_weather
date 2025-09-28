import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/BuscadorCiudadStyles';

const BuscadorCiudad = ({ consulta, setConsulta, onBuscar }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Buscar ciudad..."
        onChangeText={setConsulta}
        value={consulta}
        onSubmitEditing={onBuscar}
        style={styles.searchBar}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onBuscar}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default BuscadorCiudad;