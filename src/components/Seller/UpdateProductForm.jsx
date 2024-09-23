// UpdateProductForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UpdateProductForm = ({ open, handleClose, product, updateProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    startingBid: product.startingBid,
    minBidAmount: product.minBidAmount,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Call the updateProduct function with the updatedProduct details
    updateProduct(product._id, updatedProduct);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={updatedProduct.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Starting Bid"
          name="startingBid"
          value={updatedProduct.startingBid}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Minimum Bid Amount"
          name="minBidAmount"
          value={updatedProduct.minBidAmount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProductForm;
