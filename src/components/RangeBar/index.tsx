import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import React from 'react';
import { RangeBarTypes } from './propTypes';

function RangeBar({ label, ...rests }: RangeBarTypes) {
  const PrettoSlider = styled(Slider)({
    color: '#e2966d',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#e2966d',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  return (
    <React.Fragment>
      <InputLabel>{label}</InputLabel>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        {...rests}
      />
    </React.Fragment>
  );
}
export default RangeBar;
