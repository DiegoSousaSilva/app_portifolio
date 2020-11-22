// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


function HomeScreen({navigation}) {
  return (
    <View style={{ padding:15}}>
     <ScrollView contentContainerStyle={{padding:20}} style={styles.container} > 
        <Text style={styles.textHeader}>Para onde você deseja navegar?</Text>
    
    
    
      <TouchableOpacity style={styles.btnNavigation} onPress={()=>navigation.navigate("Home")}>
       <Ionicons name="md-home" size={29} color="#fff" />
       <Text style={{color: "white", paddingTop:8, paddingLeft: 8}}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnNavigation}  onPress={()=>navigation.navigate("Portifolio")}>
       <Ionicons name="ios-list-box" size={29} color="#fff" />
       <Text style={{color: "white", paddingTop:8, paddingLeft: 8}}>Portifolio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnNavigation}  onPress={()=>navigation.navigate("Sobre")}>
       <Ionicons name="ios-information-circle" size={29} color="#fff" />
       <Text style={{color: "white", paddingTop:8, paddingLeft: 8}}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnNavigation}  onPress={()=>navigation.navigate("Contato")}>
       <Ionicons name="ios-person" size={29} color="#fff" />
       <Text style={{color: "white", paddingTop:8, paddingLeft: 8}}>Contato</Text>
      </TouchableOpacity>
    
    
     </ScrollView>
    </View>
  );
}

function PortifolioScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Portifiolio Screen</Text>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SobreScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sobre Screen</Text>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function ContatoScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contato Screen</Text>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
  
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Portifolio"
          component={PortifolioScreen}
          options={{
            tabBarLabel: 'Portifolio',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-list-box" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Sobre"
          component={SobreScreen}
          options={{
            tabBarLabel: 'Sobre',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-information-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contato"
          component={ContatoScreen}
          options={{
            tabBarLabel: 'Contato',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textHeader: {
    color: "#e91e63",
    fontSize: 24,
  },
  btnNavigation:{
    backgroundColor: "#e91e63",
    padding: 20,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',

  },

})