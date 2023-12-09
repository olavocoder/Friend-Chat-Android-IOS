import { StyleSheet } from "react-native";

export default style = StyleSheet.create({
  wrapper:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingA:{
    fontSize: 20,
    marginBottom: 15,
    marginTop: 25,
    fontWeight: `600`,
    textAlign: "center"
  },
  titles:{
    textAlign: 'center',
    fontWeight: `500`,
    marginTop: 10,
    marginBottom: 5
  },
  textInput: {
    marginBottom: 10,
    padding: 5,
    width: "80%",
    borderColor: `green`,
    borderWidth: 1,
    borderRadius: 30,
    textAlign: `center`
  },
  button:{
    textAlign: `center`,
    backgroundColor: 'green',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    borderRadius: 5,
    fontWeight: "bold",
    marginTop: 20
  },
  sugestion:{
    textAlign: 'left',
    color: 'green',
    marginBottom: 5
  },
  signUp:{
    marginTop: 10,
    textDecorationLine: `underline`,
  }
});