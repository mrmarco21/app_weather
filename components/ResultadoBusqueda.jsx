import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './estilos/ResultadoBusquedaStyles';

const ResultadoBusqueda = ({ resultados, onSeleccionarCiudad }) => {
  // Renderizar cada resultado de búsqueda
  const renderItemBusqueda = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultadoItem} 
      onPress={() => onSeleccionarCiudad(item)}
    >
      <Text style={styles.nombreCiudad}>{item.name}, {item.country}</Text>
      {item.region && <Text style={styles.estadoCiudad}>{item.region}</Text>}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={resultados}
      renderItem={renderItemBusqueda}
      keyExtractor={(item, index) => `${item.lat}-${item.lon}-${index}`}
      style={styles.resultadosList}
    />
  );
};

export default ResultadoBusqueda;