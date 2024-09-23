import React,{useEffect} from 'react'
import Navbar from '../Buyer/Navbar';
import CardDisplay from '../Buyer/Content';

function AuctionInterface() {

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'auction-platform');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);

  return (<>
  <Navbar/>
  <CardDisplay/>
  </>
  )
}

export default AuctionInterface