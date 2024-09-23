import inventory from '../images/inventory.png'
import addproduct from '../images/addproduct.png'
import chat from '../images/chat.png'
import setpayment from '../images/setpayment.png'
import { Button, CardActions, CardMedia, Container, Grid, Link} from '@mui/material'
import React, {useState} from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/system';
import { useSpring, animated } from 'react-spring';
import ProductForm from './ProductForm';
import { Link as RouterLink } from 'react-router-dom';
import Inventory from './Inventory'
import Chat from '../Chat/Chat'


const AnimatedCardContent = styled(animated(CardContent))({
    overflow: 'hidden',
});



const papers = [
    {
        imageUrl:inventory,
        title: 'Inventory',
      description: 'Check the Status of your product. Update your products details. ',
      button: 'Go to Inventory',
      component:Inventory,
      to:'/inventory'
    },
    {
        imageUrl:addproduct,
        title: 'Add New',
        description: 'Upload your new product for auction',
        button: 'Upload',
        component:ProductForm,
        to: '/product-form'
    },
    {
        imageUrl:chat,
        title: 'Chat',
        description: 'Check out who are trying to connect you for your product.',
        button: 'Chat Room',
        component:Chat,
        to:'/chat'
    },
    {
        imageUrl:setpayment,
        title: 'Set Payment',
        description: 'Set payment methods you want to accept your money.',
      button: 'Payment',
      component:() => <div>working properly</div>,
      to:'/set-payments'
    },
]

function SellerPage() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleCloseComponent = () => {
        setSelectedComponent(null);
    };
    
    const props = useSpring({
        from: { opacity: 0, transform: 'translateX(-50px)' },
        to: { opacity: 1, transform: 'translateX(0px)' },
        config: { duration: 500 },
    });
    
    return (
        <Container fixed
        maxWidth='xl' 
        sx ={{
            overflow:'hidden',
            overflowY:'auto',
            backgroundColor:'rgba(0,0,255,0.2)',
            height:'90vh',
            mt:10,
            border:'1px blue solid',
            borderRadius:'10px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
      <animated.div style={props}>
        <AnimatedCardContent>
            <Grid justifyContent='space-around' container spacing={5} >
                {papers.map((papers, index) => (
                <Grid item xs={12} sm={6} md={3} key={papers.title}>
                    <Card>
                        <CardMedia height='300px' component='img' image={papers.imageUrl} alt={papers.title} />
                        <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {papers.title}
                        </Typography>
                        <Typography variant="body2">{papers.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Link component={RouterLink} to={papers.to}>
                                <Button variant='outlined'>{papers.button}</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </AnimatedCardContent>
        {selectedComponent && <selectedComponent onClose={handleCloseComponent} />}
      </animated.div>
    </Container>
  )
}

export default SellerPage