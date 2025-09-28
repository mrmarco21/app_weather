import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import styles from './estilos/PronosticoHoraStyles';

const PronosticoHora = ({ pronostico }) => {
  if (!pronostico || !pronostico.forecast || !pronostico.forecast.forecastday[0].hour) return null;
  
  // Obtener la hora actual
  const horaActual = new Date().getHours();
  
  // Filtrar las horas desde la hora actual hasta las próximas 24 horas
  const horasPronostico = [];
  let diaActual = 0;
  let horaIndex = horaActual;
  
  // Recopilar las próximas 24 horas
  for (let i = 0; i < 24; i++) {
    if (horaIndex >= 24) {
      horaIndex = 0;
      diaActual++;
      // Verificar si tenemos datos para el siguiente día
      if (!pronostico.forecast.forecastday[diaActual]) break;
    }
    
    if (pronostico.forecast.forecastday[diaActual] && 
        pronostico.forecast.forecastday[diaActual].hour && 
        pronostico.forecast.forecastday[diaActual].hour[horaIndex]) {
      horasPronostico.push(pronostico.forecast.forecastday[diaActual].hour[horaIndex]);
    }
    
    horaIndex++;
  }

  // Formatear la hora en formato 12h (2:00, 3:00, etc.)
  const formatearHora = (fechaCompleta) => {
    const fecha = new Date(fechaCompleta);
    let horas = fecha.getHours();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // la hora '0' debe ser '12'
    return `${horas}:00 ${ampm}`;
  };

  // Mostrar "Ahora" para la primera hora
  const etiquetaHora = (index, fechaCompleta) => {
    if (index === 0) return "Ahora";
    return formatearHora(fechaCompleta);
  };
  
  return (
    <Card style={styles.detailCard}>
      <Card.Content>
        <Title style={styles.forecastTitle}>Pronóstico por hora</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
          {horasPronostico.map((hora, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastDay}>
                {etiquetaHora(index, hora.time)}
              </Text>
              <Image 
                source={{ uri: `https:${hora.condition.icon}` }} 
                style={styles.forecastIcon} 
              />
              <Text style={styles.forecastTemp}>
                {Math.round(hora.temp_c)}°C
              </Text>
              {hora.chance_of_rain > 0 && (
                <Text style={styles.precipProb}>
                  {hora.chance_of_rain}%
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default PronosticoHora;