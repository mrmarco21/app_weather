import { StyleSheet } from 'react-native';

const busquedaStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 10,
  },
  resultadoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  nombreCiudad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  estadoCiudad: {
    fontSize: 16,
    color: '#444',
    marginTop: 2,
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
  resultadosContainer: {
    flex: 1,
  },
  climaContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  ciudadSeleccionada: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  climaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  climaIcono: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  temperatura: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 18,
    color: '#555',
    textTransform: 'capitalize',
  },
  detallesContainer: {
    marginTop: 16,
  },
  detalleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detalleItem: {
    flex: 1,
    alignItems: 'center',
  },
  detalleValor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  detalleLabel: {
    fontSize: 14,
    color: '#666',
  },
  mensajeVacio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default busquedaStyles;