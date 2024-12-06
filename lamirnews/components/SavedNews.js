import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../FirebaseConfig";
import { logoutUser } from "../redux/UserSlice";

const SavedNews = ({navigation}) => {
  const [savedArticles, setSavedArticles] = useState([]);

  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const onLogout = async () => {
    try {
      dispatch(logoutUser());

      await auth.signOut();

      navigation.navigate("Login");
    } catch (error) {
      console.log("Error loggin out", error.message);
    }
  };

  const fetchSavedArticles = async () => {
    try {
      if (currentUser.uid) {
        const savedArticlesRef = collection(
          db,
          "users",
          currentUser.uid,
          "savedArticles"
        );

        const querySnapshot = await getDocs(savedArticlesRef);

        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedArticles(articles);
      }
    } catch (error) {
      console.log("Error fetching articles from Firestore: ", error.message);
    }
  };



  

  const renderItem = ({ item }) => (
    <View style={styles.articleContainer}>
      <TouchableOpacity
        style={styles.trashIcon}
        // onPress={}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>

      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.articleTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
          {currentUser.displayName}'s saved articles
        </Text>
        <TouchableOpacity
          style={styles.logoutIcon}
          onPress={onLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={savedArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d0d0",
  },
  header: {
    width: "100%",
    backgroundColor: "#4a90e2",
    minHeight: 80,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20,
    flexDirection: 'row'
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  articleContainer: {
    width: "90%",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginBottom: 20,
  },
  trashIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  logoutIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#3e51ac",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginVertical: 20,

  },
});

export default SavedNews;
