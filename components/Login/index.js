import { Text, View, TextInput } from "react-native";
import style from "./style";
import { useEffect, useState } from "react";
import LoginApi from "../../services/LoginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [aproved, setAproved] = useState(true)
  
  // Verifica status do usuario e realiza o login
  async function VerifyLogin(){
    const response = await LoginApi(login, senha)
    DisableLogin()
    if(response?.allAuthor?.length  > 0){
      setAproved(true)
      SavePerfil(response)
      navigation.navigate("Map")
    }else{
      setAproved(false)
    }
  }

  function DisableLogin(){
    setLogin('')
    setSenha('')
  }

  function SavePerfil(data){
    AsyncStorage.setItem('Perfil', JSON.stringify(data))
    .then(() => {
      console.log('dados salvo com sucesso no banco local')
    })
    .catch(error => {
      console.log(error, 'Os dados nao foram salvos no local')
    });
  }

  return (
    <View style={style.wrapper}>
      <Text  style={style.headingA}>
        Por favor, insira suas credenciais
      </Text>
      <Text  style={style.sugestion}>
        login
      </Text>
      <TextInput 
        placeholder="Insira seu login" 
        style={style.textInput} 
        onChange={(e)=> {setLogin(e.nativeEvent.text)}}
      >
        {login !== '' && login}
      </TextInput>
      <Text  style={style.sugestion}>
        senha
      </Text>
      <TextInput
        placeholder="Insira sua senha" 
        style={style.textInput} 
        onChange={(e)=> {setSenha(e.nativeEvent.text)}}
      >
        {senha !== '' && senha}
      </TextInput>
      {aproved == false && (
        <Text  style={style.sugestion}>
          Login ou senha estão incorretas.
        </Text>
      )}
      
      <Text 
        onPress={VerifyLogin} 
        style={style.button}
      >
        Iniciar sessão
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("SignUp")
          DisableLogin()
        }}
        style={style.signUp}
      >
        Cadastre-se
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Buy")
          DisableLogin()
        }}
        style={style.signUp}
      >
        Faça uma doação
      </Text>
    </View>
  );
}
