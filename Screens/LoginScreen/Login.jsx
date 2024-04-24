import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions} from 'react-native'
import * as WebBrowser from "expo-web-browser";
import React from 'react'
import Colors from '../../Utils/Colors.js'
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser.jsx";
import { useOAuth } from "@clerk/clerk-expo";

const screenHeight = Dimensions.get('window').height; 
const screenWidth = Dimensions.get('window').width; 


WebBrowser.maybeCompleteAuthSession();





export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <ImageBackground source={require('../../assets/images/LoginBg.jpg')} style={styles.imgBg}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NoteTom</Text>
        </View>
        <View>
          <Text style={styles.textContainer}><Text style={{fontWeight:'bold'}}>Organizza</Text> la tua vita al meglio con <Text style={{fontWeight:'bold'}}>NoteTom</Text></Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>Accedi/Registrati Ora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    
    
  )
}

const styles = StyleSheet.create({
  imgBg: { 
    height: screenHeight, 
    width: screenWidth, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  btn:{
    backgroundColor: Colors.LIGHTGRAY,
    paddingHorizontal: 90,
    paddingVertical:15,
    borderRadius:40,
    alignItems: 'center'
  },
  textContainer:{
    paddingBottom: 20,
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily:'outfit-medium'
  },
  btnText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontFamily:'outfit-medium'
  },
  titleContainer:{
    alignItems: 'center',
    paddingBottom: 10
  },
  title:{
    fontSize:70,
    fontFamily:'helvetica-neue',
    textAlign:'center'
  }

})