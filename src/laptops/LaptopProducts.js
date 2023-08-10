import React from "react";

import classes from "./LaptopProducts.module.css";
import LaptopItems from "./LaptopItems";

const LaptopProducts = (props) => {
  const laptopItemList = props.productList.map((item) => (
    <LaptopItems key={Math.random().toString()} item={item} />
  ));

  return (
    <div className={classes.div}>
      <h2>LAPTOPS</h2>
      <div className={classes.laptopList}>{laptopItemList}</div>
    </div>
  );
};

export default LaptopProducts;
