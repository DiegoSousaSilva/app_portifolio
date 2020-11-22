// In App.js in a new project

import React, {useState, useEffect} from 'react';
import { View, 
         Text, 
         TouchableOpacity, 
         ScrollView , 
         StyleSheet,
         Image,
         Dimensions
      } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as webBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { color } from 'react-native-reanimated';


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

  const [images, setImages] = useState([
    {
      img: require('./src/assets/app_musica.jpg'),
      width: 0,
      height: 0,
      ratio: 0,
      git: 'https://github.com/DiegoSousaSilva/app-musica',
    },
    {
      img: require('./src/assets/app_smart_money.jpg'),
      width: 0,
      height: 0,
      ratio: 0,
      git: 'https://github.com/DiegoSousaSilva/app-smart-money',
    }
  ])

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    let windowWidthL = Dimensions.get('window').width;
    setWindowWidth(windowWidthL - 30 - 40);
    let newImages = images.filter((val)=>{
      let w = Image.resolveAssetSource(val.img).width;
      let h = Image.resolveAssetSource(val.img).height;

      val.width = w;
      val.height = h;

      val.ratio = h/w;
      return val;
    })

    setImages(newImages);

  }, []);

  const abrirGithub = async (github) =>{
    let res = await webBrowser.openBrowserAsync(github);
  }

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Últimos Projetos</Text>

        {
          images.map((val)=>{
            return (
              <View style={{paddingTop: 20}}>
                <Image 
                  style={{width:windowWidth, height: windowWidth*val.ratio, resizeMode: "stretch"}}
                  source= {val.img}
                />

                <View style={[styles.btnNavigation, {marginTop:0, borderTopStartRadius:0, borderTopEndRadius:0, justifyContent: 'space-between'}]}>
                  <TouchableOpacity onPress={()=>abrirGithub(val.git)}><Text style={{color: "#fff"}}>Abrir Codigos no GitHub</Text></TouchableOpacity>
                  <TouchableOpacity><Text style={{color: "#fff"}}>Baixar app</Text></TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    



      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SobreScreen({navigation}) {
  let windowWidthSobre = Dimensions.get('window').width - 30 - 40;
  return (
    <View style={{ flex: 1, padding: 15}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}> 
        <Text style={styles.textHeader}>Sobre</Text>
        <Image style={{width:windowWidthSobre, height:windowWidthSobre, marginTop:20}} source={{uri:'https://avatars0.githubusercontent.com/u/43018341?s=400&u=a433869c3183517148c93c1288c335019f63813e&v=4'}}/>
        <View>
          <Text style={{fontSize: 20, marginTop:10, marginLeft:10, color: 'gray'}}>Diego Sousa/Desenvolvedor </Text>
          <Text style={{marginTop:10, textAlign:'justify', fontWeight:'400'}}>Meu nome é Diego Sousa, sou estudante de análise desenvolvimento de sistemas. Sempre fui apaixonado por TI, por ser uma área que esta sempre em evolução o que nos leva a estudar e se especializar constantemente.
          {'\n'}Gosto de aprender coisas novas buscando sempre evoluir a cada dia, um passo por vez. No meu tempo livre gosto de assistir séries, filmes e animes,ler livros, ouvir música e sair com a família.</Text>

          <TouchableOpacity onPress={()=>navigation.navigate('Contato')} style={{...styles.btnNavigation, justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Entrar em contato</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
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
      <StatusBar hidden />
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
    fontWeight: 'bold'
  },
  btnNavigation:{
    backgroundColor: "#e91e63",
    padding: 20,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',

  },


})