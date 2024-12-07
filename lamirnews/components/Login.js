import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from 'react-redux';
import { auth } from "../FirebaseConfig";
import { setUser } from '../redux/UserSlice';
import { authstyle } from "../styles/AuthStyles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("")

  const dispatch = useDispatch()

  const onLogin = async () => {
    
    try {
        if(email && password){
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            if(user){
                dispatch(setUser({
                    displayName: user.displayName, 
                    uid: user.uid,
                }));

                setEmail('')
                setPassword('')
                setErrorMsg('')

                navigation.reset({
                  index: 0,
                  routes: [{name: 'Tabnav'}]
                })
            }

        }else{
            setErrorMsg('Please fill all the field before login')
        }
    } catch (error) {
        console.log('Error login: ', error.message)
        setErrorMsg(error.message)
    }



  };

  return (
    <View style={authstyle.container}>
      <View style={authstyle.inputWrapper}>
        <Text style={authstyle.title}>Login</Text>

       

        <TextInput
          style={authstyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={authstyle.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={authstyle.buttonContainer} onPress={onLogin}>
          <Text style={authstyle.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={authstyle.navigationText} onPress={() => navigation.navigate('Signup')}>Don't have an account?</Text>
        
        {
            errorMsg ? <Text style={authstyle.errorMsg}>{errorMsg}</Text> : null
        }

      </View>
    </View>
  );
};

export default Login;
