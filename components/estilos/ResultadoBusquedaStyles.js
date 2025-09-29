import { StyleSheet } from 'react-native';

const ResultadoBusquedaStyles = StyleSheet.create({
  resultadosList: {
    paddingHorizontal: 16,
  },
  resultadoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    marginVertical: 4,
  },
  nombreCiudad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  estadoCiudad: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 2,
  },
});

export default ResultadoBusquedaStyles;