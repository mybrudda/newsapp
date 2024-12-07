
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import Article from "./components/Article";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tabnav from "./components/Tabnav";
import { store } from './redux/Store';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Tabnav" component={Tabnav}/>
        <Stack.Screen name="Article" component={Article}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

