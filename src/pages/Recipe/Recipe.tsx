// libraries

import useRecipe from 'hooks/recipe';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { RecipeType } from './propTypes';
import { Link, useMatch } from 'react-router-dom';
import recipeHeader from 'assets/recipeHeader.webp';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Container,
} from '@mui/material';
import Table from 'components/Table';
import Card from 'components/Card';

const Recipe = () => {
  const [recipe, setRecipe] = useState<any>({});
  const [similarRecipes, setSimilarRecipes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { recipeInformation, SimilarRecipe } = useRecipe();
  const match = useMatch('/recipes/:id');

  useEffect(() => {
    if (match) {
      setLoading(true);
      SimilarRecipe(match.params.id).then((res: any) => {
        const dataArray = Object.values(res);
        setSimilarRecipes(dataArray);
      });
      recipeInformation(match.params.id)
        .then((res: any) => {
          setRecipe(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <Box className={styles.loading}>
          {' '}
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box className={styles.header}>
            <img className={styles.headImage} src={recipeHeader} />
            <Container maxWidth="xl">
              <Box className={styles.headerWrapper}>
                <img
                  className={styles.picture}
                  src={recipe.image}
                  alt={recipe.title}
                />
                <Box className={styles.informationTitle}>
                  <Typography variant="h5">{recipe.title}</Typography>
                  <Typography variant="body1">
                    Preparation Time: {recipe.readyInMinutes} minutes
                  </Typography>
                  <Typography variant="body1">
                    number of servings: {recipe?.servings}
                  </Typography>
                  <Typography variant="body2">diets</Typography>
                  {recipe?.diets.map((diet: string, index: number) => (
                    <Typography key={index} variant="body2">
                      {index + 1}-{diet}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>
          <Container>
            <Grid mt={4} container spacing={2}>
              <Grid className={styles.root} md={7} xs={12}>
                <Box p={3}>
                  <Typography mb={2} variant="h5">
                    Ingredients:
                  </Typography>
                  <Table
                    data={recipe.extendedIngredients}
                    rows={['name', 'unit', 'amount']}
                    columns={['Name', 'Unit', 'amount']}
                  />
                </Box>
              </Grid>
              <Grid className={styles.root} md={5} xs={12}>
                <Box p={3}>
                  <Typography mb={2} variant="h5">
                    Instructions:
                  </Typography>
                  <ol>
                    {recipe.analyzedInstructions.length > 0 &&
                      recipe.analyzedInstructions[0].steps.map((step: any) => (
                        <li key={step.number}>{step.step}</li>
                      ))}
                  </ol>
                </Box>
              </Grid>
            </Grid>
            <Typography mb={2} variant="h5">
              Similar Recipes:
            </Typography>
            <ol>
              {similarRecipes?.map((item: any) => (
                <a href={`/recipes/${item.id}`}>
                  <li key={item.id}>{item.title}</li>
                </a>
              ))}
            </ol>
          </Container>
        </>
      )}
    </Box>
  );
};

export default Recipe;
