import { Ionicons } from "@expo/vector-icons";
import { format } from 'date-fns';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Article = ({ route, navigation }) => {
  const { article } = route.params;

  const articleDateInUTC = article.publishedAt
  const date = new Date(articleDateInUTC)
  const formattedPublishedDate = format(date, 'dd.MM.yyyy HH:mm')

  const { width } = Dimensions.get('window');
  const imageHeight = width * 0.6;

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navigateBackIconContainer} onPress={navigateBack}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#e5e5e5"
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Lamirnews</Text>
      </View>

      <ScrollView style={styles.scrollView} 
      contentContainerStyle={styles.scrollViewContent} 
      showsVerticalScrollIndicator={false}
      >

        <Image 
          source={{ uri: article.urlToImage }} 
          style={[styles.image, { height: imageHeight }]} 
          resizeMode="cover" 
        />
        <View style={styles.articleData}>
        <Text>{article.source.name}</Text>
        <Text style={styles.publishDate}>{formattedPublishedDate}</Text>
        </View>
        
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>
            {article.description}
            {article.description}
        </Text>

        <Text style={styles.author}>{article.author}</Text>

      </ScrollView>

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
    height: 100,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navigateBackIconContainer: {
    width: 50,
    height: 45,
    backgroundColor: "#3e51ac",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%", 
    borderRadius: 10, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#333", 
    alignSelf: 'flex-start',
    marginBottom: 30, 
  },
  description:{
    fontSize: 16,
    lineHeight: 25,
  },
  articleData:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  publishDate: {
    fontSize: 14,
  },
  author:{
    fontSize: 14,
    fontStyle: 'italic',
    marginVertical: 50,
  },
  titleText: {
    fontSize: 28,
    color: "#f1f1f1",
    letterSpacing: 2,
    fontWeight: "bold",
    alignSelf: 'center',
    margin: 20,
  },
});

export default Article;
