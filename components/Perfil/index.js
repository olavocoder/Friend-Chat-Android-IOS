import { Text, View, Image } from "react-native";
import style from "./style";
import { useEffect, useState } from "react";
import LoginApi from "../../services/LoginApi";

export default function Perfil({ navigation }) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [aproved, setAproved] = useState(true)
  
  // Verifica status do usuario e realiza o login
  async function VerifyLogin(){
    const response = await LoginApi(login, senha)
    DisableLogin()
    if(response?.allAuthor?.length  > 0){
      setAproved(true)
      navigation.navigate("Map")
    }else{
      setAproved(false)
    }
  }

  function DisableLogin(){
    setLogin('')
    setSenha('')
  }

  return (
    <View style={style.wrapper}>
      <Image 
        source={require('../../assets/pefil.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text  style={style.headingA}>
        Nome
      </Text>
      <Text  style={style.headingA}>
        Email
      </Text>
    </View>
  );
}
