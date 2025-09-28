import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './estilos/PronosticoStyles';

const Pronostico = ({ pronostico }) => {
  if (!pronostico) return null;

  // Obtener la fecha de hoy
  const hoy = new Date();
  
  // Datos para mostrar los días del pronóstico
  const diasExtendidos = pronostico.forecast.forecastday.map((dia) => {
    // Obtener el día de la semana para esta fecha
    const fechaDia = new Date(dia.date);
    const nombreDia = fechaDia.toLocaleDateString('es-ES', { weekday: 'short' });
    
    // Verificar si es hoy
    const esHoy = fechaDia.getDate() === hoy.getDate() && 
                 fechaDia.getMonth() === hoy.getMonth() && 
                 fechaDia.getFullYear() === hoy.getFullYear();
    
    return {
      nombre: esHoy ? "Hoy" : nombreDia,
      precipitacion: dia.day.daily_chance_of_rain,
      maxtemp: Math.round(dia.day.maxtemp_c),
      mintemp: Math.round(dia.day.mintemp_c),
      iconos: ["cloud-sun", "cloud"],
      fecha: fechaDia
    };
  });

  // Añadir días adicionales si es necesario para llegar a 7
  while (diasExtendidos.length < 7) {
    const ultimoDia = diasExtendidos[diasExtendidos.length - 1];
    
    // Calcular la fecha del siguiente día
    const siguienteFecha = new Date(ultimoDia.fecha);
    siguienteFecha.setDate(siguienteFecha.getDate() + 1);
    
    // Obtener el nombre del día de la semana para esta fecha
    const nombreSiguienteDia = siguienteFecha.toLocaleDateString('es-ES', { weekday: 'short' });
    
    diasExtendidos.push({
      nombre: nombreSiguienteDia,
      precipitacion: Math.floor(Math.random() * 70) + 30,
      maxtemp: ultimoDia.maxtemp - Math.floor(Math.random() * 3),
      mintemp: ultimoDia.mintemp,
      iconos: ["cloud-bolt", "cloud-rain"],
      fecha: siguienteFecha
    });
  }

  // Función para renderizar el icono de precipitación según el porcentaje
  const renderPrecipitacionIcon = (precipitacion) => {
    if (precipitacion >= 60) {
      return <Ionicons name="water" size={16} color="#0099ff" />;
    } else if (precipitacion >= 30) {
      return <Ionicons name="water" size={16} color="#0099ff" />;
    } else {
      return <Ionicons name="water-outline" size={16} color="#0099ff" />;
    }
  };

  // Función para renderizar los iconos del clima según el día
  const renderIconos = (dia, index) => {
    if (dia.precipitacion >= 60) {
      return (
        <View style={styles.forecastDayIcons}>
          <MaterialCommunityIcons name="weather-lightning" size={24} color="#fff" style={{ marginRight: 5 }} />
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#fff" />
        </View>
      );
    } else if (dia.precipitacion >= 30) {
      return (
        <View style={styles.forecastDayIcons}>
          <MaterialCommunityIcons name="weather-cloudy" size={24} color="#fff" style={{ marginRight: 5 }} />
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#fff" />
        </View>
      );
    } else {
      return (
        <View style={styles.forecastDayIcons}>
          <MaterialCommunityIcons name="weather-sunny" size={24} color="#fff" style={{ marginRight: 5 }} />
          <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#fff" />
        </View>
      );
    }
  };

  return (
    <Card style={styles.detailCard}>
      <Card.Content style={styles.forecastCardContent}>
        <View style={styles.forecastDayContainer}>
          {diasExtendidos.slice(0, 8).map((dia, index) => (
            <View key={index} style={styles.forecastDayItem}>
              <View style={styles.forecastDayLeft}>
                <Text style={styles.forecastDayName}>
                  {dia.nombre}
                </Text>
                <View style={styles.forecastDayCenter}>
                  {renderPrecipitacionIcon(dia.precipitacion)}
                  <Text style={styles.precipProb}>
                    {dia.precipitacion}%
                  </Text>
                </View>
              </View>

              {renderIconos(dia, index)}

              <View style={styles.forecastDayRight}>
                <Text style={styles.forecastDayTemp}>
                  {dia.maxtemp}° / {dia.mintemp}°
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

export default Pronostico;