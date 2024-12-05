import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../FirebaseConfig";
import { authstyle } from "../styles/AuthStyles";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState('')


  

  const onRegister = async () =>{
    try {

        if(email && password && username){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // await sendEmailVerification(user)

            await updateProfile(user, {
                displayName: username,
            })

            await setDoc(doc(db, 'users', user.uid),{
                username: username,
                email: email,
                verified: false,
                createdAt: serverTimestamp(),
            })

            setUsername('')
            setEmail('')
            setPassword('')
            setErrorMsg('')

            Alert.alert('User ' + user.displayName + ' created!')

            navigation.navigate('Login')

        } else{
            setErrorMsg('Please fill all the field before sign up')
        }

        
    } catch (error) {
        console.error('Error authenticating: ', error.message)
        setErrorMsg(error.message)
        
    }
  }

  return (
    <View style={authstyle.container}>
      <View style={authstyle.inputWrapper}>
        <Text style={authstyle.title}>Sign up</Text>
       
        <TextInput
          style={authstyle.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

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

        <TouchableOpacity
          style={authstyle.buttonContainer}
          onPress={onRegister}
        >
          <Text style={authstyle.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={authstyle.navigationText} onPress={() => navigation.navigate('Login')}>Already have an account?</Text>

        {
            errorMsg ? <Text style={authstyle.errorMsg}>{errorMsg}</Text> : null
        }

      </View>
    </View>
  );
};

export default Signup;
