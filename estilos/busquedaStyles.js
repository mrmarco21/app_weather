import { StyleSheet } from 'react-native';

const busquedaStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 10,
  },
  resultadoItem: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 12,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    margin: 20,
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
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
});

export default busquedaStyles;