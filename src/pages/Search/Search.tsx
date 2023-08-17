import { useEffect, useState } from 'react';
import useSearch from 'hooks/search';
import { Result, ResultTypes } from './propTypes';
import Card from 'components/Card';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import RangeBar from 'components/RangeBar';
import CircularProgress from '@mui/material/CircularProgress';
import { RangeOptions, SortOptions } from 'mock/searchOptions';
import SelectBox from 'components/Select';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { readFavoritesWishes, removeRecipe, storeRecipe } from 'helper/wishes';
import { debounce } from 'lodash';

type Props = {};

const Search = (props: Props) => {
  const history = useNavigate();
  const [result, setResult] = useState<ResultTypes | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [wishesList, setWishesList] = useState(readFavoritesWishes());
  const [model, setModel] = useState<Result>({});
  const [sortingValue, setSortingValue] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const { complexSearch, autoCompleteRecipeSearch } = useSearch();

  const handleChangeSorting = (event: SelectChangeEvent) => {
    setSortingValue(event.target.value as string);
  };
  const handleChangeRange = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    const value = event.target.value;
    setModel({
      ...model,
      [title]: value,
    });
  };
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

  const handleSubmitSearch = (value?: string) => {
    setLoading(true);
    complexSearch({
      ...model,
      sort: sortingValue,
      query: value || searchValue,
    })
      .then((res: any) => {
        setResult(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleSubmitSearch();
  }, []);

  const [options, setOptions] = useState<any>([]);

  const handleInputChange = debounce(async (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
    autoCompleteRecipeSearch(value).then((res: any) => {
      const dataArray = Object.values(res);
      setOptions(dataArray);
    });
  }, 3000);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid className={styles.root} md={8} xs={12}>
          <Box className={styles.wrapper}>
            <Grid container spacing={2}>
              {loading ? (
                <Box className={styles.loading}>
                  {' '}
                  <CircularProgress />
                </Box>
              ) : result?.totalResults === 0 ? (
                <Typography className={styles.emptyMessage} variant="body2">
                  I'm sorry, but I couldn't find any recipes that match your
                  search criteria. It's possible that the specific recipe you're
                  looking for isn't available or it could be spelled
                  differently. Please try refining your search or exploring
                  other recipe websites for better results.
                </Typography>
              ) : (
                result?.results.map((item: any) => (
                  <Grid key={item.id} item md={3} xs={12}>
                    <Card
                      isFave={
                        wishesList.filter((wish: any) => wish.id === item.id)
                          .length > 0
                      }
                      onClick={() => handleGoToDetail(item.id)}
                      onHeartClick={(e: Event) => handleAddToWishes(e, item)}
                      title={item.title}
                      image={item.image}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid className={styles.root} md={4} xs={12}>
          <Box className={styles.searchBox}>
            <Autocomplete
              options={options}
              onChange={(e: any, option: any) =>
                handleSubmitSearch(option?.title)
              }
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Search..." variant="outlined" />
              )}
              onInputChange={handleInputChange}
            />

            <Box mt={3}>
              {RangeOptions.map((item, i) => (
                <RangeBar
                  key={i}
                  onChange={(e: any) => handleChangeRange(e, item)}
                  label={item}
                  value={model[item]}
                />
              ))}
            </Box>
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="SortingBy">SortingBy</InputLabel>
                <SelectBox
                  labelId="SortingBy"
                  id="Sorting"
                  className={styles.selectBox}
                  value={sortingValue}
                  label="SortingBy"
                  onChange={handleChangeSorting}
                >
                  {SortOptions.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </SelectBox>
              </FormControl>
            </Box>
            <Button
              onClick={() => handleSubmitSearch()}
              className={styles.searchSubmit}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
