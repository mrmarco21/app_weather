import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './estilos/ClimaActualStyles';

const ClimaActual = ({ location, current, formatearFecha, mostrarBotonRegreso = false, onActualizar, actualizando = false }) => {
  const navigation = useNavigation();

  const volverAUbicacionActual = () => {
    // Navegar a la pantalla de inicio sin parámetros para usar la ubicación actual
    navigation.navigate('Inicio', { resetToCurrentLocation: true });
  };

  return (
    <>
      <View style={styles.header}>
        {mostrarBotonRegreso && (
          <TouchableOpacity 
            style={styles.botonRegreso}
            onPress={volverAUbicacionActual}
          >
            <Ionicons name="location" size={24} color="#0099ff" />
            <Text style={styles.textoBotonRegreso}>Mi ubicación</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.cityName}>{location.name}</Text>
        <Text style={styles.date}>{formatearFecha(location.localtime)}</Text>
        
        <TouchableOpacity 
          style={styles.botonActualizar}
          onPress={onActualizar}
          disabled={actualizando}
        >
          {actualizando ? (
            <ActivityIndicator size="small" color="#0099ff" />
          ) : (
            <Ionicons name="refresh" size={24} color="#0099ff" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mainInfo}>
        <Image 
          source={{ uri: `https:${current.condition.icon}` }} 
          style={styles.weatherIcon} 
        />
        <Text style={styles.temperature}>{Math.round(current.temp_c)}°C</Text>
        <Text style={styles.description}>{current.condition.text}</Text>
      </View>
    </>
  );
};

export default ClimaActual;