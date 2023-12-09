import { Text, View, TextInput } from "react-native";
import style from "./style";
import { useState } from "react";
import LoginApi from "../../services/LoginApi";
import SignUpApi from "../../services/SignUpApi";

export default function SignUp({ navigation }) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaClone, setSenhaClone] = useState('')
  const [aproved, setAproved] = useState(true)
  
  async function VerifySignUp(){
    const response = await LoginApi(login)
    if(response?.allAuthor?.length  == 0 && senha == senhaClone){
      SignUpApi(login, senha)
      setAproved(true)
      navigation.navigate("Inicio")
    }else{
      setAproved(false)
    }
  }

  return (
    <View style={style.wrapper}>
      <Text  style={style.headingA}>
        Por favor, insira seus dados de cadastro
      </Text>
      
      <Text  style={style.sugestion}>
        Nome Completo
      </Text>
      <TextInput
        placeholder="Insira seu nome" 
        style={style.textInput} 
        onChange={(e)=> {setLogin(e.nativeEvent.text)}}
      />
      
      <Text style={style.sugestion}>
        senha
      </Text>
      <TextInput
        placeholder="Insira sua senha"
        style={style.textInput} 
        onChange={(e)=> {setSenha(e.nativeEvent.text)}}
      />

      <Text  style={style.sugestion}>
        confirme a senha
      </Text>
      <TextInput
         placeholder="Insira sua senha" 
         style={style.textInput} 
         onChange={(e)=> {setSenhaClone(e.nativeEvent.text)}}
      />
      {aproved == false && (
        <Text  style={style.sugestion}>
          Erro nos dados ao cadastrar
        </Text>
      )}
      <Text onPress={VerifySignUp} style={style.button}>
        Cadastre
      </Text>
    </View>
  );
}
