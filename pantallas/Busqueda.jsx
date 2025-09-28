import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarCiudad, obtenerClimaActual } from '../servicios/climaApi';
import styles from '../estilos/busquedaStyles';
import BuscadorCiudad from '../components/BuscadorCiudad';
import ResultadoBusqueda from '../components/ResultadoBusqueda';
import DetalleClimaSeleccionado from '../components/DetalleClimaSeleccionado';
import EstadoBusqueda from '../components/EstadoBusqueda';

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
        // Agregar a favoritos
        favoritos.push({
          id: Date.now().toString(),
          ciudad: ciudad,
          ultimoClima: clima,
          fechaGuardado: new Date().toISOString()
        });
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      }
    } catch (err) {
      console.error('Error al guardar en favoritos:', err);
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
    <View style={styles.container}>
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
  );
};

export default Busqueda;