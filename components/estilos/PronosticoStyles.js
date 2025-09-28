import { StyleSheet } from 'react-native';

const PronosticoStyles = StyleSheet.create({
  detailCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: 'transparent',
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  forecastCardContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  forecastDayContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  forecastDayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  forecastDayLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  forecastDayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  precipProb: {
    fontSize: 14,
    color: '#0099ff',
    marginLeft: 4,
  },
  forecastDayIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forecastDayCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  precipitationText: {
    color: '#0099ff',
    fontSize: 14,
    marginLeft: 4,
  },
  forecastDayRight: {
    alignItems: 'flex-end',
  },
  forecastDayTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  }
});

export default PronosticoStyles;