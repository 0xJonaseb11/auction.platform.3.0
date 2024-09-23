import { Box, Container, InputAdornment } from '@mui/material'
import React, { useEffect, useRef, useState} from 'react'
import { CardContent } from '@mui/material'
import { styled } from '@mui/system';
import { useSpring, animated } from 'react-spring';
import { Button, TextField, FormControl, InputLabel, Input } from '@mui/material';


const AnimatedCardContent = styled(animated(CardContent))({
  overflow: 'hidden',
});


function ProductForm() {

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'product-form');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);

  const [productData, setProductData] = useState({
    image: '',
    name: '',
    description: '',
    startingBid: '',
    paymentMethod: '',
    minBidAmount: '',
  });

  const fileInputRef = useRef(null);
  const imagePreviewRef = useRef();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Please select a valid image file (JPEG or PNG).');
      fileInputRef.current.value = ''; // Clear the input
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      alert('File size exceeds the limit of 2MB.');
      fileInputRef.current.value = ''; // Clear the input
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviewRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    console.log('Selected File:', file);
    setProductData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data to be submitted:', productData);
    console.log('Making API call');
  
    try {

      const formData = new FormData();
      formData.append('image', productData.image);
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('startingBid', productData.startingBid);
      formData.append('paymentMethod', productData.paymentMethod);
      formData.append('minBidAmount', productData.minBidAmount);
      
      const response = await fetch('http://localhost:9000/api/products/create', {
        method: 'POST',
        body:formData,
        credentials: 'include',
        mode: 'cors',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }
  
      const data = await response.json();
      console.log('Product created:', data);

      setProductData({
        image: null,
        name: '',
        description: '',
        startingBid: '',
        paymentMethod: '',
        minBidAmount: '',
      });
  
    } catch (error) {
      console.error('Error creating product:', error);
      if (error instanceof TypeError && error.message.includes('JSON')) {
        console.error('The server did not return a valid JSON response. This may be due to a server error or misconfiguration.');
      }
    }
  };
  


  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500 },
  });

  return (
    <Container fixed
      maxWidth='xl' 
      sx ={{
        backgroundColor:'rgba(255,255,255,0.7)',
        height:'90vh',
        mt:5,
        border:'2px purple solid',
        borderRadius:'10px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        overflowY:'auto',
      }}>
        <animated.div style={props}>
          <AnimatedCardContent>
            <FormControl encType="multipart/form-data" variant='standard' onSubmit={handleSubmit}>
              <Box mb={2} sx ={{marginX:5, border:'1px grey solid', height:'200px', textAlign:'center'}}>
                <img
                  ref={imagePreviewRef}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px'}}
                />
              </Box>
              <Input id="image" type="file" accept=".jpg, .png" ref={fileInputRef} onChange={handleFileChange}  />
              <InputLabel htmlFor="image"></InputLabel>
            <TextField sx = {{marginTop:2}} variant='filled' label="Name of Product" name="name" value={productData.name} onChange={handleChange} />
            <TextField sx = {{marginTop:2}} variant='filled' label="Description" name="description" value={productData.description} onChange={handleChange} multiline/>
            <TextField sx = {{marginTop:2}} variant='filled' label="Starting Bid Amount" name="startingBid" value={productData.startingBid} onChange={handleChange} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
            <TextField sx = {{marginTop:2}} variant='filled' label="Minimum Bid Amount" name="minBidAmount" value={productData.minBidAmount} onChange={handleChange} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
            <Button onClick={handleSubmit} type="submit" variant="contained" sx = {{ marginTop:5}}>
              Submit
            </Button>
            </FormControl>
          </AnimatedCardContent>
        </animated.div>
      </Container>
  )
}

export default ProductForm