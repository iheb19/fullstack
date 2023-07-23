import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,  TouchableOpacity } from 'react-native';
import { getMovieDetail } from '../../../data/api/apiMovie';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from '../../../redux/slices/movieSlice';
import { RootState } from '../../../redux/store';
import StarRating from '../../commun/starRating';
import { defaultColor, primaryColor, secondaryColor } from '../../../styles/styles';
interface MovieDetailProps {
  route: any; 
}

const DetailMovie: React.FC<MovieDetailProps> = ({ route }) => {

  const { movieId } = route.params;
  const dispatch = useDispatch();
  const [movieDetail, setMovieDetail] = useState<any>(null);
  const favorites = useSelector((state: RootState) => state.movie.listFavourite);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

  const fetchMovieDetail = async () => {
    try {
      const data = await getMovieDetail(movieId);
      setMovieDetail(data);
      if (favorites.find((movie) => movie.id === data.id)) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error getting movie detail:', error);
    }
  };

  const addToFavorites = () => {
    dispatch(addToFavourite(movieDetail));
    setButtonDisabled(true); 
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]); 

  return (
    <ScrollView>
      <View style={styles.container}>
        {movieDetail ? (
          <>
            <View style={styles.image}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                }}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movieDetail.title}</Text>
          <View style={styles.averageContainer}>
              <StarRating average={movieDetail.vote_average} />
              <Text style={styles.voteAverage}>{movieDetail.vote_average}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.runtime}>{movieDetail.runtime} minutes</Text>
              <Text style={styles.runtime}>{movieDetail.release_date}</Text>

            </View>
            <View style={styles.detailsRow}>
              <Text>
                {movieDetail.genres.map((genre:any, index:any) => (
                  <View key={index} style={styles.card_genre}>
                    <Text style={styles.genre_name}>{genre.name}</Text>
                  </View>
                ))}
              </Text>
            </View>
            <View>
              <Text style={styles.overviewTitle}>Overview:</Text>
              <View style={styles.card_overview_text}>
                <Text style={styles.overview}>{movieDetail.overview}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.addToFavoritesButton, isButtonDisabled && styles.disabledButton]}
              onPress={addToFavorites}
              disabled={isButtonDisabled} 
            >
              <Text style={styles.addToFavoritesButtonText}>
                {isButtonDisabled ? 'Added to Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
  disabledButton: {
    backgroundColor: 'grey', 
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
  },
  genre_name:{
    color:defaultColor,
    padding:10,
    fontWeight:'bold'
  },
  card_overview: {
    borderColor: primaryColor,
    borderWidth: 3,
  },
  card_overview_text: {
    borderColor: primaryColor,
    borderWidth: 3,
    margin:10,
    fontSize:18
  },
  card_genre: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: secondaryColor,


  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:primaryColor
  },
  posterImage: {
    width: '80%',
    height: 350,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color:defaultColor
  },
  voteAverage: {
    fontSize: 16,
    color:defaultColor
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10
  },
  runtime: {
    fontSize: 16,
    marginTop: 5,
    color:defaultColor
  },

  genresContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  genresItem: {
    fontSize: 16,
    marginRight: 10,
    color:defaultColor
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color:defaultColor
  },
  overview: {
    fontSize: 16,
    marginTop: 5,
    color:defaultColor
  },
  addToFavoritesButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addToFavoritesButtonText: {
    color: defaultColor,
    fontWeight: 'bold',
  },
});

export default DetailMovie;
