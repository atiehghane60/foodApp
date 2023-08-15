import { useEffect, useState } from 'react';
import useSearch from 'hooks/search';
import { ResultTypes } from './propTypes';
import Card from 'components/Card';
import { Box, Grid } from '@mui/material';
import styles from './styles.module.scss';
import SearchBar from 'components/SearchBar';
import Typography from '@mui/material/Typography';
import RangeBar from 'components/RangeBar';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebouncedEffect } from 'helper/useDebouncedEffect';

type Props = {};

const Search = (props: Props) => {
  const [result, setResult] = useState<ResultTypes | null>(null);
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const { complexSearch } = useSearch();
  const handleSearchChange = (event: any) => {
    setLoading(true);
    setModel({
      ...model,
      query: event.target.value,
    });
  };

  useDebouncedEffect(
    () =>
      complexSearch(model)
        .then((res: any) => {
          setResult(res);
        })
        .finally(() => {
          setLoading(false);
        }),
    [model],
    3000
  );

  return (
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
                looking for isn't available or it could be spelled differently.
                Please try refining your search or exploring other recipe
                websites for better results.
              </Typography>
            ) : (
              result?.results.map((item, index) => (
                <Grid key={item.id} item md={3} xs={12}>
                  <Card title={item.title} image={item.image} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid className={styles.root} md={4} xs={12}>
        <Box className={styles.wrapper}>
          <SearchBar onChange={handleSearchChange} />
          <RangeBar label="test" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Search;
