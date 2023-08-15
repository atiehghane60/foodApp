import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import styles from './styles.module.scss';

function Footer() {
  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          {'AtiehGhane'}
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;
