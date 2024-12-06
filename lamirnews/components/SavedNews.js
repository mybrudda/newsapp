import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SavedNews = () => {

  

  // const user = useSelector((state) => state.user)
    
  // const dispatch = useDispatch()


  // const onLogout = async () =>{
      

  //     try {
          
  //         dispatch(logoutUser())


  //         await auth.signOut()

  //         navigation.navigate('Login')

  //     } catch (error) {
  //         console.log('Error loggin out', error.message)
  //     }
  // }




  return (
    <View style={styles.container}>
      <Text style={styles.text}>SavedNews</Text>
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

export default SavedNews;
