import React, { useEffect } from 'react'
import Navbar from '../Seller/Navbar';
import SellerPage from '../Seller/SellerPage';


function SellerInterface() {

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'auction');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);
  return (<>
  <Navbar/>
  <SellerPage/>
  </>
  )
}

export default SellerInterface