import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./orderSuccess.css"

const OrderSuccess = () => {
  return (
      <>
          <div className="orderSuccess">
              <CheckCircleIcon />
              <Typography>Your Order has been Placed Successfully</Typography>
              <Link to={"/orders"}> <button>View Orders</button> </Link>
          </div>
      
      </>
  )
}

export default OrderSuccess