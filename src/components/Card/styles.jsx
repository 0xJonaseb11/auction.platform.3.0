import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const FrontFace = ({ content }) => {
  return (
    <Box sx={{
      display:'flex',
      backgroundColor: 'rgba(13,110,253, 0.5)',
      color: 'black',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      zIndex: 1,
      transformOrigin: 'top center',
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Typography variant='h2' fontFamily='Arial Rounded MT'>
        {content}
      </Typography>
    </Box>
  );
};

const BackFace = ({ content }) => {
  return (
    <Box sx={{
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      backgroundColor: 'white',
      color: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      zIndex: 2,
      transformOrigin: 'bottom center',
    }}>
      {content}
    </Box>
  );
};

const useFlipCard = ({ frontContent, backContent }) => {
  return (
    <Card sx={{
      backgroundColor:'rgba(0,0,0,0)',
      width: 250,
      height: 300,
      position: 'relative',
      perspective: 1000,
    }}>
      <CardContent sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s ease-in-out',
        '&:hover': {
          transform: 'rotateY(180deg)'
        }
      }}>
        <FrontFace content={frontContent} />
        <BackFace content={backContent} />
      </CardContent>
    </Card>
  );
};

export default useFlipCard;
