import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import axios from 'axios';
import { warmUpAsync } from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const lat = 45.97731313614822;

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=45.97&lon=11.09&units=metric&appid=56883c17226f4b03e3b96f2e39cbb3be`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle the error here, e.g., display a message to the user 
    }
  };

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }


  return (
    <View>
      {/* Display Weather Information */}
      <Text style={styles.city}>{weatherData.name}</Text>
      <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
      <Text style={styles.description}>{weatherData.weather[0].description}</Text>
    </View>
  );


  // if(weatherData.weather[0].description.includes("rain")){
  //   return (
  //     <View>
  //       {/* Display Weather Information */}
  //       <Text style={styles.city}>{weatherData.name}</Text>
  //       <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
  //       <Text style={styles.description}>{weatherData.weather[0].description}</Text>
  //       <Feather name="cloud-rain"  style={{alignSelf: 'center'}} size={24} color="black" />      </View>
  //   );
  // };

  // if(weatherData.weather[0].description.includes("sun")){
  //   return (
  //     <View>
  //       {/* Display Weather Information */}
  //       <Text style={styles.city}>{weatherData.name}</Text>
  //       <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
  //       <Text style={styles.description}>{weatherData.weather[0].description}</Text>
  //       <Feather name="sun" style={{alignSelf: 'center'}} size={24} color="black" />     </View>
  //   );
  // };


}




const styles = StyleSheet.create({

  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'outfit-bold'
  },
  temperature: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'outfit-medium'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'outfit',

  },

});

export default WeatherWidget;
