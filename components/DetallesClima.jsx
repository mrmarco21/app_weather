import React from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/DetallesClimaStyles';

const DetallesClima = ({ current }) => {
  return (
    <Card style={styles.detailCard}>
      <Card.Content>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="thermometer-outline" size={24} color="#0099ff" />
            <Title>Sensación</Title>
            <Paragraph>{Math.round(current.feelslike_c)}°C</Paragraph>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color="#0099ff" />
            <Title>Humedad</Title>
            <Paragraph>{current.humidity}%</Paragraph>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={24} color="#0099ff" />
            <Title>Viento</Title>
            <Paragraph>{current.wind_kph} km/h</Paragraph>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="eye-outline" size={24} color="#0099ff" />
            <Title>Visibilidad</Title>
            <Paragraph>{current.vis_km} km</Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default DetallesClima;