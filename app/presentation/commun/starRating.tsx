import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface StarRatingProps {
  average: number;
}

interface StarRatingStyles {
  container: {
    flexDirection: 'row';
    alignItems: 'center';
  };
  star: {
    margin: number;
  };
}

const StarRating: React.FC<StarRatingProps> = ({ average }) => {
  const filledStars = Math.floor(average / 2);
  const halfStars = average % 2 === 1 ? 1 : 0;

  const stars: React.ReactNode[] = []; // Explicitly define the type of the stars array as React.ReactNode[]

  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <Icon key={i} name="star" size={20} color="gold" style={componentStyles.star} />
    );
  }

  if (halfStars) {
    stars.push(
      <Icon key="half" name="star-half" size={20} color="gold" style={componentStyles.star} />
    );
  }

  const emptyStars = 5 - filledStars - halfStars;

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon key={`empty${i}`} name="star-outline" size={20} color="gold" style={componentStyles.star} />
    );
  }

  return (
    <View style={componentStyles.container}>
      {stars}
    </View>
  );
};

const componentStyles = StyleSheet.create<StarRatingStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    margin: 2,
  },
});

export default StarRating;
