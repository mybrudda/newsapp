import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfig";


const Home = ({navigation}) => {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);


  const currentUser = useSelector((state) => state.user);

  const apiKey = "1d6eb2be249a488b895517b9a7eaddc7";
  const searchEndpoint = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${apiKey}`;
  const categoryEndpoint = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  

  useEffect(() => {
    if (!searchValue) {
      fetchCategoryEndpoint();
    } else {
      fetchSearchEndpoint();
    }
  }, [category]);

  const fetchCategoryEndpoint = async () => {
    try {
      const response = await fetch(categoryEndpoint);
      const data = await response.json();
      const filteredData = data.articles.filter(
        (article) => article.title && article.description && article.urlToImage
      );
      setArticles(filteredData);
    } catch (error) {
      console.log("Error fetching: ", error.message);
    }
  };

  const fetchSearchEndpoint = async () => {
    try {
      if (searchValue) {
        const response = await fetch(searchEndpoint);
        const data = await response.json();
        const filteredData = data.articles.filter(
          (article) =>
            article.title && article.description && article.urlToImage
        );
        setArticles(filteredData);
        setSearchValue("");
      }
    } catch (error) {
      console.log("Error fetching with searchValue: ", error.message);
    }
  };

  const onSaveArticle = async (article) => {
    try {
      if (currentUser.uid) {
        await addDoc(
          collection(db, "users", currentUser.uid, "savedArticles"),
          {
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            author: article.author,
            source: article.source,
            publishedAt: article.publishedAt,
            articleSavedAt: serverTimestamp(),
          }
        );
      }
    } catch (error) {
      console.log("Error saving: ", error.message);
    }
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Article', {article: item})}>
        <View style={styles.articleContainer}>
      <TouchableOpacity
        style={styles.bookmarkIcon}
        onPress={() => onSaveArticle(item)}
      >
        <Ionicons name="bookmark-outline" size={24} color="white" />
      </TouchableOpacity>

      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.articleTitle}>{item.title}</Text>
    </View>

      </TouchableOpacity>
      
    
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Lamirnews</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for news..."
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <TouchableOpacity
            onPress={fetchSearchEndpoint}
            style={styles.SearchIconContainer}
          >
            <Ionicons name="search" size={24} color="#e5e5e5" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.categoryScrollview}
          showsHorizontalScrollIndicator={false}
        >
          {[
            "business",
            "entertainment",
            "general",
            "health",
            "science",
            "sports",
            "technology",
          ].map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.categoryButtonContainer}
                key={index}
                onPress={() => {
                  setCategory(item);
                }}
              >
                <Text style={styles.categoryButtonText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={articles}
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
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    fontSize: 28,
    color: "#f1f1f1",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#ffffff",
    paddingLeft: 12,
    marginHorizontal: 10,
  },
  SearchIconContainer: {
    width: 50,
    height: 45,
    backgroundColor: "#3e51ac",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryScrollview: {
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 10,
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
  bookmarkIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  categoryButtonContainer: {
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#b2d3e3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  categoryButtonText: {
    color: "#333",
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    textTransform: "capitalize",
  },
});

export default Home;
