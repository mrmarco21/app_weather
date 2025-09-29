import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import BuscadorCiudad from '../components/BuscadorCiudad';
import DetalleClimaSeleccionado from '../components/DetalleClimaSeleccionado';
import EstadoBusqueda from '../components/EstadoBusqueda';
import ResultadoBusqueda from '../components/ResultadoBusqueda';
import styles from '../estilos/busquedaStyles';
import { buscarCiudad, obtenerClimaActual } from '../servicios/climaApi';

const Busqueda = ({ navigation }) => {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [datosClima, setDatosClima] = useState(null);

  // Función para buscar ciudades
  const buscarCiudades = async () => {
    if (consulta.trim() === '') return;
    
    try {
      setCargando(true);
      setError(null);
      setCiudadSeleccionada(null);
      setDatosClima(null);
      
      const resultadosBusqueda = await buscarCiudad(consulta);
      setResultados(resultadosBusqueda);
      
      setCargando(false);
    } catch (err) {
      console.error('Error al buscar ciudades:', err);
      setError('No se pudieron obtener resultados de búsqueda');
      setCargando(false);
    }
  };

  // Función para seleccionar una ciudad y obtener su clima
  const seleccionarCiudad = async (ciudad) => {
    try {
      setCargando(true);
      setCiudadSeleccionada(ciudad);
      
      const datosClimaActual = await obtenerClimaActual(
        ciudad.lat,
        ciudad.lon
      );
      
      setDatosClima(datosClimaActual);
      
      // Guardar en favoritos
      guardarEnFavoritos(ciudad, datosClimaActual);
      
      // Limpiar el buscador
      setConsulta('');
      setResultados([]);
      
      setCargando(false);
    } catch (err) {
      console.error('Error al obtener clima de la ciudad:', err);
      setError('No se pudo obtener información del clima para esta ciudad');
      setCargando(false);
    }
  };

  // Función para guardar ciudad en favoritos
  const guardarEnFavoritos = async (ciudad, clima) => {
    try {
      // Obtener favoritos actuales
      const favoritosGuardados = await AsyncStorage.getItem('favoritos');
      let favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
      
      // Verificar si la ciudad ya está en favoritos
      const yaExiste = favoritos.some(fav => fav.ciudad.lat === ciudad.lat && fav.ciudad.lon === ciudad.lon);
      
      if (!yaExiste) {
        // Agregar a favoritos al principio de la lista
        favoritos.unshift({
          id: Date.now().toString(),
          ciudad: ciudad,
          ultimoClima: clima,
          fechaGuardado: new Date().toISOString()
        });
        
        // Limitar a 10 favoritos, eliminando el más antiguo si es necesario
        if (favoritos.length > 10) {
          favoritos = favoritos.slice(0, 10);
        }
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      }
    } catch (err) {
      console.error('Error al guardar en favoritos:', err);
    }
  };

  // Función para obtener la URL de imagen de fondo
  const obtenerImagenFondo = () => {
    if (datosClima && datosClima.current) {
      // Si hay datos de clima, usar el código de condición
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
            : 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&h=1920&fit=crop&crop=center'; // Cielo nocturno nublado
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
    } else {
      // URL por defecto - cielo azul para búsqueda
      return { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' };
    }
  };

  // Renderizar cada resultado de búsqueda
  const renderItemBusqueda = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultadoItem} 
      onPress={() => seleccionarCiudad(item)}
    >
      <Text style={styles.nombreCiudad}>{item.name}, {item.country}</Text>
      {item.region && <Text style={styles.estadoCiudad}>{item.region}</Text>}
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={obtenerImagenFondo()} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <BuscadorCiudad 
          consulta={consulta} 
          setConsulta={setConsulta} 
          onBuscar={buscarCiudades} 
        />

        {!cargando && !ciudadSeleccionada && resultados.length > 0 && (
          <ResultadoBusqueda 
            resultados={resultados} 
            onSeleccionarCiudad={seleccionarCiudad} 
          />
        )}

        {!cargando && ciudadSeleccionada && datosClima && (
          <DetalleClimaSeleccionado 
            ciudadSeleccionada={ciudadSeleccionada} 
            datosClima={datosClima} 
          />
        )}

        <EstadoBusqueda 
          cargando={cargando} 
          error={error} 
          consulta={consulta} 
          resultados={resultados} 
        />
      </View>
    </ImageBackground>
  );
};

export default Busqueda;