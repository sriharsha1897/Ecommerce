import React, { useContext } from "react";
import Cart from "../cart/Cart";
import CartIcon from "../cart/CartIcon";
import cartContext from "../store/cart-Context";
import showCartContext from "../store/showCart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const cartCtx = useContext(cartContext);
  const showCartCtx = useContext(showCartContext);

  let cartQuantity = 0;

  cartCtx.item.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return (
    <>
      <button className={classes.button} onClick={showCartCtx.showCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{cartQuantity}</span>
      </button>
      {showCartCtx.cartState && <Cart onClick={showCartCtx.hideCart} />}
    </>
  );
};

export default HeaderCartButton;
