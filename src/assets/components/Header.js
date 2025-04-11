import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <nav>
        <Link to="/products">Home</Link>
        <Link to="/cart">Cart 🛒</Link>
        {isAuth && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Header;
