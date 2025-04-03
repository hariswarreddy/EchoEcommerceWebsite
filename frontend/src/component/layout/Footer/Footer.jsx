import React from 'react'
import { SiGoogleplay } from "react-icons/si";
import { FaApple } from 'react-icons/fa';
import "./footer.css";


// Footer to be styled at last
const Footer = () => {
  return (
    <>
      <div id='footer'>
        <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
         <div className='store'><SiGoogleplay size={30}  /><p> Download it on Google Play</p></div> 
         <div className='store'><FaApple  size={30} /> <p>Download it on App Store</p></div> 
        </div>
        <div className="midFooter">
          <h1>ECHO</h1>
          <p>Because you deserve nothing but the best.</p>
          <p> Copyrights 2025 &copy; hariswarreddy</p>
        </div>
        <div className="rightFooter">
          <h4>Follow Us:</h4>
          <a href="https://github.com/hariswarreddy" target='blank'>Github</a>
          <a href="https://www.linkedin.com/in/hari2410/" target='blank' >Linkedin</a>
          <a href="https://instagram.com/mr_.hari._7" target='blank' >Instagram</a>
        </div>
      </div>
    </>
  )
}

export default Footer;