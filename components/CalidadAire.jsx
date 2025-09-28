import React from 'react';
import { View, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import styles from './estilos/CalidadAireStyles';

const CalidadAire = ({ calidadAire, obtenerNivelCalidadAire }) => {
  const nivelCalidadAire = calidadAire?.current?.air_quality?.['us-epa-index'];
  const infoCalidadAire = obtenerNivelCalidadAire(nivelCalidadAire);

  return (
    <Card style={styles.detailCard}>
      <Card.Content>
        <Title>Calidad del Aire</Title>
        <View style={[styles.airQualityIndicator, { backgroundColor: infoCalidadAire.color }]}>
          <Text style={styles.airQualityText}>{infoCalidadAire.texto}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CalidadAire;