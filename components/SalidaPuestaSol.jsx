import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente que muestra la información de salida y puesta del sol
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.datosAstronomicos - Datos astronómicos de la API
 * @param {boolean} props.esDeDia - Indica si es de día o de noche
 */
const SalidaPuestaSol = ({ datosAstronomicos, esDeDia = true }) => {
  // Si no hay datos astronómicos, no renderizar nada
  if (!datosAstronomicos || !datosAstronomicos.astronomy || !datosAstronomicos.astronomy.astro) {
    return null;
  }

  const { sunrise, sunset } = datosAstronomicos.astronomy.astro;

  // Colores para día y noche
  const coloresGradiente = esDeDia 
    ? ['rgba(255, 204, 0, 0.8)', 'rgba(200, 200, 200, 0.3)'] // Colores para el día (amarillo a gris)
    : ['rgba(70, 90, 150, 0.8)', 'rgba(20, 30, 70, 0.3)']; // Colores para la noche (azul oscuro)
  
  const colorFondo = esDeDia 
    ? 'rgba(50, 70, 120, 0.7)' // Azul semi-transparente para el día
    : 'rgba(30, 40, 70, 0.8)'; // Azul más oscuro para la noche

  return (
    <View style={[styles.container, { backgroundColor: colorFondo }]}>
      <LinearGradient
        colors={coloresGradiente}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <View style={styles.indicadorSol}>
          {esDeDia ? (
            // Mostrar sol durante el día
            <View style={styles.circuloSol} />
          ) : (
            // Mostrar luna durante la noche
            <Ionicons name="moon" size={16} color="#E1E1E1" />
          )}
        </View>
      </LinearGradient>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Salida del sol</Text>
          <Text style={styles.infoValue}>{sunrise}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Atardecer</Text>
          <Text style={styles.infoValue}>{sunset}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  gradient: {
    height: 60,
    borderRadius: 10,
    position: 'relative',
    marginBottom: 15,
  },
  indicadorSol: {
    position: 'absolute',
    top: -5,
    left: '30%', // Posición aproximada en el arco
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuloSol: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFCC00',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '300',
  },
  infoValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SalidaPuestaSol;