import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createOrderAsync } from "../../../redux/actions/orderAction";
//import { Warning } from "./Notification";

export default function PayPal(props){
  const [value, setValue] = useState(1);
  const [loaded, setLoaded] = useState(false);
  let payPalRef = useRef();

  const product = {
    price: "2.00",
    description: "Test Product",
  };
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AZotpdwi75E0fubipbfk9QGmKMit4DEusiTUhxhFbmAToxySSO2YM19H0qRiLXaWCZpK2hvJPci5c5IH";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Cool looking table",
                    amount: {
                      value: props.total,
                    },
                  },
                ],
              });
            },
            onApprove:async function(data, actions) {
              const order = await actions.order.capture();
              //console.log();
              const article = {
                deposit: props.total
              };
              dispatch(createOrderAsync(props.d))
              .then(
                history.push("/")
            )

            //   await axios
            //     .put("http://localhost:8084/api/booking-cards/deposit", article)
            //     .then((response) => {
            //       props.deposit(props.payAmount);
            //       console.log(order);
            //     })
            //     .catch(function (error) {
            //       console.log(error.response.data.errorCode);
            //     });

            //   await axios
            //     .put("http://localhost:8084/api/booking-cards")
            //     .then((response) => {})
            //     .catch(function (error) {
            //       console.log(error.response.data.errorCode);
            //       //Warning("Failed", error.response.data.errorCode);
            //     });
            },
          })
          .render(payPalRef);
      });
    }
  }, [loaded, product.price, product.description]);
  return (
    <div>
      <div className="paypal-container" ref={(v) => (payPalRef = v)} />
    </div>
  );
};

