import { StyleSheet } from 'react-native';

const ResultadoBusquedaStyles = StyleSheet.create({
  resultadosList: {
    paddingHorizontal: 16,
  },
  resultadoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nombreCiudad: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  estadoCiudad: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default ResultadoBusquedaStyles;