import React, { useContext, useEffect, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { ShowCartContextProvider } from "./store/showCart-context";
import { ProductContextProvider } from "./store/product-context";
import loginContext from "./store/login-context";
import LoadingSpinner from "./UI/LoadingSpinner";
import cartContext from "./store/cart-Context";

const Store = React.lazy(() => import("./pages/Store"));
const Login = React.lazy(() => import("./pages/Login"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

function App() {
  const loginCtx = useContext(loginContext);
  const cartCtx = useContext(cartContext);

  const { loginCartHandler } = cartCtx;
  const { isloggedIn } = loginCtx;

  useEffect(() => {
    if (isloggedIn) {
      console.log("called");
      loginCartHandler();
    }
  }, [loginCartHandler, isloggedIn]);

  const productsArr = [
    {
      title: "Dell Inspiron",
      price: 49999,
      detail:"Unleash limitless potential with our AI-powered laptop...",
      imageUrl:
        "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    },

    {
      title: "MacBook Pro",
      price: 89980,
      detail:" Laptop designed to enhance productivity with advanced features...",
      imageUrl:
        "https://images.unsplash.com/photo-1555117391-6c0795768da8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },

    {
      title: "Lenovo Ideapad",
      price: 65879,
      detail:"A laptop that defies limits, sleek design with quantum processing power...",
      imageUrl:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    },

    {
      title: "Asus Z-ultra",
      price: 56980,
      detail:"Equipped with processing power, storage and a display...",
      imageUrl:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    },
    {
      title: "HP Pavilion",
      price: 75789,
      detail:"A laptop uniting elegant design with quantum processing prowess...",
      imageUrl:
        "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    },
    {
      title: "Samsung Book",
      price: 90890,
      detail:"Powerful laptop designed for optimal performance and productivity...",
      imageUrl:
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    },
  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShowCartContextProvider>
        <Header />
      </ShowCartContextProvider>
      <Route path="/" exact>
        <Redirect to="/product" />
      </Route>
      <Switch>
        <ProductContextProvider>
          <ShowCartContextProvider>
            <Route path="/product" exact>
              {loginCtx.isloggedIn && <Store productList={productsArr} />}
              {!loginCtx.isloggedIn && <Redirect to="/login" />}
            </Route>
          </ShowCartContextProvider>

          <Route path="/product/:productId">
            {loginCtx.isloggedIn && <ProductDetail />}
            {!loginCtx.isloggedIn && <Redirect to="/login" />}
          </Route>
        </ProductContextProvider>
      </Switch>
      <Route path="/login">
        {!loginCtx.isloggedIn && <Login />}
        {loginCtx.isloggedIn && <Redirect to="/product" />}
      </Route>
      <Footer />
    </Suspense>
  );
}

export default App;
