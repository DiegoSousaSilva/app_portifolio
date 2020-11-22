// In App.js in a new project

import React, {useState, useEffect} from 'react';
import { View, 
         Text, 
         TouchableOpacity, 
         ScrollView , 
         StyleSheet,
         Image,         Dimensions,
         TextInput
      } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as webBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import Colors from './src/styles/Colors';
import { Linking } from 'react-native';
import qs from 'qs';


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

  const [showModal, setmodal]=useState(false);
  const abrirModalContato = ()=>{
    setmodal(!showModal);
  }

  const abrirRedeSocial = async (rede) =>{
    let res = await webBrowser.openBrowserAsync(rede);
  }

  async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}

  return (
    <View style={{flex:1}}>

      {
        (showModal)?
        <View style={styles.modalParent}>
          <View style={{position:'absolute', right:0, top:0, width:50, height:50, backgroundColor: '#333',zIndex:2, justifyContent: 'center'}}>
          <TouchableOpacity style={{width:'100%', height: '100%', justifyContent:'center'}} onPress={()=>setmodal(!showModal)}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Fechar</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.boxModal}>
            <View>
              <Text style={{...styles.textHeader, fontSize:15, padding:8}}>Qual seu nome?</Text>
              <TextInput 
                style={{height:40, width: '100%', borderColor: '#ccc',borderWidth:1, marginBottom:20}} 
                numberOfLines={4}
              ></TextInput>
            </View>

            <View>
              <Text style={{...styles.textHeader, fontSize:15, padding:8}}>Qual sua mensagem?</Text>
              <TextInput 
                style={{height:80, width: '100%', borderColor: '#ccc',borderWidth:1, marginBottom:20}} 
                numberOfLines={4}
              ></TextInput>
            </View>
            <TouchableOpacity onPress={()=> abrirModalContato()} style={{...styles.btnNavigation, justifyContent:'center', borderRadius:0}}>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>:
        <View></View>
      }

      <View style={{ flex: 1, padding: 10}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Contato</Text>

          <TouchableOpacity 
          style={styles.btnNavContato}
          onPress={()=>abrirRedeSocial('https://web.facebook.com/diegosousa.dasilva.1/')}
          >
            <Ionicons name='logo-facebook' size={50} color='blue'/>
            <View style={{alignItems:'center'}}>
              <Text 
                style={{color: Colors.text, fontSize: 16, fontWeight: 'bold'}}
              >
                Entrar no Facebook
              </Text>
              <Text style={{color: Colors.metalDark}}>facebook.com/diegosousa.dasilva.1/</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnNavContato}
            onPress={()=>abrirRedeSocial('https://www.instagram.com/diego_d._sousa/')}  
          >
            <Ionicons name='logo-instagram' size={50} color={Colors.text}/>
            <View style={{alignItems:'center'}}>
              <Text 
                style={{color: Colors.text, fontSize: 16, fontWeight: 'bold'}}
              >
                Entrar no Instagram
              </Text>
              <Text style={{color: Colors.metalDark}}>instagram.com/diego_d._sousa/</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnNavContato}
            onPress={()=>abrirRedeSocial('http://www.linkedin.com/in/diego-sousa-dev')}  
          >
            <Ionicons name='logo-linkedin' size={50} color='blue'/>
            <View style={{alignItems:'center'}}>
              <Text 
                style={{color: Colors.text, fontSize: 16, fontWeight: 'bold'}}
              >
                Entrar no Linkedin
              </Text>
              <Text style={{color: Colors.metalDark}}>linkedin.com/in/diego-sousa-dev</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnNavContato}
            onPress={()=>abrirRedeSocial('https://github.com/diegosousasilva')}  
          >
            <Ionicons name='logo-github' size={50} color={Colors.black}/>
            <View style={{alignItems:'center'}}>
              <Text 
                style={{color: Colors.text, fontSize: 16, fontWeight: 'bold'}}
              >
                Entrar no Github
              </Text>
              <Text style={{color: Colors.metalDark}}>facebook.com/diegosousa.dasilva.1/</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={()=>sendEmail(
              'derickbenji2@gmail.com',
              'Oi, tudo bem',
              'Parabéns, muito interessante este projeto.....'
              ).then(() => {
              console.log('Our email successful provided to device mail ');
              })}
            style={styles.btnNavContato}
          >
            <Ionicons name='ios-mail' size={50} color={Colors.red}/>
            <View style={{alignItems:'center'}}>
              <Text 
                style={{color: Colors.text, fontSize: 16, fontWeight: 'bold'}}
              >
                Enviar um Email
              </Text>
              <Text style={{color: Colors.metalDark}}>facebook.com/diegosousa.dasilva.1/</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> abrirModalContato()} style={{...styles.btnNavigation, justifyContent:'center'}}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>Enviar Mensagem</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold'
  },
  btnNavigation:{
    backgroundColor: Colors.text,
    padding: 20,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',

  },
  modalParent: {
    position:"absolute",
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    zIndex:1
  },
  boxModal:{
    backgroundColor: Colors.white,
    height: 370,
    width:'100%',
    position: 'absolute',
    left:0,
    top: '50%',
    marginTop: -185
  },
  btnNavContato:{
    backgroundColor: Colors.champagne,
    padding: 10,
    marginTop: 10,
    borderTopRightRadius: 16,
    borderBottomLeftRadius:16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth:1,
    borderColor: Colors.background
  },


})