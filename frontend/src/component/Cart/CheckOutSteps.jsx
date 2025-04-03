import { Step, StepLabel, Stepper,  Typography } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./checkOutSteps.css";


const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
    marginTop:"8vmax"
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}  style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
                <StepLabel style={{
                color: activeStep >= index?"tomato":"gray"
            }}  icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutSteps;
