import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import MetaData from "../MetaData";

const Contact = () => {
  return (
      <div className="contactContainer">
      <MetaData title={"Contact Us"} />
          
      <a className="mailBtn" href="mailto:harib2410@gmail.com">
        <Button>Contact: harib2410@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;