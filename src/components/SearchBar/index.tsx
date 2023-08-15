import { Container, TextField } from '@mui/material';
import styles from './styles.module.scss';

function SearchBar({ ...rests }) {
  return (
    <TextField
      InputProps={{
        classes: {
          notchedOutline: styles.root,
        },
      }}
      InputLabelProps={{
        className: styles.labelFocus,
      }}
      className={styles.root}
      variant="outlined"
      type="search"
      id="search"
      label="Search"
      {...rests}
    />
  );
}
export default SearchBar;
