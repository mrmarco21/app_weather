import { StyleSheet } from 'react-native';

const PronosticoHoraStyles = StyleSheet.create({
  detailCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: 'transparent',
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
    color: '#fff',
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 14,
    color: '#fff',
  },
  precipProb: {
    fontSize: 12,
    color: '#0099ff',
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  
});

export default PronosticoHoraStyles;