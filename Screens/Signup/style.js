const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
    backgroundImage: `url(')`
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#56409e",
    borderRadius: 40,
    height: 45,
    marginTop: 10,
    width: 300,
    alignItems: "center"
  },
  hero: {
    backgroundColor: "dBdffe",
    padding: 16,
    borderRadius: 16,
    margin: 5,
  },
  heroimg: {
    marginTop:20,
    width: '100%',
    height: 150,
  },
});
export default styles;
