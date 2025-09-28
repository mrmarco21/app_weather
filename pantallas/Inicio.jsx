import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, View } from 'react-native';
import { obtenerCalidadAire, obtenerClimaActual, obtenerPronostico } from '../servicios/climaApi';

// Importar componentes
import CalidadAire from '../components/CalidadAire';
import ClimaActual from '../components/ClimaActual';
import DetallesClima from '../components/DetallesClima';
import Pronostico from '../components/Pronostico';
import PronosticoHora from '../components/PronosticoHora';

// Importar estilos
import inicioStyles from '../estilos/inicioStyles';

// No necesitamos importar imágenes locales, usaremos URLs dinámicas

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

  // Función para obtener la URL de imagen de fondo según el código de condición de la API
  const obtenerImagenFondo = () => {
    if (!datosClima) {
      // URL por defecto - cielo azul
      return { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' };
    }

    const codigoCondicion = datosClima.current.condition.code;
    const esDeDia = datosClima.current.is_day === 1;
    
    // URLs específicas para cada condición climática
    let urlImagen;
    
    switch (codigoCondicion) {
      case 1000: // Soleado/Clear
        urlImagen = esDeDia 
          ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' // Cielo soleado
          : 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&h=1920&fit=crop&crop=center'; // Cielo nocturno estrellado
        break;
      case 1003: // Parcialmente nublado
        urlImagen = esDeDia
          ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' // Cielo con nubes
          : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Cielo nocturno nublado
        break;
      case 1006: // Nublado
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Cielo nublado
        break;
      case 1009: // Muy nublado
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Cielo muy nublado
        break;
      case 1030: // Niebla
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Niebla
        break;
      case 1063: // Lluvia ligera
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Lluvia
        break;
      case 1087: // Lluvia intensa
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Lluvia intensa
        break;
      case 1114: // Nieve ligera
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Nieve
        break;
      case 1219: // Nieve intensa
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Tormenta de nieve
        break;
      case 1273: // Tormenta eléctrica
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Tormenta
        break;
      default:
        urlImagen = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center'; // Por defecto
    }

    return { uri: urlImagen };
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
      <ImageBackground 
        source={obtenerImagenFondo()}
        style={inicioStyles.container}
        resizeMode="cover"
      >
        <View style={inicioStyles.centeredContainer}>
          <ActivityIndicator size="large" color="#0099ff" />
          <Text style={inicioStyles.loadingText}>Obteniendo datos del clima...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground 
        source={obtenerImagenFondo()}
        style={inicioStyles.container}
        resizeMode="cover"
      >
        <View style={inicioStyles.centeredContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#FF6B6B" />
          <Text style={inicioStyles.errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!datosClima) {
    return (
      <ImageBackground 
        source={obtenerImagenFondo()}
        style={inicioStyles.container}
        resizeMode="cover"
      >
        <View style={inicioStyles.centeredContainer}>
          <Text>No hay datos disponibles</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={obtenerImagenFondo()}
      style={inicioStyles.container}
      resizeMode="cover"
    >
      <ScrollView style={inicioStyles.scrollContainer}>
        <ClimaActual 
          location={datosClima.location} 
          current={datosClima.current} 
          formatearFecha={formatearFecha}
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
    </ImageBackground>
  );
};

export default Inicio;