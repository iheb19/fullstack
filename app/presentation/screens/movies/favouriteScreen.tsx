import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromFavorites } from '../../../redux/slices/movieSlice';
import { defaultColor, primaryColor, secondaryColor } from '../../../styles/styles';

interface HomeProps {
  navigation: any;
}

const FavouritesMovies: React.FC<HomeProps> = ({ navigation }) => {
  const movieList = useSelector((state: RootState) => state.movie.listFavourite);
  const dispatch = useDispatch();

  const handleDetailMovie = (id: number) => {
    navigation.navigate('DetailMovie', { movieId: id });
  };

  const handleRemoveFromFavorites = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          {movieList.map((movie) => (
            <TouchableOpacity
              key={movie.id} 
              style={[
                styles.movieContainer,
                movieList.indexOf(movie) % 2 === 0 ? styles.leftMovie : styles.rightMovie,
              ]}
              onPress={() => handleDetailMovie(movie.id)}
            >
              <Image
                style={styles.posterImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
              <Text style={styles.text_name}>{movie.title}</Text>
              <Text style={styles.text_name}>{movie.vote_average}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromFavorites(movie.id)}
              >
                <Text style={styles.removeButtonText}>Remove from Favorites</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    removeButton: {
        backgroundColor: secondaryColor,
        padding: 10,
        marginTop: 5,
        borderRadius:20
      },
      removeButtonText: {
        color: defaultColor,
        fontWeight: 'bold',
        textAlign: 'center',
      },
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
});

export default FavouritesMovies;
