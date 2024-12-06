import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import SavedNews from "./SavedNews";

const Tab = createBottomTabNavigator();

const Tabnav = () => {

  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarIconStyle: { width: 30, height: 30 },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: {height: 60},
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="SavedNews"
        component={SavedNews}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
          tabBarLabel: "Saved",
        }}
      />

    </Tab.Navigator>
  );
};

export default Tabnav;
