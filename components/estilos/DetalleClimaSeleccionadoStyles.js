import { StyleSheet } from 'react-native';

const DetalleClimaSeleccionadoStyles = StyleSheet.create({
  climaCard: {
    margin: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tempContainer: {
    backgroundColor: '#0099ff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  climaInfo: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  descripcionContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  descripcionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  favoritoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },
  favoritoText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DetalleClimaSeleccionadoStyles;