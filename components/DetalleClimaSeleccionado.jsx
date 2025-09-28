import React from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './estilos/DetalleClimaSeleccionadoStyles';

const DetalleClimaSeleccionado = ({ ciudadSeleccionada, datosClima }) => {
  return (
    <Card style={styles.climaCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View>
            <Title style={styles.cardTitle}>{ciudadSeleccionada.name}</Title>
            <Paragraph>{ciudadSeleccionada.country}</Paragraph>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.tempText}>{Math.round(datosClima.current.temp_c)}°C</Text>
          </View>
        </View>
        
        <View style={styles.climaInfo}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="water-outline" size={20} color="#0099ff" />
              <Text>Humedad: {datosClima.current.humidity}%</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="speedometer-outline" size={20} color="#0099ff" />
              <Text>Presión: {datosClima.current.pressure_mb} hPa</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="eye-outline" size={20} color="#0099ff" />
              <Text>Visibilidad: {datosClima.current.vis_km} km</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="navigate-outline" size={20} color="#0099ff" />
              <Text>Viento: {datosClima.current.wind_kph} km/h</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.descripcionContainer}>
          <Text style={styles.descripcionText}>
            {datosClima.current.condition.text}
          </Text>
        </View>
        
        <View style={styles.favoritoInfo}>
          <Ionicons name="heart" size={16} color="#FF6B6B" />
          <Text style={styles.favoritoText}>Guardado en favoritos</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default DetalleClimaSeleccionado;