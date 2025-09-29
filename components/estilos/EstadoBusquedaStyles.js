import { StyleSheet } from 'react-native';

const EstadoBusquedaStyles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default EstadoBusquedaStyles;