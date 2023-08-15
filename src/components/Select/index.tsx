import { Container, Select, TextField } from '@mui/material';
import styles from './styles.module.scss';
import styled from '@emotion/styled';

function SelectBox({ ...rests }) {
  const CustomSelect = styled(Select)(() => ({
    width: 300,
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e2966d',
      },
      '&:hover fieldset': {
        borderColor: '#e2966d',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#e2966d',
      },
    },
  }));
  return <CustomSelect {...rests} />;
}
export default SelectBox;
