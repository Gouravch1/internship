
import React from 'react'; 
import Header from './components/Header/Header'; 
import Home from './pages/Home/Home'; 
import Cart from './components/cart/Cart';
import './App.css'; 

const App = () => {
  return (
    <div className="app">
      <Header /> 
      <Home /> 
      <Cart />
    </div>
  );
};

export default App; 
