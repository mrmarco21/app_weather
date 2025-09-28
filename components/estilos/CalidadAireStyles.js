import { StyleSheet } from 'react-native';

const CalidadAireStyles = StyleSheet.create({
  detailCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
  airQualityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
});

export default CalidadAireStyles;