import { StyleSheet } from "react-native";

export default style = StyleSheet.create({
  wrapper:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingA:{
    fontSize: 30,
    marginBottom: 15,
    marginTop: 25,
    fontWeight: `800`
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
    borderColor: `green`,
    borderWidth: 1,
    borderRadius: 30,
    textAlign: `center`
  },
  button:{
    textDecorationLine: `underline`,
    textAlign: `center`
  },
  sugestion:{
    textAlign: `center`,
    color: 'green',
    textDecorationLine: `underline`,
  }
});