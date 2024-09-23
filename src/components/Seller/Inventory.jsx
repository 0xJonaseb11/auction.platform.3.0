import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Button, CardActions } from '@mui/material';
import UpdateProductForm from './UpdateProductForm';

const Inventory = () => {

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'inventory');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);
  
    const [product, setProducts] = useState([]);
    const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
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

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdateFormOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (productId, updatedProductDetails) => {
    try {
      const response = await fetch(`http://localhost:9000/api/products/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductDetails),
      });

      if (response.ok) {
        // If the update is successful, fetch the updated product list
        const updatedProducts = await fetch('http://localhost:9000/api/products/getAll').then((res) =>
          res.json()
        );
        setProducts(updatedProducts);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
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
              <Typography variant="body2">Starting Price of Product: ${product.startingBid} </Typography>
              <Typography variant="body2">Minimum Bid you can offer: ${product.minBidAmount}</Typography>
            </CardContent>
            <CardActions>
              {/* <Link component={RouterLink} to={`/place-bid/${product.minBidAmount}/${encodeURIComponent(product.description)}/${product._id}/${product.startingBid}`}> */}
                <Button variant='outlined' onClick={() => handleUpdateClick(product)}>Modify Product</Button>
              {/* </Link> */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    {selectedProduct && (
        <UpdateProductForm
          open={isUpdateFormOpen}
          handleClose={handleCloseUpdateForm}
          product={selectedProduct}
          updateProduct={handleUpdateProduct}
        />
      )}
    </Container>
  );
};

export default Inventory;
