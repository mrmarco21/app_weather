import { StyleSheet } from 'react-native';

const inicioStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  date: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: '#3d669f',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  airQualityIndicator: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  airQualityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forecastScroll: {
    marginTop: 10,
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  forecastDay: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 14,
  },
  precipProb: {
    fontSize: 12,
    color: '#0099ff',
  },
  // Estilos para el pronóstico por día
  forecastTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  forecastCardContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  forecastDayContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  forecastDayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  forecastDayLeft: {
    width: 60,
  },
  forecastDayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastDayCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  precipitationText: {
    fontSize: 16,
    color: '#3498db',
    marginLeft: 5,
  },
  forecastDayIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  forecastDayRight: {
    width: 80,
    alignItems: 'flex-end',
  },
  forecastDayTemp: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  precipitationIcon: {
    marginRight: 5,
  },
  precipitationText: {
    fontSize: 15,
    color: '#0099ff',
    marginLeft: 4,
  },
  forecastDayMiddle: {
    flex: 1,
    alignItems: 'center',
  },
  forecastDayIcon: {
    width: 50,
    height: 50,
  },
  forecastDayRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  forecastDayTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default inicioStyles;