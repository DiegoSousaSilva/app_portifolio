// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela principal</Text>
      <TouchableOpacity onPress={()=> navigation.navigate("Sobre")}>
        <Text>Proxima pagina</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de notificações</Text>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Retornar</Text>
      </TouchableOpacity>
    </View>
  );
}

function ContatoScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de contatos</Text>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Retornar</Text>
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
        name="Tela principal"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tela de notificações"
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Notificacoes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Tela de contato"
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