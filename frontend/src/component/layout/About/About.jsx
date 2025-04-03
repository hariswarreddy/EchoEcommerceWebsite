import React from "react";
import "./aboutSection.css";
import { Button,Avatar,Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import image from "../../../images/image.jpeg"
import MetaData from "../MetaData";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/mr_.hari._7";
  };
  return (
    <div className="aboutSection">
      <MetaData title={"About Us"} />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={image}
              alt="Founder"
            />
            <Typography>Hariswar Reddy</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is a sample website created as part of my journey in learning Web Development. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Let's Connect</Typography>
           

            <a href="https://github.com/hariswarreddy" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/hari2410/" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;