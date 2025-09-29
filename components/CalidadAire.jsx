import React from 'react';
import { View, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import styles from './estilos/CalidadAireStyles';

const CalidadAire = ({ calidadAire, obtenerNivelCalidadAire }) => {
  // Verificar si calidadAire y sus propiedades existen antes de acceder a ellas
  const nivelCalidadAire = calidadAire && calidadAire.current && 
                          calidadAire.current.air_quality ? 
                          calidadAire.current.air_quality['us-epa-index'] : 
                          undefined;
                          
  // Obtener información de calidad del aire usando el nivel
  const infoCalidadAire = obtenerNivelCalidadAire(nivelCalidadAire);

  return (
    <Card style={styles.detailCard}>
      <Card.Content>
        <Title style={styles.airQualityTitle}>Calidad del Aire</Title>
        <View style={[styles.airQualityIndicator, { backgroundColor: infoCalidadAire.color }]}>
          <Text style={styles.airQualityText}>{infoCalidadAire.texto}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CalidadAire;