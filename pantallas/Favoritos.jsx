import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, ScrollView, View } from 'react-native';
import ClimaActual from '../components/ClimaActual';
import DetallesClima from '../components/DetallesClima';
import EncabezadoFavoritos from '../components/EncabezadoFavoritos';
import EstadoFavoritos from '../components/EstadoFavoritos';
import Pronostico from '../components/Pronostico';
import TarjetaFavorito from '../components/TarjetaFavorito';
import styles from '../estilos/favoritosStyles';
import { obtenerPronostico } from '../servicios/climaApi';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const navigation = useNavigation();

  // Cargar favoritos al iniciar y cuando la pantalla obtiene foco
  useEffect(() => {
    cargarFavoritos();
    
    // Suscribirse al evento de foco de la pantalla
    const unsubscribe = navigation.addListener('focus', () => {
      cargarFavoritos();
    });
    
    // Limpiar la suscripción al desmontar
    return unsubscribe;
  }, [navigation]);

  // Función para cargar favoritos desde AsyncStorage
  const cargarFavoritos = async () => {
    try {
      setCargando(true);
      const favoritosGuardados = await AsyncStorage.getItem('favoritos');
      
      if (favoritosGuardados) {
        const favoritosParseados = JSON.parse(favoritosGuardados);
        setFavoritos(favoritosParseados);
      }
      
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      setCargando(false);
    }
  };

  // Función para actualizar el clima de un favorito
  const actualizarClima = async (favorito, index) => {
    try {
      const datosPronostico = await obtenerPronostico(
        favorito.ciudad.lat,
        favorito.ciudad.lon,
        3
      );
      
      // Actualizar el favorito con el nuevo clima
      const nuevosFavoritos = [...favoritos];
      nuevosFavoritos[index] = {
        ...favorito,
        ultimoClima: datosPronostico,
        fechaGuardado: new Date().toISOString()
      };
      
      setFavoritos(nuevosFavoritos);
      
      // Guardar en AsyncStorage
      await AsyncStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      
      return true;
    } catch (error) {
      console.error('Error al actualizar clima:', error);
      return false;
    }
  };

  // Función para actualizar todos los favoritos
  const actualizarTodosFavoritos = async () => {
    if (favoritos.length === 0) return;
    
    setActualizando(true);
    
    try {
      const promesas = favoritos.map((favorito, index) => 
        actualizarClima(favorito, index)
      );
      
      await Promise.all(promesas);
      Alert.alert('Éxito', 'Todos los favoritos han sido actualizados');
    } catch (error) {
      console.error('Error al actualizar todos los favoritos:', error);
      Alert.alert('Error', 'No se pudieron actualizar todos los favoritos');
    } finally {
      setActualizando(false);
    }
  };

  // Función para eliminar un favorito
  const eliminarFavorito = async (id) => {
    try {
      console.log('eliminarFavorito llamada con ID:', id);
      console.log('Favoritos actuales:', favoritos.length);
      
      const nuevosFavoritos = favoritos.filter(fav => fav.id !== id);
      console.log('Nuevos favoritos después de filtrar:', nuevosFavoritos.length);
      
      setFavoritos(nuevosFavoritos);
      
      // Guardar en AsyncStorage
      await AsyncStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      console.log('Favoritos guardados en AsyncStorage');
      
      Alert.alert('Éxito', 'Ciudad eliminada de favoritos');
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      Alert.alert('Error', 'No se pudo eliminar la ciudad de favoritos');
    }
  };

  // Confirmar eliminación
  const confirmarEliminacion = (id, nombre) => {
    console.log('confirmarEliminacion llamada con:', { id, nombre });
    Alert.alert(
      'Eliminar favorito',
      `¿Estás seguro de que deseas eliminar ${nombre} de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => {
          console.log('Usuario confirmó eliminación para ID:', id);
          eliminarFavorito(id);
        }, style: 'destructive' }
      ]
    );
  };

  // Formatear fecha
  const formatearFecha = (fechaIso, completo = false) => {
    const fecha = new Date(fechaIso);
    if (completo) {
      return fecha.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener la URL de imagen de fondo según el clima de la primera ciudad favorita
  const obtenerImagenFondo = () => {
    if (!favoritos || favoritos.length === 0) {
      // URL por defecto - cielo azul
      return { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' };
    }

    // Usar el clima de la primera ciudad favorita para determinar el fondo
    const primerFavorito = favoritos[0];
    if (!primerFavorito.ultimoClima || !primerFavorito.ultimoClima.current) {
      return { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center' };
    }

    const codigoCondicion = primerFavorito.ultimoClima.current.condition.code;
    const esDeDia = primerFavorito.ultimoClima.current.is_day === 1;
    
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

  // Manejar la selección de ciudad
  const handleCiudadSeleccionada = (favorito) => {
    console.log('Ciudad seleccionada:', favorito.ciudad);
    console.log('Datos clima:', favorito.ultimoClima);
    
    // Navegar a la pantalla de inicio con los datos de la ciudad seleccionada
    navigation.navigate('Inicio', { 
      ciudadSeleccionada: favorito.ciudad,
      datosClima: favorito.ultimoClima
    });
  };

  // Renderizar cada favorito
  const renderFavorito = ({ item, index }) => {
    return (
      <TarjetaFavorito 
        favorito={item}
        index={index}
        formatearFecha={formatearFecha}
        actualizarClima={actualizarClima}
        confirmarEliminacion={confirmarEliminacion}
        onCiudadSeleccionada={handleCiudadSeleccionada}
      />
    );
  };

  return (
    <ImageBackground 
      source={obtenerImagenFondo()}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <EncabezadoFavoritos 
          favoritos={favoritos}
          actualizarTodosFavoritos={actualizarTodosFavoritos}
          actualizando={actualizando}
        />

        {ciudadSeleccionada && (
          <ScrollView style={styles.climaSeleccionadoContainer}>
            <ClimaActual 
              location={{
                name: ciudadSeleccionada.ciudad.name,
                country: ciudadSeleccionada.ciudad.country,
                localtime: ciudadSeleccionada.fechaGuardado
              }}
              current={ciudadSeleccionada.ultimoClima.current}
              formatearFecha={formatearFecha}
            />
            <DetallesClima 
              current={ciudadSeleccionada.ultimoClima.current}
            />
            {ciudadSeleccionada.ultimoClima.forecast && (
              <Pronostico 
                pronostico={ciudadSeleccionada.ultimoClima.forecast.forecastday}
              />
            )}
          </ScrollView>
        )}

        <EstadoFavoritos 
          cargando={cargando}
          favoritos={favoritos}
        />

        {!cargando && favoritos.length > 0 && (
          <FlatList
            data={favoritos}
            renderItem={renderFavorito}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Favoritos;