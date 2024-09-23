// src/App.js
import React from 'react';
import AuctionLandingPage from './components/LandingPage/AuctionLandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlaceBid from './components/Buyer/PlaceBid';
import SellerInterface from './components/Auction/SellerInterface';
import AuctionInterface from './components/Auction/AuctionInterface';
import ProductForm from './components/Seller/ProductForm';
import Inventory from './components/Seller/Inventory';
import CheckBidPage from './components/Buyer/CheckBids';
import { AuthProvider } from './AuthContext';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuctionLandingPage />} />
            <Route path="/auction-platform" element={<AuctionInterface />} />
            <Route path="/place-bid/:minBidAmount/:description/:productId/:startingBid"  element={<PlaceBid />} />
            <Route path="/seller-platform" element={<SellerInterface />} />
            <Route path="/check-bid-history/:productId" element={<CheckBidPage />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
