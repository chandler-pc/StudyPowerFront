import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
function valuetext(value) {
    return `${value}°C`;
}


export default function DiscreteSlider({onChange}) {
  return (
    <Grid container spacing={3} justifyContent="center">
    <Grid item xs={11} md={6}>
    <Box sx={{  color:"success" }}>
      <Slider
        aria-label="Temperature"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={50}
        step={10}
        marks
        min={10}
        max={100}
        color="principal"
        onChange={onChange}
      />
      
    </Box>
    </Grid>
    </Grid>
  );
}
