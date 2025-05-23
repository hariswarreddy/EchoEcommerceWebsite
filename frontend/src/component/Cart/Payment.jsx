import React, { Fragment, useEffect, useRef } from "react";
import CheckOutSteps from "../Cart/CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import API_URL from "../../config";

const PaymentContent = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { error } = useSelector(state => state.newOrder);
  const { user } = useSelector(state => state.user);
  const { shippingInfo ,cartItems} = useSelector(state => state.cart);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice
  }
  const submitHandler =  async(e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
      }
      const { data } = await axios.post(
        `${API_URL}/api/v1/payment/process`,
        paymentData,
        config
      )
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
      payBtn.current.disabled = false;
      toast.error(result.error.message);
        
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status:result.paymentIntent.status

          }
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There is some issue while processing Payment");
        }

      }
      
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
    
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch,error])
  

  return (
    <Fragment>
      <MetaData title="Payment" />
      <Toaster />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};


const Payment = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentContent />
    </Elements>
  )
  
}
export default Payment;
