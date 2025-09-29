import { StyleSheet } from 'react-native';

const TarjetaFavoritoStyles = StyleSheet.create({
  favoritoCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  favoritoCardExpandido: {
    elevation: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  cardTitleCountry: {
    fontSize: 12,
    color: '#fff',
  },
  tempContainer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    gap: 10,
    color: '#fff',
    
  },
  infoItemText: {
    color: '#fff',
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
    color: '#fff',
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
    color: '#fff',
  },
  fechaText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  botonVerClima: {
    marginRight: 8,
    backgroundColor: 'green',
  },
  botonActualizar: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'blue',
  },
  botonEliminar: {
    flex: 1,
    marginLeft: 5,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  botonEliminarTouchable: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    // borderColor: '#fff',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonEliminarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TarjetaFavoritoStyles;