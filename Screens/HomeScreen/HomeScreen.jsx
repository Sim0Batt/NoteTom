import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react';
import Colors from '../../Utils/Colors';
import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import WeatherWidget from '../../Components/WeatherWidget';
import CheckList from '../../Components/CheckList';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { app } from '../../config/FirebaseConfig';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function HomeScreen() {
  const [checked, setChecked] = useState(false);
  const { user, isLoading } = useUser();

  return user && (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
            <Text style={styles.userName}>{user.fullName}</Text>
          </View>
          <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => { console.log("Hello") }}>
            <Feather name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weatherContainer}>
        <WeatherWidget />
      </View>

      <View style={styles.checklistContainer}>
        {/* <View style={{ display:'flex', flexDirection:'row'}}>
          <Text style={{ paddingTop: 50, paddingLeft: 10, fontSize: 20, fontFamily: 'outfit-bold'}}>Cose da fare:</Text>
          <TouchableOpacity style={styles.removeBtn} >
            <Text style={{textAlign: 'center', fontFamily:'outfit-bold'}}>Rimuovi Task</Text>
          </TouchableOpacity>
        </View> */}

        <CheckList />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: Colors.DARKSLATEGRAY,

  },
  header: {
    paddingTop: 30,
    backgroundColor: Colors.DARKSEAGREEN,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomStartRadius: 20,
    padding: 20,

  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
    borderColor: Colors.BLACK,
  },
  profileImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userName: {
    fontFamily: 'helvetica-neue',
    fontSize: 30,
    paddingTop: 15,
    bottom: 5,
    paddingLeft: 10

  },
  weatherContainer: {
    backgroundColor: Colors.DARKSEAGREEN,
    borderRadius: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingLeft: 100,
    paddingRight: 100,
    top: 20
  },
  removeBtn: {
    width:100,
    paddingVertical:10,
    backgroundColor: Colors.RED,
    borderRadius: 5,
    position:'absolute',
    right:28,
    top:45
  },
  checklistContainer:{
    paddingTop: 20
  }


})

