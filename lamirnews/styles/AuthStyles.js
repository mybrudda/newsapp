import { StyleSheet } from "react-native";



export const authstyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper:{
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#9ae1dd',
    minWidth: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginVertical: 10,
    letterSpacing: 1,
  },
  input:{
    width: 300,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 15,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  buttonContainer:{
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 4,
    marginVertical: 20,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
  navigationText:{
    fontSize: 18,
    marginVertical: 10,
    color: 'purple'
  },
  errorMsg:{
    color: 'red',
    fontSize: 16,
  },

});


