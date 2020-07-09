import React from "react";
import logo from "./logo.svg";
import "./App.css";

import StripeCheckOut from "react-stripe-checkout";

import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Tesla",
    price: "1",
    decription: "Electric Car",
  });

  async function handleToken(token) {
    // console.log("T A", token, addresses);

    const response = await axios.post(
      "https://stripe-yp.herokuapp.com/checkout",
      {
        token,
        product,
      }
    );

    console.log(response.data);
    const { status } = response.data;
    if (status === "success") {
      toast("Success, Check Email", { type: "Success" });
    } else {
      toast("Something went wrong", { type: "Error" });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Name : {product.name}</h1>
        <h2>Price : {product.price}</h2>
        <h3>Descripiton : {product.decription}</h3>
        <StripeCheckOut
          stripeKey="pk_test_51H29lND835pyLuLJFMpyekNOJsAPIBWzlv0fB0zy7bAW6A18y3KzJlgTxRELbbqkaaDJtKwnvAMge6BVYwsBYKop00QU5sL8T3"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={product.price * 100}
          name={product.name}
        ></StripeCheckOut>
      </header>
    </div>
  );
}

export default App;
