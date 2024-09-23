import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import Login from "../Auth/Login";
import Signup from "../Auth/SignUp";
import FlipCard from "../Card/styles";

function AuctionLandingPage() {

    const [selectedRole, setSelectedRole] = useState(null);

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSignupDialog, setOpenSignupDialog] = useState(false);

    const handleOpenLoginDialog = (role) => {
      setSelectedRole(role);
      setOpenLoginDialog(true);
    };

    const handleOpenSignupDialog = (role) => {
      setSelectedRole(role);
      // console.log('role set to', role)
      setOpenSignupDialog(true);
    };

    const handleCloseDialogs = () => {
      setOpenLoginDialog(false);
      setOpenSignupDialog(false);
    };

      const backLoginContent = <Stack rowGap={5} sx ={{width: 200}}>
                            <Button onClick={() => handleOpenLoginDialog('seller')} size='large' variant = 'contained' color='secondary'>Seller</Button>
                            <Button onClick={() => handleOpenLoginDialog('buyer')} size='large' variant = 'contained'>Buyer</Button>
                          </Stack>
      const backSignContent = <Stack rowGap={5} sx ={{width: 200}}>
                            <Button onClick={() => handleOpenSignupDialog('seller')} size='large' variant = 'contained' color='secondary'>Seller</Button>
                            <Button onClick={() => handleOpenSignupDialog('buyer')} size='large' variant = 'contained'>Buyer</Button>
                          </Stack>
      const flipLoginCard = FlipCard({ frontContent: "Login", backContent: backLoginContent, selectedRole: selectedRole,});
      const flipSignCard = FlipCard({ frontContent:"SignUp", backContent: backSignContent, selectedRole: selectedRole,});
  
      useEffect(() => {
        // Set the data-route attribute to 'landing' on component mount
        document.body.setAttribute('data-route', 'landing');
    
        // Clean up on component unmount
        return () => {
          document.body.removeAttribute('data-route');
        };
      }, []);
  
  return (
    <React.Fragment>
      <Dialog open={openLoginDialog} onClose={handleCloseDialogs}>
        <Login selectedRole={selectedRole}></Login>
      </Dialog>
      <Dialog open={openSignupDialog} onClose={handleCloseDialogs}>
        <Signup selectedRole={selectedRole} ></Signup>
      </Dialog>

      <>
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.7)",
            marginTop: "80vh",
            textAlign: "center",
            height:'100vh',
            boxShadow: "0px 0px 10px black",
            paddingX: 20,
            paddingY: 2,
          }}
        >
          <Typography
            sx={{
              marginX:40,
              borderRadius:10,
              fontSize: 45,
              backgroundColor: "rgba(0,255,0,0.5)",
              fontFamily: "Arial Rounded MT",
            }}
          >
            Auction Platform
          </Typography>
          <Typography 
            sx={{
              mt: 2,
              fontFamily: "Arial Rounded MT",
              fontSize: 20,
            }}
          >
            Join us for an exciting auction of distressed properties, including REOs, short sales, and foreclosures.
          </Typography>

          <Stack direction ={{xs: 'column', sm: 'row'}} spacing={3} mt={10} justifyContent="space-around">
            {flipLoginCard}
            {flipSignCard}
            </Stack>

          <Typography sx={{ marginTop: "calc(10% + 60px)" }}>
            Project is made by Daniel Peter.
          </Typography>
        </Box>
      </>
    </React.Fragment>
  );
}

export default AuctionLandingPage;
