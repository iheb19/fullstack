import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMovieList} from '../../../data/api/apiMovie';
import {setList} from '../../../redux/slices/movieSlice';
import {RootState} from '../../../redux/store';
import { Icon } from 'react-native-elements';
import { defaultColor, primaryColor } from '../../../styles/styles';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const movieList = useSelector((state: RootState) => state.movie.list);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  useEffect(() => {
    getMovieList()
      .then(data => {
        if (data && data.results) {
          dispatch(setList(data.results));
        }
      })
      .catch(error => {
        console.error('Error fetching movie list:', error);
      });
  }, []);

  const handleDetailMovie = (id: number) => {
    navigation.navigate('DetailMovie', {movieId: id});
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredMovieList = movieList.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
 <View style={styles.searchContainer}>
  <Icon
    name="search"
    size={20}
    color="gray"
    style={styles.searchIcon}
  />
  <TextInput
    style={styles.searchInput}
    placeholder="Search movies..."
    value={searchQuery}
    onChangeText={handleSearch}
    placeholderTextColor="gray"
  />
</View>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          {filteredMovieList.map((movie, index) => (
            <TouchableOpacity
              key={movie.id}
              style={[
                styles.movieContainer,
                index % 2 === 0 ? styles.leftMovie : styles.rightMovie,
              ]}
              onPress={() => handleDetailMovie(movie.id)}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
              <Text style={styles.text_name}>{movie.title}</Text>
              <Text style={styles.text_name}>{movie.vote_average}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultColor,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon:{color:defaultColor},
  backgroundContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  movieContainer: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
  },
  leftMovie: {
    justifyContent: 'flex-start',
  },
  rightMovie: {
    justifyContent: 'flex-end',
  },
  posterImage: {
    width: 150,
    height: 225,
    resizeMode: 'cover',
  },
  text_name: {
    fontWeight: 'bold',
    fontSize: 16,
    color:defaultColor
  },
  searchInput: {
    padding: 10,
    color:primaryColor
  },
});

export default Home;
