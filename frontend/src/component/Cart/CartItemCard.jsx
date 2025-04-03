import React from 'react';
import { Link } from 'react-router-dom';
import "./cartItemCard.css"

const CartItemCard = ({item, deleteCartItems}) => {
  return (
      <>
          <div className="cartItemCard">
          <Link to={`/product/${item.product}`}> <img src={item.image} alt='ssa'/></Link>
              <div>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>Price: &#8377;{item.price}</span>
                  <button onClick={()=>deleteCartItems(item.product)} >Remove</button>
              </div>
          </div>
      </>
  )
}

export default CartItemCard