import React, { useEffect, useState } from 'react';
import { Dialog, Button, Typography, Box, TextField, FormControl, Alert, AlertTitle, Paper } from '@mui/material';
import { useParams,useNavigate} from 'react-router-dom';

export const PlaceBid = () => {
  const navigate = useNavigate()
  const { minBidAmount, description, productId, startingBid } = useParams();
  const [bidAmount, setBidAmount] = useState('');
  const initialStoredValue = localStorage.getItem('yourVariable');
  console.log('initialvalue', initialStoredValue)
  const [currentValue, setCurrentValue] = useState(initialStoredValue !== null ? JSON.parse(initialStoredValue) : null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  // console.log(productId)

  const handlePlaceBid = async () => {
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue < minBidAmount) {
      setIsWarningOpen(true);
      setIsConfirmationOpen(false);
      return;
    }
    setIsWarningOpen(false);
    setIsConfirmationOpen(true);
    
    try {
      const response = await fetch(`http://localhost:9000/api/products/${productId}/place-bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bidderName: 'User Name', // Replace with actual bidder name
          bidAmount,
        }),
      });
      console.log('success')
      
      if (response.ok) {
        console.log('Bid submitted successfully');
      } 
      
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };
  const startingBidNumber = parseFloat(startingBid);
  useEffect(() => {
    const parsedBidAmount = parseFloat(bidAmount);
    const calculatedValue = startingBidNumber + (isNaN(parsedBidAmount) ? 0 : parsedBidAmount);
    setCurrentValue(calculatedValue);
    localStorage.setItem('yourVariable', JSON.stringify(calculatedValue));

  }, [ bidAmount, startingBidNumber]);
  
  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setBidAmount('');
    navigate(`/check-bid-history/${productId}`)
  };
  
  const handleWarningClose = () => {
      setIsWarningOpen(false);
    };

    return (
      <Box sx ={{
          height:'100vh', 
          display:'flex',
          justifyContent:'center',
          alignItems:'center',}}>
          <FormControl sx = {{display:'flex',alignItems:'center', justifyContent:'center', height:'80vh', width:'70vh'}}>
            <Paper elevation={5} sx = {{paddingX:6, paddingY:5}}>
              <Typography variant="h3" mb = {5}>Place Bid</Typography>
              <Typography mb={5} variant="body1"><strong>Description:</strong><br/>{decodeURIComponent(description)}</Typography>
              <Typography variant="body1" mb={1}>Enter your bid amount here.</Typography>
              <TextField 
              type = "number" 
              id="outlined-basic" 
              label="Place Bid" 
              variant="outlined"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)} />
              <Typography mb={1} mt={3} variant="body1">Minimum Amount to bid is ${minBidAmount}</Typography>
              <Typography mb={1} mt={3} variant="body1"> Current Value ${currentValue}</Typography>
              <Button variant="contained" color="primary" onClick={handlePlaceBid}>Place Bid</Button>
              </Paper>
          </FormControl>
      {isWarningOpen &&
      <Alert severity="warning" variant="outlined" open={isWarningOpen} onClose={handleWarningClose}>
        <AlertTitle>Warning</AlertTitle>
        Bid amount must be a number and at least <strong>${minBidAmount}</strong>.
      </Alert>}
      <Dialog open={isConfirmationOpen} onClose={handleConfirmationClose}>
        <Box sx={{ 
            width: '60vh', 
            height: '30vh', 
            padding: 5,
            display:'flex',
            justifyContent:'center',
            alignItems:'center', }}>
          <FormControl>
            <Typography variant="h4" mb={5}>
              Bid Confirmation
            </Typography>
            <Typography variant="body1">Congratulations! Your bid of ${bidAmount} has been placed.</Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmationClose}>
              Close
            </Button>
          </FormControl>
        </Box>
      </Dialog>
      </Box>
    
  );
};

export default PlaceBid;