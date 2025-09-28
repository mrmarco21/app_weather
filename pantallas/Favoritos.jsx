import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerClimaActual, obtenerPronostico } from '../servicios/climaApi';
import styles from '../estilos/favoritosStyles';
import TarjetaFavorito from '../components/TarjetaFavorito';
import EncabezadoFavoritos from '../components/EncabezadoFavoritos';
import EstadoFavoritos from '../components/EstadoFavoritos';
import ClimaActual from '../components/ClimaActual';
import DetallesClima from '../components/DetallesClima';
import Pronostico from '../components/Pronostico';
import { useNavigation } from '@react-navigation/native';

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
      const nuevosFavoritos = favoritos.filter(fav => fav.id !== id);
      setFavoritos(nuevosFavoritos);
      
      // Guardar en AsyncStorage
      await AsyncStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      
      Alert.alert('Éxito', 'Ciudad eliminada de favoritos');
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      Alert.alert('Error', 'No se pudo eliminar la ciudad de favoritos');
    }
  };

  // Confirmar eliminación
  const confirmarEliminacion = (id, nombre) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Estás seguro de que deseas eliminar ${nombre} de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => eliminarFavorito(id), style: 'destructive' }
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
    <View style={styles.container}>
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
  );
};

export default Favoritos;