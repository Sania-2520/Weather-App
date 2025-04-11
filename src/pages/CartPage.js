import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => updateQuantity(item.id, +e.target.value)}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && (
        <>
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      {showPopup && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginTop: '10px' }}>
          Order placed successfully!
        </div>
      )}
    </div>
  );
}

export default CartPage;
