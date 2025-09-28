import { StyleSheet } from 'react-native';

const ClimaActualStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  botonRegreso: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  textoBotonRegreso: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  botonActualizar: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 20,
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
});

export default ClimaActualStyles;