import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    paddingHorizontal: "5%",
    backgroundColor: "white",
    flexGrow: 1,
  },
  img: {
    height: "100%",
    width: "40%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  imgInitial: {
    height: "40%",
    alignSelf: "center",
    marginTop: "20%",
    resizeMode: "contain",
  },
  fab: {
    backgroundColor: colors.main,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: "Poppins_Bold",
    marginTop: "3%",
    textAlign: "center",
  },
  textInput: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    marginTop: "5%",
    color: colors.textBlack,
  },
  input: {
    height: 50,
    marginTop: "2%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.main,
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
    color: colors.textBlack,
  },
  inputGrey: {
    height: 50,
    marginTop: "2%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.main,
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
    color: "grey",
  },
  btnInitial: {
    backgroundColor: colors.main,
    height: 50,
    justifyContent: "center",
    marginTop: "5%",
  },
  mainBtn: {
    backgroundColor: colors.main,
    marginTop: "8%",
    height: 50,
    justifyContent: "center",
    marginBottom: 140,
  },
  mainBtnText: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
  textExercicios: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    marginTop: "5%",
  },
  btnLoginRegister: {
    backgroundColor: colors.main,
    marginTop: "4%",
    height: 50,
    justifyContent: "center",
  },
  btnTextRegisterLogin: {
    marginTop: "4%",
    fontSize: 20,
    fontFamily: "Poppins_Regular",
    color: colors.main,
    alignSelf: "center",
    marginBottom: 20,
  },
  imgPerfil: {
    height: "15%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  meunome: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    textAlign: "center",
  },
});
