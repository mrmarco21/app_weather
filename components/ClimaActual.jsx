import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './estilos/ClimaActualStyles';

const ClimaActual = ({ location, current, formatearFecha }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.cityName}>{location.name}</Text>
        <Text style={styles.date}>{formatearFecha(location.localtime)}</Text>
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