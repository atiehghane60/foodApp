import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardTypes } from './propTypes';
import styles from './styles.module.scss';

export default function RecipeReviewCard({
  title,
  image,
  onHeartClick,
  onClick,
  isFave
}: CardTypes) {

  return (
    <Card onClick={onClick}>
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent className={styles.cardContent}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onHeartClick} aria-label="add to favorites">
          <FavoriteIcon color={isFave ? "error": "action"} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
