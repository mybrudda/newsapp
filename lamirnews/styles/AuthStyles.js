import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const isLandscape = width > height;

export const authstyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#9ae1dd',
    maxWidth: isLandscape ? '50%' : '100%', 
    width: 500,
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isLandscape ? 10 : 30, 
    paddingHorizontal: isLandscape ? 30 : 10,
  },
  title: {
    fontSize: isLandscape ? 20 : 24, 
    fontWeight: '700',
    color: '#333',
    marginVertical: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  input: {
    width: isLandscape ? 300 : 300, 
    maxHeight: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 4,
    marginVertical: 15,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  navigationText: {
    fontSize: isLandscape ? 16 : 18, 
    marginVertical: 10,
    color: 'purple',
    textAlign: 'center',
  },
  errorMsg: {
    color: 'red',
    fontSize: isLandscape ? 14 : 16, 
    textAlign: 'center',
  },
});
