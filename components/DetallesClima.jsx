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
            <Ionicons name="thermometer-outline" size={24} color="#fff" />
            <Title style={styles.detailItemText}>Sensación</Title>
            <Paragraph style={styles.detailItemText}>{Math.round(current.feelslike_c)}°C</Paragraph>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color="#fff" />
            <Title style={styles.detailItemText}>Humedad</Title>
            <Paragraph style={styles.detailItemText}>{current.humidity}%</Paragraph>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={24} color="#fff" />
            <Title style={styles.detailItemText}>Viento</Title>
            <Paragraph style={styles.detailItemText}>{current.wind_kph} km/h</Paragraph>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="eye-outline" size={24} color="#fff" />
            <Title style={styles.detailItemText}>Visibilidad</Title>
            <Paragraph style={styles.detailItemText}>{current.vis_km} km</Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default DetallesClima;