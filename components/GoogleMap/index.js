import { View, Text, TextInput, ScrollView, PermissionsAndroid } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState } from "react";
import style from "./style";
import * as Location from 'expo-location'
import {GOOGLE_MAPS_API_KEY} from '@env'

export default function GoogleMap({navigation}) {
  const [origin, setOrigin] = userState(null)
  const [destination, setDestination] = useState(null)
  const [getOrigin, setGetOrigin] = useState(null)
  const [GetDestination, setGetDestination] = useState(null)
  const [city, setCity] = useState()
  const [infoCity, setInfoCity] = useState({name : '', info:{origin : false, destination: false}})
  const [location, useLocation] = useState({lat: 0, lon: 0})
  const [isCompleted, setIsCompleted] = useState(false)

  async function LocationPermission(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    // Pergunta ao usuario se deve autorizar o uso da localização
    if(status == 'granted') {
      let {coords} = await Location.getCurrentPositionAsync({});
      useLocation({lat: coords.latitude, lon: coords.longitude})
      setIsCompleted(false)
    } else {
      alert('Permissão de Localização negada');
    }
  }
  
  //Busca informações de localidades para inserir abaixos dos Inputs
  async function SearchCity(){
    fetch(`https://nominatim.openstreetmap.org/search?q=${infoCity.name}&format=json&polygon_kml=1&addressdetails=1`)
    .then(response => response.json())
    .then(data => {
      setCity(data[0])
    })
    .catch((e)=>{console.log(`Error ao buscar localizacao`)})
  }

  //Busca a rota do mapa
  function SearchRoute() {
    setOrigin(getOrigin)
    setDestination(GetDestination)
    setInfoCity({name : '', info:{origin : false, destination: false}})
    setIsCompleted(true)
  }

  return (
    <View
      style={style.wrapper}
    >
      <Text style={style.headingA}>Rotas Básicas</Text>
      <Text 
        style={style.titles} 
        onPress={navigation.navigate("Perfil")}
      >
        Perfil
      </Text>

      <MapView
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        maxZoomLevel={20}
        mapType="standard"
        initialRegion={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: isCompleted ? parseFloat(city?.lat) : location.lat,
          longitude: isCompleted ? parseFloat(city?.lon) : location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: "100%",
          height: "50%",
        }}
      >
      <Marker
        coordinate={{
          latitude: isCompleted ? parseFloat(city?.lat) : location.lat,
          longitude: isCompleted ? parseFloat(city?.lon) : location.lon,
        }}
        title="Marker Title"
        description="Marker Description"
      />
      {
        origin && destination &&(
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )
      }

      </MapView>
        <ScrollView style={{width: '90%'}}>
        <Text 
        onPress={LocationPermission} 
        style={style.button}
      > 
        Ativar Localização
      </Text>
      <Text style={style.titles}>Digite o local de origem</Text>
      <TextInput
        value={getOrigin}
        onChange={(e)=>{
          setGetOrigin(e.nativeEvent.text)
          setInfoCity({
            name : e.nativeEvent.text,
            info:{
              origin : true,
              destination: false
            }
          })
          SearchCity()
        }} 
        placeholder="Origem" 
        style={style.textInput}
      />
        
      <Text
        onPress={() => {setGetOrigin(city?.address?.city || city?.address?.village || city?.address?.municipality)}}
        style={infoCity.info.origin === false  ? { display: 'none'} : style.sugestion}
      >{city?.address?.city || city?.address?.village || city?.address?.municipality}</Text>

      <Text 
        style={style.titles}
      >Digite o local de destino</Text>
      <TextInput
        value={GetDestination}
        onChange={(e)=>{
          setGetDestination(e.nativeEvent.text)
          setInfoCity({
            name : e.nativeEvent.text,
            info:{
              origin : false,
              destination: true
            }
          })
          SearchCity()
        }} 
        placeholder="Destino" 
        style={style.textInput}
      />

      <Text
        onPress={() => {setGetDestination(city?.address?.city || city?.address?.village || city?.address?.municipality)}} 
        style={infoCity.info.destination === false  ? { display: 'none' } : style.sugestion}
      >{city?.address?.city || city?.address?.village || city?.address?.municipality}</Text>

      <Text 
        onPress={SearchRoute} 
        style={style.button}
      > 
        Criar Rota
      </Text>
      </ScrollView>
    </View>
  );
}
