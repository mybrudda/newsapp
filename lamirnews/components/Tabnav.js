import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../FirebaseConfig';
import { logoutUser } from '../redux/UserSlice';

const Tabnav = ({navigation}) => {

    const user = useSelector((state) => state.user)

const dispatch = useDispatch()
    const onLogout = async () =>{
        

        try {
            
            dispatch(logoutUser())


            await auth.signOut()

            navigation.navigate('Login')

        } catch (error) {
            console.log('Error loggin out', error.message)
        }
    }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tabnav Screen</Text>
      <Text style={styles.text}>{user.displayName}</Text>
      <Text style={styles.text}>{user.uid}</Text>
      <Button title='logout' onPress={onLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default Tabnav;
