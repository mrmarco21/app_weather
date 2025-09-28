import { StyleSheet } from 'react-native';

const TarjetaFavoritoStyles = StyleSheet.create({
  favoritoCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    // backgroundColor: 'transparent',
  },
  favoritoCardExpandido: {
    elevation: 4,
    backgroundColor: '#f9f9f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tempContainer: {
    backgroundColor: '#0099ff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  minMaxTemp: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  climaInfo: {
    marginTop: 10,
  },
  climaInfoExpandido: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
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
  cardActions: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  descripcionContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  descripcionText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  actualizadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    gap: 4,
  },
  actualizadoText: {
    fontSize: 12,
    color: '#666',
  },
  fechaText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  botonVerClima: {
    marginRight: 8,
    backgroundColor: '#2196F3',
  },
  botonActualizar: {
    flex: 1,
    marginRight: 5,
  },
  botonEliminar: {
    flex: 1,
    marginLeft: 5,
    color: 'red',
  },
  botonEliminarTouchable: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f44336',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonEliminarText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TarjetaFavoritoStyles;