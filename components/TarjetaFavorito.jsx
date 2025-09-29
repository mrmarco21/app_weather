import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { mapearCiudadAZonaHoraria, obtenerHoraExacta } from '../servicios/climaApi';
import styles from './estilos/TarjetaFavoritoStyles';

const TarjetaFavorito = ({ favorito, index, formatearFecha, actualizarClima, confirmarEliminacion, onCiudadSeleccionada }) => {
  const { ciudad, ultimoClima, fechaGuardado, id } = favorito;
  const [expandido, setExpandido] = useState(false);
  const [horaLocal, setHoraLocal] = useState(null);
  const [cargandoHora, setCargandoHora] = useState(false);
  const [diferenciaHoraria, setDiferenciaHoraria] = useState(null);
  const [zonaHoraria, setZonaHoraria] = useState(null);
  const [horaActualizada, setHoraActualizada] = useState(new Date());
  const [horaFormateada, setHoraFormateada] = useState('');

  // Función para obtener la hora local de la ciudad
  const obtenerHoraLocal = async () => {
    try {
      setCargandoHora(true);
      // Usar la función de mapeo para obtener la región y ciudad correctas
      const { region, ciudad: ciudadApi } = mapearCiudadAZonaHoraria(ciudad.country, ciudad.name);

      const datosHora = await obtenerHoraExacta(region, ciudadApi);
      // Guardar la diferencia horaria y zona horaria para cálculos futuros
      setDiferenciaHoraria(datosHora.diferenciaMs);
      setZonaHoraria(datosHora.timezone);
      setHoraLocal(datosHora.formatted);
      setCargandoHora(false);
    } catch (error) {
      console.error('Error al obtener hora local:', error);
      // En caso de error, usar la hora del dispositivo y establecer una zona horaria predeterminada
      const ahora = new Date();
      setHoraLocal(ahora.toLocaleString('es-ES', { hour12: false }));
      // Usar una zona horaria predeterminada basada en el país
      const zonasPredeterminadas = {
        'Spain': 'Europe/Madrid',
        'España': 'Europe/Madrid',
        'United States': 'America/New_York',
        'Estados Unidos': 'America/New_York',
        // Añadir más países según sea necesario
      };
      setZonaHoraria(zonasPredeterminadas[ciudad.country] || 'UTC');
      setCargandoHora(false);
    }
  };

  // Función para calcular la hora actual de la ciudad basada en la zona horaria
  const calcularHoraActual = () => {
    if (zonaHoraria !== null) {
      const ahora = new Date();

      // Usar Intl.DateTimeFormat con la zona horaria específica
      const opciones = {
        timeZone: zonaHoraria,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };

      // Formatear la fecha usando la zona horaria específica
      return new Intl.DateTimeFormat('es-ES', opciones).format(ahora);
    }
    return horaLocal;
  };

  // Obtener la hora local al cargar el componente
  useEffect(() => {
    obtenerHoraLocal();
    // Limpiar los estados cuando cambia la ciudad
    return () => {
      setHoraLocal(null);
      setDiferenciaHoraria(null);
      setZonaHoraria(null);
      setHoraFormateada('');
    };
  }, [ciudad.name, ciudad.country]);

  // Actualizar la hora cada segundo basándose en la hora del dispositivo y la zona horaria de la ciudad
  useEffect(() => {
    // Actualizar inmediatamente al montar el componente
    setHoraActualizada(new Date());

    // Si tenemos zona horaria, actualizar la hora formateada
    if (zonaHoraria !== null) {
      setHoraFormateada(calcularHoraActual());
    }

    const intervalo = setInterval(() => {
      const nuevaHora = new Date();
      setHoraActualizada(nuevaHora);

      // Actualizar la hora formateada si tenemos zona horaria
      if (zonaHoraria !== null) {
        setHoraFormateada(calcularHoraActual());
      }
    }, 1000); // Actualizar cada segundo para mantener precisión

    return () => clearInterval(intervalo);
  }, [zonaHoraria, ciudad.name]); // Añadir zona horaria y ciudad.name como dependencias

  const handlePress = () => {
    setExpandido(!expandido);
  };

  const handleSeleccionarCiudad = () => {
    if (onCiudadSeleccionada) {
      onCiudadSeleccionada(favorito);
    }
  };

  const handleEliminar = () => {
    console.log('=== FUNCIÓN handleEliminar EJECUTADA ===');
    console.log('Ciudad:', ciudad.name);
    console.log('ID:', id);
    console.log('confirmarEliminacion disponible:', !!confirmarEliminacion);
    
    if (confirmarEliminacion) {
      confirmarEliminacion(id, ciudad.name);
    } else {
      console.error('ERROR: confirmarEliminacion no está disponible');
    }
  };

  return (
    <Card style={[styles.favoritoCard, expandido && styles.favoritoCardExpandido]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View>
              <Title style={styles.cardTitle}>{ciudad.name}</Title>
              <Paragraph style={styles.cardTitle}>{ciudad.country}</Paragraph>
              <Text style={styles.fechaText}>
                {cargandoHora ? 'Cargando hora local...' :
                  diferenciaHoraria !== null ? horaFormateada :
                    horaLocal ? horaLocal :
                      ultimoClima?.location?.localtime ? formatearFecha(ultimoClima.location.localtime, true) :
                        formatearFecha(fechaGuardado, true)}
              </Text>
            </View>
            <View style={styles.tempContainer}>
              <Text style={styles.tempText}>
                {Math.round(ultimoClima.current.temp_c)}°C
              </Text>
              <Text style={styles.minMaxTemp}>
                {ultimoClima.forecast?.forecastday[1]?.day?.maxtemp_c ? `${Math.round(ultimoClima.forecast.forecastday[1].day.maxtemp_c)}° / ${Math.round(ultimoClima.forecast.forecastday[1].day.mintemp_c)}°` : ''}
              </Text>
            </View>
          </View>

          {expandido ? (
            <View style={styles.climaInfoExpandido}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="water-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Humedad: {ultimoClima.current.humidity}%</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="speedometer-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Presión: {ultimoClima.current.pressure_mb} hPa</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="eye-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Visibilidad: {ultimoClima.current.vis_km} km</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="thermometer-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Sensación: {ultimoClima.current.feelslike_c}°C</Text>
                </View>
              </View>

              <View style={styles.descripcionContainer}>
                <Text style={styles.descripcionText}>
                  {ultimoClima.current.condition.text}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.climaInfo}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="water-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Humedad: {ultimoClima.current.humidity}%</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="speedometer-outline" size={20} color="#0099ff" />
                  <Text style={styles.infoItemText}>Presión: {ultimoClima.current.pressure_mb} hPa</Text>
                </View>
              </View>

              <View style={styles.descripcionContainer}>
                <Text style={styles.descripcionText}>
                  {ultimoClima.current.condition.text}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.actualizadoContainer}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.actualizadoText}>
              Actualizado: {formatearFecha(fechaGuardado)}
            </Text>
          </View>
        </Card.Content>
      </TouchableOpacity>

      <View style={styles.botonesContainer}>
            <Button 
              mode="contained"
              onPress={() => handleSeleccionarCiudad()}
              style={styles.botonVerClima}
            >
              Ver clima
            </Button>
            <Button
              mode="contained"
              onPress={() => actualizarClima(favorito, index)}
              style={styles.botonActualizar}
            >
              Actualizar
            </Button>
            <TouchableOpacity
              onPress={handleEliminar}
              style={styles.botonEliminarTouchable}
              activeOpacity={0.7}
            >
              <Text style={styles.botonEliminarText}>Eliminar</Text>
            </TouchableOpacity>
      </View>
    </Card>
  );
};

export default TarjetaFavorito;