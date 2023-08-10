import React, { useContext } from "react";

import classes from "./CartItem.module.css";
import Button from "../UI/Button";
import cartContext from "../store/cart-Context";

const CartItem = (props) => {
  let userEmail;
  if (localStorage.getItem("tokenId")) {
    userEmail = JSON.parse(localStorage.getItem("tokenId")).email;
    userEmail = userEmail.replace(/[@.]/g, "");
  }

  const cartCtx = useContext(cartContext);

  const removeCartItemHandler = async () => {
    let updatedItem = [...cartCtx.item];
    let updatedAmount = cartCtx.totalAmount;

    const cartItemIndex = updatedItem.findIndex(
      (item) => item.title === props.item.title
    );

    if (updatedItem[cartItemIndex].quantity === 1 && updatedItem[cartItemIndex].quantity !== 0) {
      try {
        await fetch(
          `https://crudcrud.com/api/25a43a3139154513afc3e6af63d646e7/cartItem${userEmail}/${updatedItem[cartItemIndex]._id}`,
          {
            method: "DELETE",
          }
        );
        updatedAmount = updatedAmount - updatedItem[cartItemIndex].price;
        updatedItem = updatedItem.filter(
          (item) => item.title !== props.item.title
        );

        cartCtx.removeItem({ item: updatedItem, totalAmount: updatedAmount });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        await fetch(
          `https://crudcrud.com/api/25a43a3139154513afc3e6af63d646e7/cartItem${userEmail}/${updatedItem[cartItemIndex]._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title: updatedItem[cartItemIndex].title,
              price: updatedItem[cartItemIndex].price,
              imageUrl: updatedItem[cartItemIndex].imageUrl,
              quantity: updatedItem[cartItemIndex].quantity - 1,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        updatedAmount = updatedAmount - updatedItem[cartItemIndex].price;
        updatedItem[cartItemIndex].quantity -= 1;

        cartCtx.removeItem({ item: updatedItem, totalAmount: updatedAmount });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <div className={classes.div}>
        <img src={props.item.imageUrl} alt="Laptop" />
        <span>{props.item.title}</span>
        <span>₹{props.item.price}</span>
        <span>{props.item.quantity}</span>
        <Button title="REMOVE" onClick={removeCartItemHandler} />
      </div>
    </>
  );
};

export default CartItem;
