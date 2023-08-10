import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./LaptopItems.module.css";
import Button from "../UI/Button";
import cartContext from "../store/cart-Context";
import productContext from "../store/product-context";

const LaptopItems = (props) => {
  let userEmail;
  if (localStorage.getItem("tokenId")) {
    userEmail = JSON.parse(localStorage.getItem("tokenId")).email;
    userEmail = userEmail.replace(/[@.]/g, "");
  }

  const cartCtx = useContext(cartContext);
  const productCtx = useContext(productContext);

  const product = {
    title: props.item.title,
    imageUrl: props.item.imageUrl,
    price: props.item.price,
    quantity: 1,
  };

  const addingItemToCartHandler = async () => {
    let updatedItem = [...cartCtx.item];
    let updatedAmount = cartCtx.totalAmount;
    updatedAmount = updatedAmount + product.price * product.quantity;

    const cartItemIndex = cartCtx.item.findIndex(
      (item) => item.title === product.title
    );

    if (cartItemIndex === -1) {
      try {
        const res = await fetch(
          `https://crudcrud.com/api/25a43a3139154513afc3e6af63d646e7/cartItem${userEmail}`,
          {
            method: "POST",
            body: JSON.stringify({
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: product.quantity,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        updatedItem = [...updatedItem, data];
        cartCtx.addItem({ item: updatedItem, totalAmount: updatedAmount });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const newQuantity = (updatedItem[cartItemIndex].quantity += 1);
      try {
        await fetch(
          `https://crudcrud.com/api/a031c798dde54f45ba6d13d02da2c080/cartItem${userEmail}/${updatedItem[cartItemIndex]._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: newQuantity,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        updatedItem[cartItemIndex].quantity = newQuantity;

        cartCtx.addItem({ item: updatedItem, totalAmount: updatedAmount });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const productDetail = {
    title: props.item.title,
    imageUrl: props.item.imageUrl,
    price: props.item.price,
    rating: 4.5,
    detail: "Best laptop of the year",
  };

  const productDetailHandler = () => {
    productCtx.changeDetail(productDetail);
  };
  return (
    <div className={classes.div}>
      <h2>{props.item.title}</h2>
      <Link to={`/product/${props.item.title}`}>
        <img
          src={props.item.imageUrl}
          alt="Laptop"
          onClick={productDetailHandler}
        />
      </Link>
      <p ><i>{props.item.detail}</i></p>
      <span>₹{props.item.price}</span>
      <Button title="ADD TO CART" onClick={addingItemToCartHandler} />
    </div>
  );
};

export default LaptopItems;
