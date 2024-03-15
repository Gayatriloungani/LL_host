import { Box, Slider, Typography } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';



const PriceSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Max Price: {'Rs ' + priceFilter}</Typography>
      <Slider
        //min={0}
        max={50000}
        defaultValue={0}
        valueLabelDisplay="auto"
        // marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: 'FILTER_PRICE', payload: price })
        }
      />
    </Box>
  );
};

export default PriceSlider;