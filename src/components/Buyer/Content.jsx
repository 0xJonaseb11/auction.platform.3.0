import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Button, CardActions, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CardDisplay = () => {
    const [product, setProducts] = useState([]);

    useEffect(() => {
      // Set the data-route attribute to 'auction' on component mount
      document.body.setAttribute('data-route', 'buyer-content');
  
      // Clean up on component unmount
      return () => {
        document.body.removeAttribute('data-route');
      };
    }, []);
    
    useEffect(() => {
      // Fetch product data from the server
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:9000/api/products/getAll'); // Replace with your API endpoint
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
          console.error('Failed to fetch product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // const minBidValue= product[0].minBidAmount;
  // console.log('minimum bid valule is ', minBidValue)
  
  return (
    <Container sx = {{mt:11, mb:2}}>
    <Grid container spacing={2}>
      {product.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card>
            <CardMedia
              component="img"
              image={`http://localhost:9000/${product.imageUrl}`}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              {/* <Typography variant="body2">{product.description}</Typography> */}
              <Typography variant="body2">Starting Price of Product: ${product.startingBid} </Typography>
              <Typography variant="body2">Minimum Bid you can offer: ${product.minBidAmount}</Typography>
            </CardContent>
            <CardActions>
              <Link component={RouterLink} to={`/place-bid/${product.minBidAmount}/${encodeURIComponent(product.description)}/${product._id}/${product.startingBid}`}>
                <Button variant='outlined'>Place Bid</Button>
              </Link>
              <Link component={RouterLink} to={`/check-bid-history/${product._id}`}>
                <Button variant='outlined'>Check Last bids</Button><br/>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default CardDisplay;
