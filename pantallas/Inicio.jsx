import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { obtenerClimaActual, obtenerPronostico, obtenerCalidadAire } from '../servicios/climaApi';
import { useRoute } from '@react-navigation/native';

// Importar componentes
import ClimaActual from '../components/ClimaActual';
import DetallesClima from '../components/DetallesClima';
import CalidadAire from '../components/CalidadAire';
import Pronostico from '../components/Pronostico';
import PronosticoHora from '../components/PronosticoHora';

// Importar estilos
import inicioStyles from '../estilos/inicioStyles';

const Inicio = () => {
  const route = useRoute();
  const [ubicacion, setUbicacion] = useState(null);
  const [datosClima, setDatosClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [calidadAire, setCalidadAire] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [esUbicacionActual, setEsUbicacionActual] = useState(true);
  const [actualizando, setActualizando] = useState(false);

  // Función para obtener la ubicación actual y sus datos climáticos
  const obtenerUbicacionActual = async () => {
    try {
      setCargando(true);
      setEsUbicacionActual(true);
      
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Se requiere permiso para acceder a la ubicación');
        setCargando(false);
        return;
      }

      // Obtener ubicación actual
      let ubicacionActual = await Location.getCurrentPositionAsync({});
      setUbicacion(ubicacionActual.coords);

      // Obtener datos del clima
      const datosClimaActual = await obtenerClimaActual(
        ubicacionActual.coords.latitude,
        ubicacionActual.coords.longitude
      );
      setDatosClima(datosClimaActual);

      // Obtener pronóstico
      const datosPronostico = await obtenerPronostico(
        ubicacionActual.coords.latitude,
        ubicacionActual.coords.longitude
      );
      setPronostico(datosPronostico);

      // Obtener calidad del aire
      const datosCalidadAire = await obtenerCalidadAire(
        ubicacionActual.coords.latitude,
        ubicacionActual.coords.longitude
      );
      setCalidadAire(datosCalidadAire);

      setCargando(false);
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudo obtener la información del clima');
      setCargando(false);
    }
  };

  // Función para actualizar los datos del clima según la ubicación actual
  const actualizarDatosClima = async () => {
    try {
      setActualizando(true);
      
      if (esUbicacionActual) {
        // Si estamos en la ubicación actual, obtenemos los datos nuevamente
        await obtenerUbicacionActual();
      } else if (ubicacion) {
        // Si estamos viendo una ciudad favorita, actualizamos sus datos
        const datosClimaActual = await obtenerClimaActual(
          ubicacion.latitude,
          ubicacion.longitude
        );
        setDatosClima(datosClimaActual);

        // Obtener pronóstico actualizado
        const datosPronostico = await obtenerPronostico(
          ubicacion.latitude,
          ubicacion.longitude
        );
        setPronostico(datosPronostico);

        // Obtener calidad del aire actualizada
        const datosCalidadAire = await obtenerCalidadAire(
          ubicacion.latitude,
          ubicacion.longitude
        );
        setCalidadAire(datosCalidadAire);
      }
      
      setActualizando(false);
    } catch (err) {
      console.error('Error al actualizar datos del clima:', err);
      setError('No se pudo actualizar la información del clima');
      setActualizando(false);
    }
  };

  useEffect(() => {
    // Verificar si hay una ciudad seleccionada desde Favoritos
    if (route.params?.ciudadSeleccionada && route.params?.datosClima) {
      setUbicacion({
        latitude: route.params.ciudadSeleccionada.lat,
        longitude: route.params.ciudadSeleccionada.lon
      });
      setDatosClima(route.params.datosClima);
      setEsUbicacionActual(false);
      setCargando(false);
      
      // Obtener pronóstico y calidad del aire para la ciudad seleccionada
      const obtenerDatosAdicionales = async () => {
        try {
          const datosPronostico = await obtenerPronostico(
            route.params.ciudadSeleccionada.lat,
            route.params.ciudadSeleccionada.lon
          );
          setPronostico(datosPronostico);
          
          const datosCalidadAire = await obtenerCalidadAire(
            route.params.ciudadSeleccionada.lat,
            route.params.ciudadSeleccionada.lon
          );
          setCalidadAire(datosCalidadAire);
        } catch (err) {
          console.error('Error al obtener datos adicionales:', err);
        }
      };
      
      obtenerDatosAdicionales();
    } else if (route.params?.resetToCurrentLocation) {
      // Si se solicita volver a la ubicación actual
      obtenerUbicacionActual();
    } else {
      // Obtener ubicación actual si no hay ciudad seleccionada
      obtenerUbicacionActual();
    }
  }, [route.params]);

  // Función para obtener el color de fondo según el clima
  const obtenerColorFondo = () => {
    if (!datosClima) return ['#4c669f', '#3b5998', '#192f6a']; // Azul por defecto

    const condicion = datosClima.current.condition.text.toLowerCase();
    const esDeDia = datosClima.current.is_day === 1;

    if (condicion.includes('clear') || condicion.includes('sunny')) {
      return esDeDia ? ['#56CCF2', '#2F80ED', '#1E3B70'] : ['#0F2027', '#203A43', '#2C5364'];
    } else if (condicion.includes('cloud') || condicion.includes('overcast')) {
      return esDeDia ? ['#E0EAFC', '#CFDEF3', '#A1C4FD'] : ['#3E5151', '#DECBA4', '#606c88'];
    } else if (condicion.includes('rain') || condicion.includes('drizzle')) {
      return ['#3E5151', '#DECBA4', '#000046'];
    } else if (condicion.includes('thunder')) {
      return ['#0F2027', '#203A43', '#2C5364'];
    } else if (condicion.includes('snow')) {
      return ['#E0EAFC', '#CFDEF3', '#A1C4FD'];
    } else if (condicion.includes('mist') || condicion.includes('fog')) {
      return ['#606c88', '#3f4c6b', '#606c88'];
    } else {
      return ['#4c669f', '#3b5998', '#192f6a'];
    }
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  // Función para obtener el nivel de calidad del aire
  const obtenerNivelCalidadAire = (indice) => {
    if (!indice) return { texto: 'No disponible', color: '#999' };
    
    if (indice <= 3) return { texto: 'Buena', color: '#4CAF50' };
    if (indice <= 6) return { texto: 'Moderada', color: '#FFEB3B' };
    if (indice <= 9) return { texto: 'Poco saludable', color: '#FF9800' };
    if (indice <= 12) return { texto: 'Insalubre', color: '#F44336' };
    return { texto: 'Muy insalubre', color: '#9C27B0' };
  };

  if (cargando) {
    return (
      <View style={inicioStyles.centeredContainer}>
        <ActivityIndicator size="large" color="#0099ff" />
        <Text style={inicioStyles.loadingText}>Obteniendo datos del clima...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={inicioStyles.centeredContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#FF6B6B" />
        <Text style={inicioStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!datosClima) {
    return (
      <View style={inicioStyles.centeredContainer}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[inicioStyles.container, { backgroundColor: obtenerColorFondo()[0] }]}>
      <ClimaActual 
        location={datosClima.location} 
        current={datosClima.current} 
        formatearFecha={formatearFecha}
        mostrarBotonRegreso={!esUbicacionActual}
        onActualizar={actualizarDatosClima}
        actualizando={actualizando}
      />

      <View style={inicioStyles.detailsContainer}>
        <DetallesClima current={datosClima.current} />
        
        <PronosticoHora pronostico={pronostico} />
        
        <Pronostico pronostico={pronostico} />
        
        <CalidadAire 
          calidadAire={calidadAire} 
          obtenerNivelCalidadAire={obtenerNivelCalidadAire} 
        />
      </View>
    </ScrollView>
  );
};

export default Inicio;