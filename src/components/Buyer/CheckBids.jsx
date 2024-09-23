import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router';

const CheckBidPage = () => {
  const { productId } = useParams();
  console.log(productId)
  const [bidData, setBidData] = useState([]);

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'check-bids');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/products/${productId}/bid-history`); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setBidData(data);
        } else {
          console.error('Failed to fetch bid history data');
        }
      } catch (error) {
        console.error('Error fetching bid history data:', error);
      }
    };
    fetchBidHistory();
  }, [productId]); // Include any dependencies needed for the fetch

  return (
    <div>
      <h1>Check Past Bids</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bidder Name</TableCell>
              <TableCell>Bid Amount</TableCell>
              <TableCell>Date/Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bidData.map((bid, index) => (
              <TableRow key={index}>
                <TableCell>{bid.bidderName}</TableCell>
                <TableCell>${bid.bidAmount}</TableCell>
                <TableCell>{bid.bidTimestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckBidPage;
