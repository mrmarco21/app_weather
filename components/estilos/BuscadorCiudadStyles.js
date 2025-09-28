import { StyleSheet } from 'react-native';

const BuscadorCiudadStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#0099ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 8,
  },
});

export default BuscadorCiudadStyles;