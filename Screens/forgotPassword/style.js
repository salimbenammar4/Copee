const React = require("react-native");

const { width, height } = window;
const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for background image
  },
  loginFormView: {
    marginHorizontal: 30,
    marginTop: 100,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
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
    marginLeft: 20,
    width: 300,
  },
  loginButton: {
    backgroundColor: '#56409e',
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    marginTop:10,
    marginLeft:15
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    height: 50,
  },
  hero: {
    backgroundColor: "dBdffe",
    padding: 16,
    borderRadius: 16,
    margin: 5,
  },
  heroimg: {
    width: '100%',
    height: 150,
  },
});
export default styles