import { Text, View, TextInput } from "react-native";
import style from "./style";
import { useState } from "react";
import { CardField } from "@stripe/stripe-react-native";
import axios from "axios";

export default function Buy({ navigation }) {
  const [cardInfo, setCardInfo] = useState(null);
  const [confirmPay, setConfirmPay] = useState(false);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [value, setValue] = useState(0)

  async function IntentBuy() {
    //Ativa mensagens de erro
    setStatus(true);
    if (cardInfo.complete) {
      try {
        const response = await axios.post(
          "http://192.168.1.6:3000/create-payment-intent",
          {
            ...cardInfo,
            name : name,
            email : email,
            value: value
          }
        );
        console.log('pagamento efetuado com sucesso')        
        //confirma o pagamento
        setConfirmPay(true);
      } catch (err) {
        console.log("err", err);
      }
    }
  }

  return (
    <View style={style.wrapper}>
      <Text style={style.headingA}>
        Insira os dados do seu cartão de credito
      </Text>
      
      <Text style={style.titles}>Nome Completo</Text>
      <TextInput
        onChange={(e) => {setName(e.nativeEvent.text)}}
        style={style.textInput}
        placeholder="Insira o nome do completo"
      />

      <Text style={style.titles}>Email</Text>
      <TextInput
        onChange={(e) => {setEmail(e.nativeEvent.text)}}
        style={style.textInput}
        placeholder="Insira seu email"
      />

      <Text style={style.titles}>Valor</Text>
      <TextInput
        onChange={(e) => {setValue(e.nativeEvent.text)}}
        style={style.textInput}
        placeholder="Insira o valor em reais"
      />

      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "90%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCardInfo(cardDetails);
        }}
        onFocus={(focusedField) => {
          setCardInfo(focusedField);
        }}
      />
      <Text
        onPress={() => {
          IntentBuy();
        }}
        style={style.button}
      >
        Enviar Pagamento
      </Text>

      {status ? (
        confirmPay ? (
          <Text style={style.sugestion}> Pagamento Confirmado </Text>
        ) : (
          <Text style={style.sugestionNeg}> Pagamento negado </Text>
        )
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
