import { useCallback, useState } from 'react';
import useSearch from 'hooks/search';
import { Result, ResultTypes } from './propTypes';
import Card from 'components/Card';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import styles from './styles.module.scss';
import SearchBar from 'components/SearchBar';
import Typography from '@mui/material/Typography';
import RangeBar from 'components/RangeBar';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebouncedEffect } from 'helper/useDebouncedEffect';
import { RangeOptions, SortOptions } from 'mock/searchOptions';
import SelectBox from 'components/Select';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

type Props = {};

const Search = (props: Props) => {
  const [result, setResult] = useState<ResultTypes | null>(null);
  const [model, setModel] = useState<Result>({});
  const [sortingValue, setSortingValue] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const { complexSearch } = useSearch();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setModel({
      ...model,
      query: event.target.value,
    });
  };

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

  useDebouncedEffect(
    () =>
      complexSearch({ ...model, sort: sortingValue })
        .then((res: any) => {
          setResult(res);
        })
        .finally(() => {
          setLoading(false);
        }),
    [model, sortingValue],
    3000
  );

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
                result?.results.map((item, index) => (
                  <Grid key={item.id} item md={3} xs={12}>
                    <Link to={`/recipes/${item.id}`}>
                      {' '}
                      <Card title={item.title} image={item.image} />
                    </Link>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid className={styles.root} md={4} xs={12}>
          <Box className={styles.wrapper}>
            <SearchBar onChange={handleSearchChange} />
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
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
