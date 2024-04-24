import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/LoginScreen/Login';
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import TabNavigation from './Navigation/TabNavigator';
import Colors from './Utils/Colors';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// tokenCache={tokenCache} 


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'helvetica-neue': require('./assets/fonts/AcademyEngravedLetPlain.ttf')
  });
  
  if (!fontsLoaded && !fontError) {
    return null;
  }




  return (
    <ClerkProvider publishableKey = 'pk_test_bWlnaHR5LWR1Y2tsaW5nLTczLmNsZXJrLmFjY291bnRzLmRldiQ'>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>


        <SignedOut>
          <Login/>
        </SignedOut>

        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
});
