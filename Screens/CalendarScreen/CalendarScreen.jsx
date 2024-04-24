import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Colors from '../../Utils/Colors';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height
export default function EventCalendar() {


  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
        <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          console.log(day.dateString)
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        style={{
          backgroundColor:Colors.DARKSLATEGRAY,
          paddingTop: 10,
          
        }}
        theme={{
          calendarBackground: Colors.DARKSLATEGRAY,
          textDisabledColor: Colors.GRAY,
          dayTextColor: Colors.WHITE,
          textSectionTitleColor: Colors.DARKSLATEGRAY
          
        }}
        
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: Colors.DARKSLATEGRAY
  }
})