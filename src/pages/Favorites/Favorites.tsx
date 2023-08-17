// libraries
import { useState } from 'react';
import { Container, Box } from '@mui/material';
import Card from 'components/Card';
import { Grid } from '@mui/material';
import { readFavoritesWishes, removeRecipe, storeRecipe } from 'helper/wishes';
import { useNavigate } from 'react-router-dom';
import { ResultTypes } from 'pages/Search/propTypes';

const Wishes = () => {
  const history = useNavigate();
  const [wishesList, setWishesList] = useState(readFavoritesWishes());

  const handleGoToDetail = (id: number) => {
    history(`recipes/${id}`);
  };
  const handleAddToWishes = (e: Event, recipe: ResultTypes) => {
    e.stopPropagation();
    if (wishesList.some((item: ResultTypes) => item.id === recipe.id)) {
      removeRecipe(recipe.id);
      const updatedList = wishesList.filter(
        (item: ResultTypes) => item.id !== recipe.id
      );
      setWishesList(updatedList);
      storeRecipe(updatedList);
    } else {
      storeRecipe(recipe);
      setWishesList([...wishesList, recipe]);
    }
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {wishesList.map((item: any) => (
          <Grid md={6} xs={12}>
            <Box padding={2}>
              <Card
                onClick={() => handleGoToDetail(item.id)}
                onHeartClick={(e: Event) => handleAddToWishes(e, item)}
                title={item.title}
                image={item.image}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishes;
