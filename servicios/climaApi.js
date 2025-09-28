import axios from 'axios';

// Constante para la API de WeatherAPI.com
const WEATHER_API_KEY = '4bb868aedd7c4768a7b153247252609'; // Reemplaza este valor con tu API key de WeatherAPI.com
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

// Constante para la API de WorldTimeAPI
const WORLDTIME_API_BASE_URL = 'https://worldtimeapi.org/api';

/**
 * Obtiene la hora exacta de una ciudad usando WorldTimeAPI
 * @param {string} region - Región de la ciudad (ej. 'Europe')
 * @param {string} ciudad - Nombre de la ciudad (ej. 'Madrid')
 * @returns {Promise} Promesa con los datos de hora y fecha procesados
 */

// Caché para almacenar resultados de hora por ciudad
const horaCache = {};

export const obtenerHoraExacta = async (region, ciudad) => {
  // Crear una clave única para la caché
  const cacheKey = `${region}/${ciudad}`;
  
  // Verificar si tenemos datos en caché y no son muy antiguos (menos de 1 hora)
  if (horaCache[cacheKey] && (Date.now() - horaCache[cacheKey].timestamp < 3600000)) {
    return horaCache[cacheKey].data;
  }
  
  try {
    // Establecer un timeout para la solicitud
    const respuesta = await axios.get(`${WORLDTIME_API_BASE_URL}/timezone/${region}/${ciudad}`, {
      timeout: 5000 // 5 segundos de timeout
    });
    // Procesar la respuesta para asegurar que se devuelve la fecha correcta
    const data = respuesta.data;
    
    if (data.datetime) {
      // Calcular la diferencia horaria entre la hora local y la hora de la ciudad
      const horaServidor = new Date(data.datetime);
      const horaLocal = new Date();
      
      // Calcular la diferencia en milisegundos
      const diferenciaMs = horaServidor.getTime() - horaLocal.getTime();
      
      const resultado = {
        ...data,
        datetime: data.datetime,
        // Añadir una propiedad formateada para facilitar su uso
        formatted: new Date(data.datetime).toLocaleString('es-ES', {
          timeZone: data.timezone,
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        // Añadir la diferencia horaria para cálculos futuros
        diferenciaMs: diferenciaMs,
        timezone: data.timezone,
        isOffline: false
      };
      
      // Guardar en caché
      horaCache[cacheKey] = {
        data: resultado,
        timestamp: Date.now()
      };
      
      return resultado;
    }
    return data;
  } catch (error) {
    // En lugar de mostrar el error completo, solo registrar un mensaje informativo
    console.log(`Usando datos offline para ${region}/${ciudad}`);
    
    // En lugar de lanzar el error, devolver un objeto con datos predeterminados
    const ahora = new Date();
    
    // Obtener zona horaria aproximada basada en la región
    const zonaHoraria = obtenerZonaHorariaPorRegion(region);
    
    const resultado = {
      datetime: ahora.toISOString(),
      formatted: ahora.toLocaleString('es-ES', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      diferenciaMs: 0,
      timezone: zonaHoraria,
      isOffline: true
    };
    
    // Guardar en caché por menos tiempo (30 minutos)
    horaCache[cacheKey] = {
      data: resultado,
      timestamp: Date.now()
    };
    
    return resultado;
  }
};

// Función auxiliar para obtener una zona horaria aproximada basada en la región
const obtenerZonaHorariaPorRegion = (region) => {
  const mapeoRegiones = {
    'Europe': 'Europe/London',
    'America': 'America/New_York',
    'Asia': 'Asia/Tokyo',
    'Australia': 'Australia/Sydney',
    'Africa': 'Africa/Cairo',
    'Pacific': 'Pacific/Auckland'
  };
  
  return mapeoRegiones[region] || 'UTC';
};

/**
 * Mapea una ciudad a su zona horaria correspondiente en WorldTimeAPI
 * @param {string} pais - País de la ciudad
 * @param {string} nombreCiudad - Nombre de la ciudad
 * @returns {Object} Objeto con región y ciudad para WorldTimeAPI
 */
export const mapearCiudadAZonaHoraria = (pais, nombreCiudad) => {
  // Mapeo de países a regiones y ciudades principales
  const mapeo = {
    'Peru': { region: 'America', ciudad: 'Lima' },
    'Perú': { region: 'America', ciudad: 'Lima' },
    'China': { region: 'Asia', ciudad: 'Shanghai' },
    'Spain': { region: 'Europe', ciudad: 'Madrid' },
    'España': { region: 'Europe', ciudad: 'Madrid' },
    'United States': { region: 'America', ciudad: 'New_York' },
    'Estados Unidos': { region: 'America', ciudad: 'New_York' },
    'Mexico': { region: 'America', ciudad: 'Mexico_City' },
    'México': { region: 'America', ciudad: 'Mexico_City' },
    'Brazil': { region: 'America', ciudad: 'Sao_Paulo' },
    'Brasil': { region: 'America', ciudad: 'Sao_Paulo' },
    'Argentina': { region: 'America', ciudad: 'Buenos_Aires' },
    'Chile': { region: 'America', ciudad: 'Santiago' },
    'Colombia': { region: 'America', ciudad: 'Bogota' },
    'United Kingdom': { region: 'Europe', ciudad: 'London' },
    'Reino Unido': { region: 'Europe', ciudad: 'London' },
    'France': { region: 'Europe', ciudad: 'Paris' },
    'Francia': { region: 'Europe', ciudad: 'Paris' },
    'Germany': { region: 'Europe', ciudad: 'Berlin' },
    'Alemania': { region: 'Europe', ciudad: 'Berlin' },
    'Italy': { region: 'Europe', ciudad: 'Rome' },
    'Italia': { region: 'Europe', ciudad: 'Rome' },
    'Japan': { region: 'Asia', ciudad: 'Tokyo' },
    'Japón': { region: 'Asia', ciudad: 'Tokyo' },
    'Australia': { region: 'Australia', ciudad: 'Sydney' },
    'India': { region: 'Asia', ciudad: 'Kolkata' },
    'Russia': { region: 'Europe', ciudad: 'Moscow' },
    'Rusia': { region: 'Europe', ciudad: 'Moscow' },
    'Canada': { region: 'America', ciudad: 'Toronto' },
    'Canadá': { region: 'America', ciudad: 'Toronto' }
  };
  
  // Devolver el mapeo correspondiente o un valor por defecto
  return mapeo[pais] || { region: 'Europe', ciudad: 'London' };
};

/**
 * Obtiene el clima actual basado en la ubicación geográfica
 * @param {number} latitud - Latitud de la ubicación
 * @param {number} longitud - Longitud de la ubicación
 * @returns {Promise} Promesa con los datos del clima
 */
export const obtenerClimaActual = async (latitud, longitud) => {
  try {
    const respuesta = await axios.get(`${WEATHER_API_BASE_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${latitud},${longitud}`,
        lang: 'es'
      }
    });
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener clima actual:', error);
    throw error;
  }
};

/**
 * Obtiene el pronóstico de los próximos días
 * @param {number} latitud - Latitud de la ubicación
 * @param {number} longitud - Longitud de la ubicación
 * @param {number} dias - Número de días para el pronóstico (máx. 3 en plan gratuito)
 * @returns {Promise} Promesa con los datos del pronóstico
 */
export const obtenerPronostico = async (latitud, longitud, dias = 3) => {
  try {
    const respuesta = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${latitud},${longitud}`,
        days: dias,
        lang: 'es'
      }
    });
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener pronóstico:', error);
    throw error;
  }
};

/**
 * Busca ciudades por nombre
 * @param {string} nombreCiudad - Nombre de la ciudad a buscar
 * @returns {Promise} Promesa con los resultados de la búsqueda
 */
export const buscarCiudad = async (nombreCiudad) => {
  try {
    const respuesta = await axios.get(`${WEATHER_API_BASE_URL}/search.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: nombreCiudad
      }
    });
    return respuesta.data;
  } catch (error) {
    console.error('Error al buscar ciudad:', error);
    throw error;
  }
};

/**
 * Obtiene datos de calidad del aire
 * @param {number} latitud - Latitud de la ubicación
 * @param {number} longitud - Longitud de la ubicación
 * @returns {Promise} Promesa con los datos de calidad del aire
 */
export const obtenerCalidadAire = async (latitud, longitud) => {
  try {
    const respuesta = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${latitud},${longitud}`,
        days: 1,
        aqi: 'yes',
        lang: 'es'
      }
    });
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener calidad del aire:', error);
    throw error;
  };
};



// Esta función ya está definida arriba usando WeatherAPI.com